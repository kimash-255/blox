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
      className="p-2 mb-2 border border-gray-300 rounded cursor-pointer"
      onClick={() => {
        console.log(8888);
        addToCanvas(field);
      }}
    >
      {field.name}
    </div>
  );
};

export default Field;
