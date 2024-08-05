import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { postData } from "@/utils/Api";
import PrimaryButton from "../buttons/Primary";
import DocumentForm from "./DocumentForm";
import useKeySave from "@/hooks/useKeySave";

const NewDocument = ({ config, initialData }) => {
  const router = useRouter();
  const formRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (initialData && initialData.id) {
      setIsEditing(true);
    }
  }, [initialData]);

  const handleSubmit = async (formData) => {
    setLoading(true);

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
          // Handle files separately as a property to be sent
          if (value instanceof File) {
            // If files need to be handled, use a separate upload function or process them accordingly
            parsedData[key] = value; // Set as file object (process separately if needed)
          }
          break;
        default:
          parsedData[key] = value === "" ? null : value; // Default case (text, email, etc.)
      }
    });

    try {
      // Convert parsedData to JSON string for transmission
      const response = await postData(parsedData, config.endpoint, true);

      if (response.data) {
        const docid = response.data.id;
        router.push(`${router.pathname.replace("/new", "")}/${docid}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (show user feedback)
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.submit(); // Trigger form submission from DocumentForm
    }
  };
  useKeySave(handleSaveClick);
  return (
    <div className="mx-4 -mt-28">
      <div
        className="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-32 rounded-2xl"
        style={{
          backgroundImage: `url('/img/curved-images/curved0.jpg')`,
          backgroundPositionY: "50%",
        }}
      >
        <span className="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
      </div>

      <div className="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-12 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-auto max-w-full px-3">
            <div className="text-base ease-soft-in-out h-8.5 w-8.5 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
              <img
                src="/img/favicon.png"
                alt="profile_image"
                className="w-full shadow-soft-sm rounded-xl"
              />
            </div>
          </div>
          <div className="flex-none w-auto max-w-full px-3 my-auto">
            <div className="h-full">
              <h5 className="mb-1">New {config.name}</h5>
            </div>
          </div>
          <div className="w-fit max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0">
            <button
              type="button"
              onClick={handleSaveClick}
              disabled={loading} // Disable button during loading
            >
              <PrimaryButton text={loading ? "Saving..." : "Save"} />
            </button>
          </div>
        </div>
      </div>

      <DocumentForm
        ref={formRef} // Pass the ref to DocumentForm
        config={config}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewDocument;
