import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDrag } from "react-dnd";

const ItemType = "FIELD";

const Field = ({ field, addToCanvas }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, field },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="p-2 mb-2 flex flex-row border border-gray-300 rounded cursor-pointer"
      onClick={() => addToCanvas(field, "section-1", "section", "item")}
    >
      <div className="flex items-center justify-center w-6 h-6 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500 mr-1">
        <FontAwesomeIcon icon={field.icon} className="text-white h-4 w-4" />
      </div>
      {field.name}
    </div>
  );
};

export default Field;
