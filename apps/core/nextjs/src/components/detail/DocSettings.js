import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SettingsPermissionTable from "./SettingsPermissionTable";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import TableTooltip from "../tooltip/TableTooltip";
import { extractFields } from "@/utils/fields";

const DocSettings = ({ config, onChange, saveSettings, setting, data }) => {
  const [settings, setSettings] = useState(
    setting || {
      idNamingRule: config.idNamingRule || "",
      idNamingMethod: config.idNamingMethod || "fieldNaming",
      fieldForIdNaming: config.fieldForIdNaming || "",
      functionForIdNaming: config.functionForIdNaming || "",
      lengthForIncrementalNaming: config.lengthForIncrementalNaming || "",
      enableFeature: config.enableFeature || false,
      thresholdValue: config.thresholdValue || "",
      notificationEmail: config.notificationEmail || "",
      permissions: config.permissions || [],
      ...config.otherSettings,
    }
  );
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (onChange) {
      onChange(settings);
    }
  }, [settings, onChange]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePermissionsChange = (newPermissions) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      permissions: newPermissions.permissions,
    }));
  };

  const handleSave = () => {
    if (saveSettings) {
      saveSettings(settings);
    }
  };
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Dynamically import JSON data
        const fieldsModule = await import(
          `../../../../../custom/${data.app}/${data.module}/doc/${data.id}/fields.json`
        );

        if (fieldsModule) {
          setInitialData(fieldsModule.default); // Use .default for dynamic import
        }
      } catch (error) {
        console.error(
          `Failed to load fields module, ${error.message || error}`
        );
      }
    };

    if (data) {
      fetchInitialData();
    }
  }, [data]);
  return (
    <div className="py-2 px-2 flex items-center justify-center">
      <div className="w-full bg-white shadow-soft-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* ID Naming Method */}
          <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
            <div className="flex-auto p-4">
              <div className="flex flex-row justify-between -mx-3">
                <div className="w-full px-2">
                  <p className="mb-1 font-sans text-xs font-semibold leading-normal">
                    ID Naming Method
                  </p>
                  <div className="flex flex-row gap-x-2 w-full">
                    <TableTooltip content="Select the method for naming IDs">
                      <select
                        name="idNamingMethod"
                        value={settings.idNamingMethod}
                        onChange={handleChange}
                        className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="fieldNaming">Use Field</option>
                        <option value="functionNaming">Use Function</option>
                        <option value="incrementalNaming">Incremental</option>
                        <option value="randomNaming">Random</option>
                        <option value="customNaming">Custom Naming</option>
                      </select>
                    </TableTooltip>
                    <div className="text-right flex justify-end">
                      <div className="flex items-center justify-center w-10 h-10 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                        <FontAwesomeIcon
                          icon={faIdCard}
                          className="h-6 w-6 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ID Naming Rule */}
          {(settings.idNamingMethod === "fieldNaming" ||
            settings.idNamingMethod === "functionNaming" ||
            settings.idNamingMethod === "incrementalNaming" ||
            settings.idNamingMethod === "customNaming") && (
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto p-4">
                <div className="flex flex-row justify-between -mx-3">
                  <div className="flex-none w-full px-2">
                    <div>
                      <p className="mb-1 font-sans text-xs font-semibold leading-normal">
                        Naming Rule
                      </p>
                      <TableTooltip content="Enter the naming rule here">
                        {settings.idNamingMethod === "fieldNaming" && (
                          <select
                            name="fieldForIdNaming"
                            value={settings.fieldForIdNaming}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select Field</option>
                            {initialData &&
                              initialData.map((field) => (
                                <option key={field.id} value={field.id}>
                                  {field.name}
                                </option>
                              ))}
                          </select>
                        )}
                        {settings.idNamingMethod === "functionNaming" && (
                          <input
                            type="text"
                            name="functionForIdNaming"
                            value={settings.functionForIdNaming}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter function name"
                          />
                        )}
                        {settings.idNamingMethod === "incrementalNaming" && (
                          <input
                            type="text"
                            name="lengthForIncrementalNaming"
                            value={settings.lengthForIncrementalNaming}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter length (e.g., 5)"
                          />
                        )}
                        {settings.idNamingMethod === "customNaming" && (
                          <input
                            type="text"
                            name="idNamingRule"
                            value={settings.idNamingRule}
                            onChange={handleChange}
                            className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter custom naming rule"
                          />
                        )}
                      </TableTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Permissions */}
          <div className="col-span-2">
            <SettingsPermissionTable
              settings={settings}
              onPermissionsChange={handlePermissionsChange}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default DocSettings;
