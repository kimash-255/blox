import React, { useEffect, useState, useRef } from "react";
import { fetchData, updateData, deleteData } from "@/utils/Api";
import { toast } from "react-toastify";
import { useData } from "@/contexts/DataContext";
import { useRouter } from "next/router";
import {
  faEnvelope,
  faCog,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "../modal/ConfirmationModal";
import DocHeader from "./DocHeader";
import DocFooter from "./DocFooter";
import DocumentFieldList from "./DocumentFieldList";
import DocumentForm from "../new/DocumentForm";
import DocumentLogs from "./DocumentLogs"; // Import the new DocumentLogs component
import useKeySave from "@/hooks/useKeySave";

const DocumentDetail = ({ config }) => {
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

  const handleUpdate = async (formData) => {
    try {
      // Parsing field data from formData
      const parsedData = {};

      Object.keys(formData).forEach((key) => {
        const { type, value } = formData[key];

        // Skip empty values for date and datetime types
        if (value === "" && (type === "date" || type === "datetime-local")) {
          parsedData[key] = null; // Set to null instead of empty string
          return;
        }

        switch (type) {
          case "float":
          case "decimal":
            parsedData[key] = value === "" ? null : parseFloat(value);
            break;
          case "boolean":
            parsedData[key] = value === "on"; // Assuming checkboxes send 'on' for checked
            break;
          case "date":
            const date = new Date(value);
            parsedData[key] = isNaN(date.getTime())
              ? null
              : date.toISOString().split("T")[0]; // Convert date to YYYY-MM-DD
            break;
          case "datetime-local":
            const datetime = new Date(value);
            parsedData[key] = isNaN(datetime.getTime())
              ? null
              : datetime.toISOString(); // Convert datetime to ISO format
            break;
          case "time":
            parsedData[key] = value === "" ? null : value; // Handle time inputs, set to null if empty
            break;
          case "file":
            // Handle file inputs if needed
            if (value instanceof File) {
              parsedData[key] = value; // Store the file object directly in parsedData
            }
            break;
          default:
            parsedData[key] = value === "" ? null : value; // Default case (text, email, etc.)
        }
      });

      const response = await updateData(parsedData, endpoint); // Assuming updateData accepts an object
      if (response?.data) {
        toast.success("Document updated successfully!");
        setData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      toast.error(`Failed to update document, ${error.message || error}`);
    }
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
    { name: "Logs", icon: faEnvelope, label: "Logs" },
    { name: "Settings", icon: faCog, label: "Settings" },
  ];

  useKeySave(handleSaveClick);

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
      {selectedTab === "Details" &&
        (isEditing ? (
          <DocumentForm
            ref={formRef} // Pass the ref to DocumentForm
            config={config}
            initialData={data}
            onSubmit={handleFormSubmitSuccess}
            type="detail"
          />
        ) : (
          <DocumentFieldList fields={config.fields} data={data} />
        ))}
      {selectedTab === "Logs" && (
        <DocumentLogs endpoint={endpoint} config={config} id={id} />
      )}
      {selectedTab === "Settings" && (
        <div>{/* Settings component or content goes here */}</div>
      )}
      <DocFooter data={data} />
    </div>
  );
};

export default DocumentDetail;
