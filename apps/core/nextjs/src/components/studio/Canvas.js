import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";

const ItemType = "FIELD";

const Canvas = ({
  items,
  updateItem,
  addToCanvas,
  moveItem,
  setCanvasItems,
}) => {
  const [selectedFieldId, setSelectedFieldId] = useState(null);

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!item.id) {
        addToCanvas(item.field, dropResult.id, dropResult.type, "canvas");
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleInputChange = (index, field, value) => {
    const updatedItem = { ...items[index], [field]: value };
    updateItem(index, updatedItem);
  };

  const handleFocus = (id) => {
    setSelectedFieldId(id);
  };

  const handleBlur = () => {
    setSelectedFieldId("");
  };

  const handleMoveItem = (draggedItem, targetItem, parent2Id, parent1Id) => {
    moveItem(draggedItem, targetItem, parent2Id, parent1Id);
  };

  const addColumn = (sectionId) => {
    setCanvasItems((prevItems) => {
      const currentTime = Date.now();
      const newItems = [...prevItems];
      const section = findItemById(newItems, sectionId, "section");
      const lastColumn = section.columns[section.columns.length - 1];

      if (lastColumn && currentTime - lastColumn.id < 200) {
        return prevItems; // Prevent adding a new column if the last column was added within 2 seconds
      }

      const newColumn = {
        id: currentTime,
        name: `Column ${
          newItems.reduce(
            (acc, tab) =>
              acc +
              tab.sections.reduce(
                (sAcc, section) => sAcc + section.columns.length,
                0
              ),
            0
          ) + 1
        }`,
        type: "column",
        fields: [],
      };

      section.columns.push(newColumn);
      return newItems;
    });
  };

  const addSection = (tabId, position, sectionId) => {
    let lastSection = "";
    setCanvasItems((prevItems) => {
      const currentTime = Date.now();
      const newItems = [...prevItems];
      const tab = findItemById(newItems, tabId, "tab");
      if (lastSection == "") {
        lastSection = tab.sections[tab.sections.length - 1];
      }

      if (lastSection && currentTime - lastSection.id < 200) {
        return prevItems;
      }

      const newSection = {
        id: currentTime,
        name: `Section ${
          newItems.reduce((acc, tab) => acc + tab.sections.length, 0) + 1
        }`,
        type: "section",
        columns: [
          {
            id: Date.now(),
            name: "Column 1",
            type: "column",
            fields: [],
          },
        ],
      };
      lastSection = newSection;

      const sectionIndex = tab.sections.findIndex(
        (section) => section.id === sectionId
      );
      if (position === "above" && sectionIndex !== -1) {
        tab.sections.splice(sectionIndex, 0, newSection);
      } else if (position === "below" && sectionIndex !== -1) {
        tab.sections.splice(sectionIndex + 1, 0, newSection);
      } else {
        tab.sections.push(newSection);
      }
      return newItems;
    });
  };

  const findItemById = (items, id, type) => {
    if (type === "tab") {
      return items.find((item) => item.id === id);
    }
    for (const tab of items) {
      if (type === "section") {
        const section = tab.sections.find((item) => item.id === id);
        if (section) return section;
      } else if (type === "column") {
        for (const section of tab.sections) {
          const column = section.columns.find((item) => item.id === id);
          if (column) return column;
        }
      }
    }
    console.error(`Item not found: ${id} of type ${type}`);
    return null;
  };

  return (
    <div
      ref={drop}
      className="w-full h-full bg-white rounded-2xl shadow-lg p-4"
    >
      {items.map((tab) => (
        <div key={tab.id} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{tab.name}</h3>
          {tab.sections.map((section) => (
            <div key={section.id} className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-md font-semibold">{section.name}</h4>
                <div>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2"
                    onClick={() => addColumn(section.id)}
                  >
                    Add Column
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                    onClick={() => addSection(tab.id, "below", section.id)}
                  >
                    Add Section
                  </button>
                </div>
              </div>
              <div className="flex space-x-4">
                {section.columns.map((column) => (
                  <ColumnDropZone
                    key={column.id}
                    column={column}
                    sectionId={section.id}
                    selectedFieldId={selectedFieldId}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                    handleInputChange={handleInputChange}
                    handleMoveItem={handleMoveItem}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const ColumnDropZone = ({
  column,
  sectionId,
  selectedFieldId,
  handleFocus,
  handleBlur,
  handleInputChange,
  handleMoveItem,
}) => {
  const [, drop] = useDrop({
    accept: ItemType,
    drop: () => ({ id: column.id, type: "column" }),
  });

  return (
    <div ref={drop} className="flex-1 bg-gray-200 p-4 rounded-lg">
      <h5 className="text-sm font-semibold mb-2">{column.name}</h5>
      {column.fields.map((field, index) => (
        <DraggableItem
          key={field.id}
          item={field}
          index={index}
          column={column}
          selectedFieldId={selectedFieldId}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleInputChange={handleInputChange}
          moveItem={handleMoveItem}
          parentId={column.id}
        />
      ))}
    </div>
  );
};

export default Canvas;
