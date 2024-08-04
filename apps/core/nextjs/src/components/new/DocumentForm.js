import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkSelect from "./LinkSelect";

import {
  faFont,
  faHashtag,
  faCalendarAlt,
  faClock,
  faEnvelope,
  faPhone,
  faUser,
  faLock,
  faLink,
  faAddressCard,
  faFile,
  faImage,
  faToggleOn,
  faGlobe,
  faBarcode,
  faFileUpload,
  faFingerprint,
  faKey,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import DocSelect from "./DocSelect";
import DocLink from "./DocLink";

const fieldIcons = {
  TextField: faFont,
  CharField: faFont,
  NumberField: faHashtag,
  FloatField: faHashtag,
  DecimalField: faHashtag,
  BooleanField: faToggleOn,
  DateField: faCalendarAlt,
  DateTimeField: faCalendarAlt,
  TimeField: faClock,
  EmailField: faEnvelope,
  URLField: faLink,
  SlugField: faBarcode,
  UUIDField: faFingerprint,
  IPAddressField: faGlobe,
  FileField: faFileUpload,
  ImageField: faImage,
  PasswordField: faLock,
  PhoneField: faPhone,
  NameField: faUser,
  AddressField: faAddressCard,
  ForeignKey: faKey,
  OneToOneField: faKey,
  ManyToManyField: faUsers,
};

const fieldTypes = {
  TextField: "text",
  CharField: "text",
  NumberField: "number",
  FloatField: "number",
  DecimalField: "number",
  BooleanField: "checkbox",
  DateField: "date",
  DateTimeField: "datetime-local",
  TimeField: "time",
  EmailField: "email",
  URLField: "url",
  SlugField: "text",
  UUIDField: "text",
  IPAddressField: "text",
  FileField: "file",
  ImageField: "file",
  PasswordField: "password",
  PhoneField: "tel",
  NameField: "text",
  AddressField: "textarea",
  ForeignKey: "link",
  OneToOneField: "link",
  ManyToManyField: "table",
};

const DocumentForm = forwardRef(
  ({ config, initialData = [], onSubmit }, ref) => {
    const [formData, setFormData] = useState({});
    const [activeTab, setActiveTab] = useState(config.fields[0]?.id || "");
    const formRef = useRef(null);

    // useEffect(() => {
    //   const initialFormData = {};
    //   config.fields.forEach((tab) => {
    //     tab.sections.forEach((section) => {
    //       section.columns.forEach((column) => {
    //         column.fields.forEach((field) => {
    //           initialFormData[field.id1] = {
    //             type: fieldTypes[field.type] || "text",
    //             value: initialData?.[field.id1] || "",
    //             key: field.id1,
    //           };
    //         });
    //       });
    //     });
    //   });
    //   setFormData(initialFormData);
    // }, [config, initialData]);

    const handleInputChange = (name, value, type) => {
      let convertedValue = value;
      console.log(name, value, type);

      switch (type) {
        case "number":
        case "float":
        case "decimal":
          convertedValue = parseFloat(value);
          break;
        case "checkbox":
          convertedValue = value === "on";
          break;
        case "date":
          convertedValue = value
            ? new Date(value).toISOString().split("T")[0]
            : "";
          break;
        case "datetime-local":
          convertedValue = value ? new Date(value).toISOString() : "";
          break;
        case "time":
          convertedValue = value;
          break;
        default:
          convertedValue = value;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: {
          ...prevFormData[name],
          value: convertedValue,
        },
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (onSubmit) {
        onSubmit(formData);
      }
    };

    useImperativeHandle(ref, () => ({
      submit: () => {
        formRef.current?.requestSubmit();
      },
    }));

    const renderFields = (fields) => {
      return fields.map((field) => {
        const fieldType = fieldTypes[field.type] || "text";
        const icon = fieldIcons[field.type] || faFont;
        const commonProps = {
          id: field.id1,
          name: field.id1,
          className:
            "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5",
          placeholder: field.name,
          required: field.required,
          onChange: (e) =>
            handleInputChange(e.target.name, e.target.value, fieldType),
          value: formData[field.id1]?.value || "",
        };

        const fieldConfig = {
          textarea: (
            <textarea
              {...commonProps}
              rows="2"
              className={`${commonProps.className} p-4`}
            />
          ),
          select: (
            <select
              {...commonProps}
              className={`${commonProps.className} p-2.5`}
            >
              <option key="" value="">
                Select {field.name}
              </option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ),
          linkselect: (
            <LinkSelect
              name={field.id1}
              handleChange={handleInputChange}
              endpoint={field.endpoint}
              placeholder={`Select ${field.name}`}
            />
          ),
          link: (
            <DocLink
              name={field.id1}
              handleChange={(e) => {
                handleInputChange(field.id1, e.value, "text");
                console.log(field.id1, e.value, "text");
              }}
              doc={field.doc}
              placeholder={`Select ${field.name}`}
            />
          ),
          table: (
            <LinkSelect
              name={field.id1}
              handleChange={handleInputChange}
              endpoint={field.endpoint}
              placeholder={`Select ${field.name}`}
            />
          ),
          default: <input type={fieldType} {...commonProps} />,
          file: <input type="file" {...commonProps} />,
        };

        return (
          <div key={field.id1} className="col-span-6 sm:col-span-3">
            <label
              htmlFor={field.id1}
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                  <FontAwesomeIcon icon={icon} className="h-4 w-4 text-white" />
                </div>
                <span>{field.name}</span>
              </div>
            </label>
            {fieldConfig[fieldType] || fieldConfig.default}
          </div>
        );
      });
    };

    const renderColumns = (columns) => {
      return columns.map((column, index) => (
        <div
          key={index}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {renderFields(column.fields)}
        </div>
      ));
    };

    const renderSections = (sections) => {
      return sections.map((section) => (
        <div key={section.id} className="w-full flex flex-col gap-y-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
          {renderColumns(section.columns)}
        </div>
      ));
    };

    const renderTabs = () => {
      return (
        <div className="flex overflow-x-auto whitespace-nowrap">
          {config.fields.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 m-2 rounded ${
                activeTab === tab.id
                  ? "bg-gradient-to-tl from-gray-900 to-slate-800 text-white"
                  : "bg-gradient-to-tl from-gray-200 to-slate-200 text-gray-900"
              } font-bold text-center uppercase cursor-pointer transition-transform transform hover:scale-105`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      );
    };

    return (
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="py-4 mx-4 space-y-4"
      >
        {renderTabs()}
        <div className="bg-white border border-4 my-8 rounded-lg shadow relative">
          {config.fields
            .filter((tab) => tab.id === activeTab)
            .map((tab) =>
              tab.sections.map((section) => (
                <div
                  key={section.id}
                  className="shadow-sm shadow-slate-300 rounded-md px-4 py-6"
                >
                  {renderSections([section])}
                </div>
              ))
            )}
        </div>
      </form>
    );
  }
);

export default DocumentForm;
