import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import DataTableView from "./DataTableView";

// Define field types and their corresponding render types
const fieldTypes = {
  AddressField: "textarea",
  BooleanField: "checkbox",
  CharField: "text",
  DateField: "date",
  DateTimeField: "datetime-local",
  DecimalField: "number",
  EmailField: "email",
  FileField: "file",
  FloatField: "number",
  ForeignKey: "link",
  ImageField: "file",
  IPAddressField: "text",
  ManyToManyField: "table",
  NameField: "text",
  NumberField: "number",
  OneToOneField: "link",
  PasswordField: "password",
  PhoneField: "tel",
  SelectField: "select",
  SmallTextField: "text",
  SlugField: "text",
  TextareaField: "textarea",
  TimeField: "time",
  URLField: "url",
  UUIDField: "text",
};

// Render field based on its type with custom styles
const renderField = (field, data) => {
  const fieldType = fieldTypes[field.type] || "text"; // Default to text if type is unknown

  const baseStyle = "w-full p-2 border rounded";

  switch (fieldType) {
    case "textarea":
      return (
        <textarea
          className={`${baseStyle} h-32 resize-none`}
          value={data[field.id]}
          readOnly
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={data[field.id]}
          readOnly
          className="form-checkbox h-5 w-5 text-indigo-600"
        />
      );
    case "link":
      return (
        <a
          href={data[field.id]}
          className="text-blue-500 underline hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data[field.id]}
        </a>
      );
    case "table":
      return <DataTableView fieldData={data} field={field} />;
    default:
      return (
        <input
          type={fieldType}
          className={`${baseStyle} text-gray-900`}
          value={data[field.id]}
          readOnly
        />
      );
  }
};

const DocumentFieldList = ({ fields, data }) => {
  const [selectedTab, setSelectedTab] = useState(fields[0].id);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  const renderFields = (fields) => {
    return fields.map((field, index) => (
      <div key={index} className="w-full mb-2 flex flex-col">
        <div className="flex flex-row justify-start m-1">
          <div className="flex items-center justify-center w-5 h-5 text-center rounded-md bg-gradient-to-tl from-purple-700 to-pink-500">
            <FontAwesomeIcon icon={field.icon} className="h-3 w-3 text-white" />
          </div>
          <p className="font-sans text-sm font-semibold ml-2 leading-normal">
            {field.name}
          </p>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-md bg-clip-border">
          <div className="flex-auto p-3">
            <div className="flex flex-row justify-between -mx-3">
              <div className="flex-none w-full px-2">
                <div>
                  <h5 className="mb-0 font-bold">{renderField(field, data)}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderColumns = (columns) => {
    return columns.map((column, index) => (
      <div key={index} className="w-full">
        {renderFields(column.fields)}
      </div>
    ));
  };

  const renderSections = (sections) => {
    return sections.map((section, index) => (
      <div key={index} className="w-full flex flex-row gap-x-4 mb-2">
        {renderColumns(section.columns)}
      </div>
    ));
  };

  const renderTabs = () => {
    return (
      <div className="flex">
        {fields.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-2 py-2 m-1 text-xs rounded ${
              selectedTab === tab.id
                ? "inline-block px-4 py-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
                : "inline-block px-4 py-2 font-bold text-center text-gray-900 uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-200 to-slate-200 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="py-4">
      {renderTabs()}
      <div className="grid grid-cols-1 gap-2 m-2">
        {fields
          .filter((tab) => tab.id === selectedTab)
          .map((tab) =>
            tab.sections.map((section) => (
              <div
                key={section.id}
                className="shadow-lg shadow-slate-300 rounded-md px-4 pt-6"
              >
                <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
                {renderSections([section])}
              </div>
            ))
          )}
      </div>
    </div>
  );
};

export default DocumentFieldList;
