import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchData, updateData, deleteData } from "@/utils/Api";
import { toast } from "react-toastify";
import { useData } from "@/contexts/DataContext";
import { useRouter } from "next/router";
import {
  faEnvelope,
  faCog,
  faInfoCircle,
  faTrash, // Import the trash icon for deletion
} from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../buttons/Primary";
import DocForm from "../new/DocForm";
import DeleteButton from "../buttons/Delete";
import ConfirmationModal from "../modal/ConfirmationModal";
import Link from "next/link";

const DocDetail = ({ config }) => {
  const { data, setData } = useData();
  const router = useRouter();
  const { id } = router.query;
  const [endpoint, setEndpoint] = useState("");
  const [selectedTab, setSelectedTab] = useState("Details");
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

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

    // Set up a timeout to delay the fetchData1 call
    const timer = setTimeout(() => {
      fetchData1();
    }, 2000); // 5000 milliseconds = 5 seconds

    // Cleanup function to clear the timeout if the component unmounts or endpoint changes
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
    { name: "Messages", icon: faEnvelope, label: "Messages" },
    { name: "Settings", icon: faCog, label: "Settings" },
  ];

  return (
    <div className="mx-4 -mt-32">
      <div
        className="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl"
        style={{
          backgroundImage: `url('/img/curved-images/curved0.jpg')`,
          backgroundPositionY: "50%",
        }}
      >
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
        <span className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
      </div>
      <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div className="text-base ease-soft-in-out h-18.5 w-18.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <img
                src="/img/favicon.png"
                alt="profile_image"
                className="w-full shadow-soft-sm rounded-xl"
              />
            </div>
          </div>
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="mb-1"> Details Page</h5>
              <p className="mb-0 font-semibold leading-normal text-sm">
                {data?.id}
              </p>
            </div>
          </div>
          <div className="w-fit max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0">
            <div className="relative right-0 flex flex-row items-center">
              <ul className="relative flex flex-wrap p-1 list-none bg-transparent">
                {tabs.map((tab) => (
                  <li key={tab.name} className="z-30 flex-auto text-center">
                    <a
                      onClick={() => handleTabClick(tab.name)}
                      className={`z-30 block w-full px-4 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out ${
                        selectedTab === tab.name
                          ? "bg-white text-slate-700"
                          : "bg-inherit text-slate-700"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={tab.icon}
                        className="text-slate-700"
                      />
                      <span className="ml-1">{tab.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <div onClick={handleEditClick}>
                      <PrimaryButton
                        text="Close"
                        className="flex items-center justify-center p-1"
                      />
                    </div>
                    <button type="button" onClick={handleSaveClick}>
                      <PrimaryButton
                        text="Save"
                        className="flex items-center justify-center p-1"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <div onClick={handleEditClick}>
                      <PrimaryButton
                        text="Edit"
                        className="flex items-center justify-center p-1"
                      />
                    </div>
                    <div onClick={handleDelete}>
                      <DeleteButton />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing ? (
        <DocForm
          ref={formRef}
          config={config}
          initialData={data}
          onSubmit={handleFormSubmitSuccess}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 py-8">
          {config.fields.map((item, index) => (
            <div key={index} className="w-full px-3 mb-2">
              <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                  <div className="flex flex-row justify-between -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                      <div>
                        <p className="mb-0 font-sans text-sm font-semibold leading-normal">
                          {item.title}
                        </p>

                        {item.type === "linkselect" ? (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={`/${item.endpoint}/${data[item.data]}`}
                          >
                            <h5 className="mb-0 font-bold">
                              {data[item.data]}
                            </h5>
                          </a>
                        ) : (
                          <h5 className="mb-0 font-bold">{data[item.data]}</h5>
                        )}
                      </div>
                    </div>
                    <div className="px-3 text-right flex justify-end">
                      <div className="flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="h-8 w-8 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocDetail;
