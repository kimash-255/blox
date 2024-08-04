import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SettingsPermissionTable from "./SettingsPermissionTable";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import TableTooltip from "../tooltip/TableTooltip";

const DocSettings = ({ config, data, onChange, setting, saveSettings }) => {
  const [settings, setSettings] = useState({
    idNamingRule: config.idNamingRule || "",
    idNamingMethod: config.idNamingMethod || "field",
    fieldForIdNaming: config.fieldForIdNaming || "",
    functionForIdNaming: config.functionForIdNaming || "",
    enableFeature: config.enableFeature || false,
    thresholdValue: config.thresholdValue || "",
    notificationEmail: config.notificationEmail || "",
    ...config.otherSettings,
  });

  const [permissions, setPermissions] = useState(config.permissions || []);
  console.log(config);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newSettings = {
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    };
    setSettings(newSettings);
    onChange && onChange({ ...newSettings, permissions });
  };

  const handlePermissionsChange = (newPermissions) => {
    setPermissions(newPermissions);
    onChange && onChange({ ...settings, permissions: newPermissions });
  };

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
                        <option value="field">Use Field</option>
                        <option value="function">Use Function</option>
                        <option value="custom">Custom Naming</option>
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
          {settings.idNamingMethod === "field" && (
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto p-4">
                <div className="flex flex-row justify-between -mx-3">
                  <div className="flex-none w-full px-2">
                    <div>
                      <p className="mb-1 font-sans text-xs font-semibold leading-normal">
                        Field for ID Naming
                      </p>
                      <TableTooltip content="Enter the field name for ID naming">
                        <input
                          type="text"
                          name="fieldForIdNaming"
                          value={settings.fieldForIdNaming}
                          onChange={handleChange}
                          className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter field name"
                        />
                      </TableTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {settings.idNamingMethod === "function" && (
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto p-4">
                <div className="flex flex-row justify-between -mx-3">
                  <div className="flex-none w-full px-2">
                    <div>
                      <p className="mb-1 font-sans text-xs font-semibold leading-normal">
                        Function for ID Naming
                      </p>
                      <TableTooltip content="Enter the function name for ID naming">
                        <input
                          type="text"
                          name="functionForIdNaming"
                          value={settings.functionForIdNaming}
                          onChange={handleChange}
                          className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter function name"
                        />
                      </TableTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {settings.idNamingMethod === "custom" && (
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border mb-4">
              <div className="flex-auto p-4">
                <div className="flex flex-row justify-between -mx-3">
                  <div className="flex-none w-full px-2">
                    <div>
                      <p className="mb-1 font-sans text-xs font-semibold leading-normal">
                        Custom Naming Rule
                      </p>
                      <TableTooltip content="Enter your custom naming rule here">
                        <input
                          type="text"
                          name="idNamingRule"
                          value={settings.idNamingRule}
                          onChange={handleChange}
                          className="w-full px-2 py-2 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter custom naming rule"
                        />
                      </TableTooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Permissions */}
        </div>
        <SettingsPermissionTable
          permissions={permissions}
          onPermissionsChange={handlePermissionsChange}
        />
      </div>
    </div>
  );
};

export default DocSettings;
