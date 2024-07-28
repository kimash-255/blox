import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

const ItemType = "FIELD";

const Canvas = ({ items, updateItem, addToCanvas, moveItem }) => {
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      if (!item.fromCanvas) {
        addToCanvas(item.field);
      }
      return { name: "Canvas" };
    },
  }));

  const handleInputChange = (index, field, value) => {
    const updatedItem = { ...items[index], [field]: value };
    updateItem(index, updatedItem);
  };

  const handleFocus = (id) => {
    setSelectedFieldId(id);
  };

  const handleMoveItem = (dragIndex, hoverIndex) => {
    moveItem(dragIndex, hoverIndex);
  };

  return (
    <div
      ref={drop}
      className="w-full h-full bg-white rounded-2xl shadow-soft-xl p-4 flex flex-col space-y-4"
    >
      {items.map((item, index) => {
        if (!item) {
          console.error(`Item at index ${index} is undefined`);
          return null; // Skip rendering if item is undefined
        }

        return (
          <DraggableItem
            key={item.id}
            index={index}
            item={item}
            selectedFieldId={selectedFieldId}
            handleFocus={handleFocus}
            handleInputChange={handleInputChange}
            moveItem={handleMoveItem}
          />
        );
      })}
    </div>
  );
};

export default Canvas;
