import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

const ItemType = "FIELD";

const Canvas = ({ items, updateItem, addToCanvas, moveItem }) => {
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult && dropResult.type && dropResult.id) {
        if (!item.fromCanvas) {
          addToCanvas(item.field, dropResult.id, dropResult.type);
        }
      }
      return { name: "Canvas" };
    },
  });

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

  const renderColumn = (column, columnIndex, sectionIndex, tabIndex) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemType,
      drop: (item) => {
        return { type: "column", id: column.id };
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    });

    return (
      <div
        key={column.id}
        ref={drop}
        data-id={column.id}
        data-type="column"
        className={`border p-2 mb-2 min-h-80 ${isOver ? "bg-green-100" : ""}`}
      >
        <h5>{column.name}</h5>
        {column.fields.map((field, fieldIndex) => (
          <DraggableItem
            key={field.id}
            index={fieldIndex}
            item={field}
            selectedFieldId={selectedFieldId}
            handleFocus={handleFocus}
            handleInputChange={handleInputChange}
            moveItem={handleMoveItem}
          />
        ))}
      </div>
    );
  };

  const renderSection = (section, sectionIndex, tabIndex) => (
    <div
      key={section.id}
      data-id={section.id}
      data-type="section"
      className="border p-2 mb-2 w-full"
    >
      <h4>{section.name}</h4>
      {section.columns.map((column, columnIndex) =>
        renderColumn(column, columnIndex, sectionIndex, tabIndex)
      )}
    </div>
  );

  return (
    <div
      ref={drop}
      className="w-full h-full bg-white rounded-2xl shadow-soft-xl p-4 flex flex-col space-y-4"
    >
      {items.map((tab, tabIndex) => (
        <div key={tab.id} data-id={tab.id} data-type="tab">
          <h3>{tab.name}</h3>
          {tab.sections.map((section, sectionIndex) =>
            renderSection(section, sectionIndex, tabIndex)
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
