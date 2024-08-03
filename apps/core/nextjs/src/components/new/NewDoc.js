import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import DocForm from "./DocForm";
import { postData } from "@/utils/Api";
import PrimaryButton from "../buttons/Primary";

const NewDoc = ({ config, initialData }) => {
  const router = useRouter();
  const formRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (initialData && initialData.id) {
      setIsEditing(true);
    }
  }, [initialData]);

  const handleSubmit = async (formData) => {
    try {
      // Create new document
      const response = await postData(formData, config.endpoint);
      // console.log(response);
      if (
        response.data.additional &&
        response.data.additional.type === "startapp"
      ) {
        const appname = response.data.id;
        await startApp({ appname });
        router.push(`${router.pathname.replace("/new", "")}/${appname}`);
      } else if (
        response.data.additional &&
        response.data.additional.type === "addmodule"
      ) {
        const modulename = response.data.id;
        await addModule({ modulename });
        router.push(`${router.pathname.replace("/new", "")}/${modulename}`);
      } else if (
        response.data.additional &&
        response.data.additional.type === "newdoc"
      ) {
        const documentname = response.data.id;
        const app = response.data.app;
        const module = response.data.module;
        await addDoc({ documentname, app, module });
        router.push(`${router.pathname.replace("/new", "")}/${documentname}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const startApp = async (data) => {
    try {
      await postData(data, "startapp");
    } catch (error) {
      console.error("Error starting app:", error);
    }
  };

  const addModule = async (data) => {
    try {
      await postData(data, "addmodule");
    } catch (error) {
      console.error("Error starting module:", error);
    }
  };

  const addDoc = async (data) => {
    try {
      await postData(data, "newdoc");
    } catch (error) {
      console.error("Error starting module:", error);
    }
  };

  // Handle save button click
  const handleSaveClick = () => {
    if (formRef.current) {
      formRef.current.submit(); // Trigger form submission from DocForm
    }
  };

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
              <h5 className="mb-1"> New {config.name}</h5>
            </div>
          </div>
          <div className="w-fit max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0">
            <button type="button" onClick={handleSaveClick}>
              <PrimaryButton text={"Save"} />
            </button>
          </div>
        </div>
      </div>

      <DocForm
        ref={formRef} // Pass the ref to DocForm
        config={config}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewDoc;
