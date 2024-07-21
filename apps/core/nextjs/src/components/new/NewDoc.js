import React, { useState } from "react";
import PrimaryButton from "../buttons/Primary";
import { postData } from "@/utils/Api";
import { useRouter } from "next/router";

const NewDoc = ({ config }) => {
  const router = useRouter();
  const currentPath = router.pathname.replace("/new", "");
  const [formData, setFormData] = useState({}); // State to hold form data

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postData(formData, config.endpoint);

      if (response?.data) {
        router.push(`${currentPath}/${response?.data.id}`);
      }
    } catch (error) {
      console.error("Error creating/updating post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-white border border-4 rounded-lg shadow relative m-10">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-semibold">{config.title}</h3>
          <button type="submit">
            <PrimaryButton text={"Save"} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-6 gap-6">
            {config.fields.map((field, index) => (
              <div key={index} className="col-span-6 sm:col-span-3">
                <label
                  htmlFor={field.data}
                  className="text-sm font-medium text-gray-900 block mb-2"
                >
                  {field.title}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.data}
                    name={field.data}
                    rows="6"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-4"
                    placeholder={field.title}
                    required={field.required}
                    onChange={handleInputChange}
                  ></textarea>
                ) : field.type === "select" ? (
                  <select
                    id={field.data}
                    name={field.data}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                    required={field.required}
                    onChange={handleInputChange}
                  >
                    <option key={-1} value="">
                      Select {field.title}
                    </option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    id={field.data}
                    name={field.data}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5"
                    placeholder={field.title}
                    required={field.required}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewDoc;
