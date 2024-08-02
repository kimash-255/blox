import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const DocFieldList = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(data[0].id);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  const renderFields = (fields) => {
    return fields.map((field, index) => (
      <div key={index} className="w-full mb-2 flex flex-col">
        <p className="mb-1 font-sans text-sm font-semibold leading-normal">
          {field.id}
        </p>
        <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-md bg-clip-border">
          <div className="flex-auto p-3">
            <div className="flex flex-row justify-between -mx-3">
              <div className="flex-none w-2/3 max-w-full px-2">
                <div>
                  <h5 className="mb-0 font-bold">{field.name}</h5>
                </div>
              </div>
              <div className="px-2 text-right flex justify-end">
                <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                  <FontAwesomeIcon
                    icon={field.icon}
                    className="h-4 w-4 text-white"
                  />
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
        {data.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 m-2 rounded ${
              selectedTab === tab.id
                ? "inline-block px-6 py-3 font-bold text-center text-white uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-900 to-slate-800 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
                : "inline-block px-6 py-3 font-bold text-center text-gray-900 uppercase align-middle transition-all bg-transparent rounded-lg cursor-pointer leading-pro text-xs ease-soft-in shadow-soft-md bg-150 bg-gradient-to-tl from-gray-200 to-slate-200 hover:shadow-soft-xs active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25"
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
        {data
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

export default DocFieldList;
