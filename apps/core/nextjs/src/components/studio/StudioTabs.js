import React, { useState } from "react";
import ColumnDropZone from "./ColumnDropZone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { addColumn, addSection } from "./AddFields";
import { updateItemById } from "./utils";

const StudioTabs = ({
  tabs,
  selectedTab,
  setCanvasItems,
  deleteField,
  ItemType,
  items,
  moveItem,
}) => {
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [editingSectionId, setEditingSectionId] = useState(null);
  const [editingTabId, setEditingTabId] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [tabName, setTabName] = useState("");

  const handleInputChange = (key, value, item, type) => {
    const updatedItems = updateItemById(items, item.id, type, key, value);
    if (updatedItems) {
      setCanvasItems([...updatedItems]);
    }
  };

  const handleFocus = (id) => {
    setSelectedFieldId(id);
  };

  const handleBlur = () => {
    setSelectedFieldId("");
  };

  const handleMoveItem = (draggedItem, targetItem, parent1Id, parent2Id) => {
    moveItem(draggedItem, targetItem, parent1Id, parent2Id);
  };

  const handleEditSectionName = (section) => {
    setEditingSectionId(section.id);
    setSectionName(section.name);
  };

  const handleEditTabName = (tab) => {
    setEditingTabId(tab.id);
    setTabName(tab.name);
  };

  const handleSectionNameChange = (event) => {
    setSectionName(event.target.value);
  };

  const handleTabNameChange = (event) => {
    setTabName(event.target.value);
  };

  const handleSaveSectionName = () => {
    if (sectionName.trim() !== "") {
      const updatedItems = updateItemById(
        items,
        editingSectionId,
        "section",
        "name",
        sectionName
      );
      if (updatedItems) {
        setCanvasItems([...updatedItems]);
      }
    }
    setEditingSectionId(null);
  };

  const handleSaveTabName = () => {
    if (tabName.trim() !== "") {
      const updatedItems = updateItemById(
        items,
        editingTabId,
        "tab",
        "name",
        tabName
      );
      if (updatedItems) {
        setCanvasItems([...updatedItems]);
        refreshPage();
      }
    }
    setEditingTabId(null);
  };

  const handleCancelEdit = () => {
    setEditingSectionId(null);
    setEditingTabId(null);
  };

  const simulateCtrlS = () => {
    setTimeout(() => {
      const event = new KeyboardEvent("keydown", {
        key: "s",
        code: "KeyS",
        keyCode: 83,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
    }, 400);
  };

  const refreshPage = () => {
    simulateCtrlS();
    setTimeout(() => {
      window.location.reload();
    }, 400); // Delay of 2000 milliseconds (2 seconds)
  };

  return (
    <>
      {tabs.map(
        (tab) =>
          selectedTab === tab.name && (
            <div key={tab.id} className="mb-4 bg-slate-50">
              <div className="flex items-center justify-start border-b border-gray-500 p-2">
                {editingTabId === tab.id ? (
                  <input
                    type="text"
                    value={tabName}
                    onChange={handleTabNameChange}
                    onBlur={handleSaveTabName}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveTabName();
                      } else if (e.key === "Escape") {
                        handleCancelEdit();
                      }
                    }}
                    autoFocus
                    className="text-md font-semibold p-1 border border-gray-300 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <h4 className="text-md font-semibold">{tab.name}</h4>
                )}
                <button
                  onClick={() => {
                    if (editingTabId === tab.id) {
                      handleSaveTabName();
                    } else {
                      handleEditTabName(tab);
                    }
                  }}
                  className="ml-2 text-blue-500 hover:text-blue-700 transition-colors duration-150 ease-in-out"
                  aria-label="Edit tab"
                >
                  <FontAwesomeIcon icon={faPencilAlt} className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    deleteField(tab, "tab");
                    refreshPage();
                  }}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out"
                  aria-label="Delete tab"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>
              </div>
              {tab.sections.map((section) => (
                <div key={section.id} className="border-b border-gray-500 p-2">
                  <div className="flex items-center justify-between my-2">
                    <div className="flex items-center">
                      {editingSectionId === section.id ? (
                        <input
                          type="text"
                          value={sectionName}
                          onChange={handleSectionNameChange}
                          onBlur={handleSaveSectionName}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSaveSectionName();
                            } else if (e.key === "Escape") {
                              handleCancelEdit();
                            }
                          }}
                          autoFocus
                          className="text-md font-semibold p-1 border border-gray-300 rounded bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <h4 className="text-md font-semibold">
                          {section.name}
                        </h4>
                      )}
                      <button
                        onClick={() => {
                          if (editingSectionId === section.id) {
                            handleSaveSectionName();
                          } else {
                            handleEditSectionName(section);
                          }
                        }}
                        className="ml-2 text-blue-500 hover:text-blue-700 transition-colors duration-150 ease-in-out"
                        aria-label="Edit section"
                      >
                        <FontAwesomeIcon
                          icon={faPencilAlt}
                          className="w-4 h-4"
                        />
                      </button>

                      <button
                        onClick={() => deleteField(section, "section")}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-150 ease-in-out"
                        aria-label="Delete section"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <button
                        className="text-xs px-2 py-1 align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75 mr-2"
                        onClick={() => addColumn(section.id, setCanvasItems)}
                      >
                        + Column
                      </button>
                      <button
                        className="text-xs px-2 py-1 align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-purple-700 text-purple-700 hover:opacity-75"
                        onClick={() =>
                          addSection(
                            tab.id,
                            "below",
                            section.id,
                            setCanvasItems
                          )
                        }
                      >
                        + Section Below
                      </button>
                      <button
                        className="text-xs px-2 py-1 ml-2 align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-purple-700 text-purple-700 hover:opacity-75"
                        onClick={() =>
                          addSection(
                            tab.id,
                            "above",
                            section.id,
                            setCanvasItems
                          )
                        }
                      >
                        + Section Above
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {section.columns.map((column) => (
                      <React.Fragment key={column.id}>
                        <ColumnDropZone
                          column={column}
                          sectionId={section.id}
                          selectedFieldId={selectedFieldId}
                          handleFocus={handleFocus}
                          handleBlur={handleBlur}
                          handleInputChange={handleInputChange}
                          handleMoveItem={handleMoveItem}
                          deleteField={deleteField}
                          ItemType={ItemType}
                        />

                        <button
                          onClick={() => deleteField(column, "column")}
                          className="flex items-center justify-center z-40 -ml-12 shadow shadow-lg bg-white rounded-full h-4 w-4 shadow-black text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
                        </button>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
      )}
    </>
  );
};

export default StudioTabs;
