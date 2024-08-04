import React from "react";
import Modal from "./Modal"; // Import the Modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTag,
  faIdBadge,
  faKey,
  faCalendar,
  faCheckCircle,
  faInfoCircle,
  faFont,
  faList,
} from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icons
import DeleteButton from "../buttons/Delete";

const FieldSettingsModal = ({
  item,
  handleInputChange,
  closeModal,
  deleteField,
  fields,
}) => {
  const {
    id1,
    name,
    type,
    search,
    list,
    filter,
    hidden,
    readonly,
    required,
    default: defaultValue,
    placeholder,
    maxLength,
    minLength,
    pattern,
    validationMessage,
    format,
    options, // For select fields
    helpText,
    tooltip,
  } = item;

  return (
    <Modal onClose={closeModal} title={"Field Settings"}>
      <div className="relative bg-white mb-12">
        {/* Delete Button */}
        <button
          onClick={() => deleteField(item.id1)}
          className="absolute -top-2 right-0 text-red-600 hover:text-red-800 transition-colors"
        >
          <DeleteButton />
        </button>

        {/* Header Section */}
        <div className="mb-4 flex items-center h-4">
          {/* <div className="text-xl font-semibold flex-grow">Field Settings</div> */}
        </div>
        <div className="grid grid-cols-1 gap-y-4">
          {/* Main Content */}
          <div className="grid grid-cols-1 gap-4">
            {/* General Settings Section */}
            <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg grid grid-cols-2 gap-x-4 gap-y-2 shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                General Settings
              </h3>
              <div></div>
              {/* ID */}
              <div className="relative mb-2">
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                    <FontAwesomeIcon
                      icon={faIdBadge}
                      className="text-white h-3 w-3"
                    />
                  </div>
                  ID
                </label>
                <input
                  type="text"
                  value={id1}
                  onChange={(e) =>
                    handleInputChange("id1", e.target.value, item, "field")
                  }
                  className="mt-1 block w-full p-2 text-sm border border-gray-300 rounded pl-4"
                />
              </div>

              {/* Name */}
              <div className="relative mb-2">
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                    <FontAwesomeIcon
                      icon={faTag}
                      className="text-white h-3 w-3"
                    />
                  </div>
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    handleInputChange("name", e.target.value, item, "field")
                  }
                  className="mt-1 block w-full p-2 text-sm border border-gray-300 rounded pl-4"
                />
              </div>

              {/* Type */}
              <div className="relative mb-2">
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                    <FontAwesomeIcon
                      icon={faKey}
                      className="text-white h-3 w-3"
                    />
                  </div>
                  Type
                </label>
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleInputChange("type", e.target.value, item, "field")
                  }
                  className="mt-1 block w-full p-2 text-sm border border-gray-300 rounded pl-4"
                >
                  {fields.map((field) => (
                    <option key={field.id} value={field.name}>
                      <FontAwesomeIcon icon={field.icon} className="mr-2" />
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
              <div></div>

              {/* Default */}
              <div className="relative mb-2 col-span-1">
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                    <FontAwesomeIcon
                      icon={faTag}
                      className="text-white h-3 w-3"
                    />
                  </div>
                  Default
                </label>
                <textarea
                  value={defaultValue || ""}
                  onChange={(e) =>
                    handleInputChange("default", e.target.value, item, "field")
                  }
                  className="mt-1 block w-full h-28 p-2 text-sm border border-gray-300 rounded"
                />
              </div>

              {/* Options */}
              {type === "SelectField" && (
                <div className="relative mb-2 col-span-1">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faList}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Options
                  </label>
                  <textarea
                    value={options ? options.join("\n") : ""}
                    onChange={(e) =>
                      handleInputChange(
                        "options",
                        e.target.value.split("\n"),
                        item,
                        "field"
                      )
                    }
                    className="block w-full h-28 p-2 text-sm border border-gray-300 rounded"
                    placeholder="Enter one option per line"
                  />
                </div>
              )}
            </div>

            {/* Advanced Settings Section */}
            <div className="p-4 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Advanced Settings
              </h3>
              <div></div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {/* Placeholder */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Placeholder
                  </label>
                  <input
                    type="text"
                    value={placeholder || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "placeholder",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Max Length */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faFont}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Max Length
                  </label>
                  <input
                    type="number"
                    value={maxLength || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "maxLength",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Min Length */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faFont}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Min Length
                  </label>
                  <input
                    type="number"
                    value={minLength || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "minLength",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Pattern */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Pattern
                  </label>
                  <input
                    type="text"
                    value={pattern || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "pattern",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Validation Message */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Validation Message
                  </label>
                  <input
                    type="text"
                    value={validationMessage || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "validationMessage",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Format */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Format
                  </label>
                  <input
                    type="text"
                    value={format || ""}
                    onChange={(e) =>
                      handleInputChange("format", e.target.value, item, "field")
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Help Text */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Help Text
                  </label>
                  <input
                    type="text"
                    value={helpText || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "helpText",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>

                {/* Tooltip */}
                <div className="relative">
                  <label className="block text-sm font-medium mb-1 flex items-center">
                    <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tr from-green-400 to-blue-500 mr-2">
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        className="text-white h-3 w-3"
                      />
                    </div>
                    Tooltip
                  </label>
                  <input
                    type="text"
                    value={tooltip || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "tooltip",
                        e.target.value,
                        item,
                        "field"
                      )
                    }
                    className="block w-full p-2 text-sm border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-medium mb-4 text-gray-800">
                Options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Appear in Search */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={search}
                    onChange={(e) =>
                      handleInputChange(
                        "search",
                        e.target.checked,
                        item,
                        "field"
                      )
                    }
                    className="mr-3 h-5 w-5 accent-blue-600 transition-colors"
                  />
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">Appear in Search</span>
                    <span
                      className="text-gray-500 text-xs italic"
                      title="Include this field in search queries. It will be searchable within the application."
                    >
                      (Include in search)
                    </span>
                  </label>
                </div>

                {/* List */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={list}
                    onChange={(e) =>
                      handleInputChange("list", e.target.checked, item, "field")
                    }
                    className="mr-3 h-5 w-5 accent-blue-600 transition-colors"
                  />
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">List</span>
                    <span
                      className="text-gray-500 text-xs italic"
                      title="Include this field in lists or dropdowns where applicable."
                    >
                      (Include in lists)
                    </span>
                  </label>
                </div>

                {/* Filter */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filter}
                    onChange={(e) =>
                      handleInputChange(
                        "filter",
                        e.target.checked,
                        item,
                        "field"
                      )
                    }
                    className="mr-3 h-5 w-5 accent-blue-600 transition-colors"
                  />
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">Filter</span>
                    <span
                      className="text-gray-500 text-xs italic"
                      title="Allow this field to be used as a filter in search results or data views."
                    >
                      (Enable filtering)
                    </span>
                  </label>
                </div>

                {/* Hidden */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={hidden}
                    onChange={(e) =>
                      handleInputChange(
                        "hidden",
                        e.target.checked,
                        item,
                        "field"
                      )
                    }
                    className="mr-3 h-5 w-5 accent-blue-600 transition-colors"
                  />
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">Hidden</span>
                    <span
                      className="text-gray-500 text-xs italic"
                      title="Make this field invisible in the user interface but still accessible programmatically."
                    >
                      (Hide in UI)
                    </span>
                  </label>
                </div>

                {/* Read Only */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={readonly}
                    onChange={(e) =>
                      handleInputChange(
                        "readonly",
                        e.target.checked,
                        item,
                        "field"
                      )
                    }
                    className="mr-3 h-5 w-5 accent-blue-600 transition-colors"
                  />
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">Read Only</span>
                    <span
                      className="text-gray-500 text-xs italic"
                      title="Make this field read-only, preventing users from modifying its value."
                    >
                      (Non-editable)
                    </span>
                  </label>
                </div>

                {/* Required */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={required}
                    onChange={(e) =>
                      handleInputChange(
                        "required",
                        e.target.checked,
                        item,
                        "field"
                      )
                    }
                    className="mr-3 h-5 w-5 accent-blue-600 transition-colors"
                  />
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <span className="mr-2">Required</span>
                    <span
                      className="text-gray-500 text-xs italic"
                      title="Mark this field as required, meaning users must fill it in before submission."
                    >
                      (Mandatory)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FieldSettingsModal;
