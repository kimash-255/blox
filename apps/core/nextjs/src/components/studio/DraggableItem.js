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
  parentId,
  placeholder = false,
}) => {
  const ref = useRef(null);

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

  const isLayout = item.type === "layout";

  return (
    <div
      ref={ref}
      className={`flex flex-col min-w-0 break-words shadow-soft-xl rounded-sm bg-clip-border p-2 mb-1 ${
        selectedFieldId === item.id ? "bg-white" : "bg-gray-50"
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
              {/* {selectedFieldId === item.id && (
                <p className="mb-0 font-sans text-xs font-semibold leading-normal">
                  Name
                </p>
              )} */}
              <input
                type="text"
                value={item.name}
                onFocus={() => handleFocus(item.id)}
                // onBlur={handleBlur}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                className="block w-full p-1 text-sm border border-gray-300 rounded"
              />
            </div>
          </div>
          {selectedFieldId === item.id && !isLayout && (
            <div className="mt-2 grid grid-cols-2 gap-x-2">
              <div className="">
                {/* <p className="mb-0 font-sans text-xs font-semibold leading-normal">
                  ID
                </p> */}
                <input
                  type="text"
                  value={item.id}
                  onFocus={() => handleFocus(item.id)}
                  // onBlur={handleBlur}
                  onChange={(e) =>
                    handleInputChange(index, "id", e.target.value)
                  }
                  className="mt-1 block w-full text-sm p-1 border border-gray-300 rounded"
                />
              </div>
              <div className="">
                {/* <p className="mb-0 font-sans text-xs font-semibold leading-normal">
                  Type
                </p> */}
                <select
                  value={item.type}
                  onChange={(e) =>
                    handleInputChange(index, "type", e.target.value)
                  }
                  className="mt-1 block w-full p-1 text-sm border border-gray-300 rounded"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="date">Date</option>
                  <option value="email">Email</option>
                  {/* Add more options as needed */}
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DraggableItem;
