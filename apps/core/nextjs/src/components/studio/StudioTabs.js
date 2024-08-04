import React, { useState } from "react";
import ColumnDropZone from "./ColumnDropZone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
  return (
    <>
      {tabs.map(
        (tab) =>
          selectedTab === tab.name && (
            <div key={tab.id} className="mb-4">
              {tab.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div className="flex items-center justify-between my-2">
                    <div className="flex items-center justify-start">
                      <h4 className="text-md font-semibold">{section.name}</h4>

                      <button
                        onClick={() => deleteField(section, "section")}
                        className="flex items-center justify-center z-40 -mt-2 shadow shadow-lg bg-white rounded-full h-4 w-4 shadow-black text-red-500 hover:text-red-700"
                      >
                        <FontAwesomeIcon icon={faTimes} className="w-3 h-3 " />
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
                      <>
                        <ColumnDropZone
                          key={column.id}
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
                          <FontAwesomeIcon
                            icon={faTimes}
                            className="w-3 h-3 "
                          />
                        </button>
                      </>
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
