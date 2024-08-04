import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fields from "@/data/fields";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons"; // Import the "x" and "edit" icons
import LinkSelect from "../new/LinkSelect";
import DocSelect from "../new/DocSelect";
import FieldSettingsModal from "./FieldSettingsModal"; // Import the FieldSettingsModal component

const ItemType = "FIELD";

const DraggableItem = ({
  item,
  column,
  index,
  selectedFieldId,
  handleFocus,
  handleBlur,
  handleInputChange,
  moveItem,
  parentId,
  placeholder = false,
  deleteField,
}) => {
  const ref = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index, parentId, id: item?.id, item: item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index || draggedItem.parentId !== parentId) {
        moveItem(draggedItem.item, item, draggedItem.parentId, parentId);
        draggedItem.index = index;
        draggedItem.parentId = parentId;
      }
    },
  });

  drag(drop(ref));

  if (!item) {
    console.error(`Item at index ${index} is undefined`);
    return null;
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div
      ref={ref}
      className={`flex flex-col min-w-0 break-words shadow-soft-xl rounded-sm bg-clip-border p-2 mb-1 ${
        selectedFieldId === item ? "bg-white" : "bg-gray-50"
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {placeholder ? (
        <div className="p-2 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
          Drop fields here
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center w-full">
            <div className="flex items-center justify-center w-8 h-8 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 mr-1">
              <FontAwesomeIcon
                icon={item.icon}
                className="text-white h-4 w-4"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                value={item.name}
                onFocus={() => handleFocus(item)}
                onChange={(e) =>
                  handleInputChange("name", e.target.value, item, "field")
                }
                className="block w-full p-1 text-sm border border-gray-300 rounded"
              />
            </div>
            {selectedFieldId === item && (
              <>
                <button
                  onClick={openModal}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button
                  onClick={() => deleteField(item, "field")}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            )}
          </div>
          {selectedFieldId === item && (
            <div className="mt-2 grid grid-cols-2 gap-x-2">
              <div className="">
                <input
                  type="text"
                  value={item.id1}
                  onChange={(e) => {
                    handleInputChange("id1", e.target.value, item, "field");
                  }}
                  className="mt-1 block w-full text-sm p-1 border border-gray-300 rounded"
                />
              </div>
              <div className="">
                <select
                  value={item.type}
                  onFocus={() => handleFocus(item)}
                  onChange={(e) =>
                    handleInputChange("type", e.target.value, item, "field")
                  }
                  className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded"
                >
                  {fields.map((field) => (
                    <option key={field.id} value={field.name}>
                      <FontAwesomeIcon icon={field.icon} className="mr-2" />
                      {field.name}
                    </option>
                  ))}
                </select>
              </div>
              {(item.type == "ForeignKey" ||
                item.type == "OneToOneField" ||
                item.type == "ManyToManyField") && (
                <div className="mt-1">
                  <DocSelect
                    name={item.id}
                    handleChange={(e) => {
                      handleInputChange("doc", e.label, item, "field");
                    }}
                    placeholder={item.doc || `Select document`}
                  />
                </div>
              )}
            </div>
          )}
        </>
      )}
      {isModalOpen && (
        <FieldSettingsModal
          item={item}
          handleInputChange={handleInputChange}
          closeModal={closeModal}
          fields={fields}
        />
      )}
    </div>
  );
};

export default DraggableItem;
