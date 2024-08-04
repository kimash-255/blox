import React, { useEffect, useState, useRef } from "react";
import { fetchData, updateData, deleteData } from "@/utils/Api";
import { toast } from "react-toastify";
import { useData } from "@/contexts/DataContext";
import { useRouter } from "next/router";
import {
  faEnvelope,
  faCog,
  faInfoCircle,
  faTrash,
  faFileEdit,
} from "@fortawesome/free-solid-svg-icons";
import DocForm from "../new/DocForm";
import ConfirmationModal from "../modal/ConfirmationModal";
import DocHeader from "./DocHeader";
import DocFields from "./DocFields";
import DocMessages from "./DocMessages"; // New import for Messages tab
import DocSettings from "./DocSettings"; // New import for Settings tab
import DocFooter from "./DocFooter";
import DocEditFields from "./DocEditFields";
import useKeySave from "@/hooks/useKeySave";

const DocDetail = ({ config, setting, saveSettings }) => {
  const { data, setData } = useData();
  const router = useRouter();
  const [endpoint, setEndpoint] = useState("");
  const [selectedTab, setSelectedTab] = useState("Details");
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

  const currentPath = router.pathname;
  const getId = (path) => {
    const segments = path.split("/");
    return segments[segments.length - 1];
  };

  const id = router.query.id || getId(currentPath);

  useEffect(() => {
    if (id) {
      setEndpoint(`${config.endpoint}/${id}`);
    }
  }, [id]);

  useEffect(() => {
    const fetchData1 = async () => {
      if (!endpoint) return;
      try {
        const response = await fetchData({}, endpoint);
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        toast.error(`Failed to fetch data, ${error.message || error}`);
      }
    };

    const timer = setTimeout(() => {
      fetchData1();
    }, 500);

    return () => clearTimeout(timer);
  }, [endpoint]);

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  useKeySave(handleSaveClick);

  const handleUpdate = async (formData) => {
    try {
      const changedFields = getChangedFields(formData);
      if (Object.keys(changedFields).length) {
        const response = await updateData(changedFields, endpoint);
        if (response?.data) {
          toast.success("Document updated successfully!");
          setData(response.data);
          setIsEditing(false);
        }
      }
    } catch (error) {
      toast.error(`Failed to update document, ${error.message || error}`);
    }
  };

  const getChangedFields = (formData) => {
    const changedFields = {};
    Object.keys(formData).forEach((key) => {
      if (data[key] !== formData[key]) {
        changedFields[key] = formData[key];
      }
    });
    return changedFields;
  };

  const handleFormSubmitSuccess = (formData) => {
    handleSaveClick();
    handleUpdate(formData);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsModalOpen(false);
    try {
      await deleteData(endpoint);
      toast.success("Document deleted successfully!");
      router.back();
    } catch (error) {
      toast.error(`Failed to delete document, ${error.message || error}`);
    }
  };

  const tabs = [
    { name: "Details", icon: faInfoCircle, label: "Details" },
    ...(config.endpoint === "documents"
      ? [{ name: "Fields", icon: faFileEdit, label: "Fields" }]
      : []),
    { name: "Messages", icon: faEnvelope, label: "Messages" },
    { name: "Settings", icon: faCog, label: "Settings" },
  ];

  return (
    <div className="mx-4 -mt-28">
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
      <DocHeader
        data={data}
        tabs={tabs}
        config={config}
        selectedTab={selectedTab}
        isEditing={isEditing}
        id={id}
        handleDelete={handleDelete}
        handleEditClick={handleEditClick}
        handleSaveClick={handleSaveClick}
        handleTabClick={handleTabClick}
      />
      {isEditing ? (
        <DocForm
          ref={formRef}
          config={config}
          initialData={data}
          onSubmit={handleFormSubmitSuccess}
          type="detail"
        />
      ) : selectedTab === "Details" ? (
        <DocFields config={config} data={data} />
      ) : selectedTab === "Fields" ? (
        <DocEditFields config={config} data={data} />
      ) : selectedTab === "Messages" ? (
        <DocMessages config={config} data={data} />
      ) : selectedTab === "Settings" ? (
        <DocSettings
          config={config}
          data={data}
          setting={setting}
          saveSettings={saveSettings}
        />
      ) : null}
      <DocFooter data={data} />
    </div>
  );
};

export default DocDetail;
