import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  parentId, // Section ID
}) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index, parentId, id: item.id, item: item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index && draggedItem.parentId === parentId) {
        moveItem(draggedItem.item, item, parentId, draggedItem.parentId);
      }
    },
  });

  drag(drop(ref));

  if (!item) {
    console.error(`Item at index ${index} is undefined`);
    return null;
  }

  const isLayout = item.type === "layout";

  return (
    <div
      ref={ref}
      className={`flex flex-col min-w-0 break-words shadow-soft-xl rounded-2xl bg-clip-border p-4 ${
        selectedFieldId === item.id ? "bg-white" : "bg-gray-100"
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex flex-row items-center w-full">
        <div className="flex items-center justify-center w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 mr-4">
          <FontAwesomeIcon icon={item.icon} className="text-white h-8 w-8" />
        </div>
        <div className="w-full">
          {selectedFieldId === item.id && (
            <p className="mb-0 font-sans text-sm font-semibold leading-normal">
              Name
            </p>
          )}
          <input
            type="text"
            value={item.name}
            onFocus={() => handleFocus(item.id)}
            onBlur={handleBlur}
            onChange={(e) => handleInputChange(index, "name", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      {selectedFieldId === item.id && !isLayout && (
        <div className="mt-2">
          <p className="mb-0 font-sans text-sm font-semibold leading-normal">
            ID
          </p>
          <input
            type="text"
            value={item.id}
            onFocus={() => handleFocus(item.id)}
            onBlur={handleBlur}
            onChange={(e) => handleInputChange(index, "id", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
          <p className="mt-2 mb-0 font-sans text-sm font-semibold leading-normal">
            Type
          </p>
          <select
            value={item.type}
            onChange={(e) => handleInputChange(index, "type", e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="email">Email</option>
            {/* Add more options as needed */}
          </select>
        </div>
      )}
    </div>
  );
};

export default DraggableItem;
