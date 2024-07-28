import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Field from "./Field"; // Update path according to your structure
import Canvas from "./Canvas"; // Update path according to your structure
import fieldsData from "@/data/fields"; // Update path according to your structure

const DocStudio = () => {
  const [fields] = useState(fieldsData);
  const lastAddedFieldRef = useRef({ id: null, timestamp: 0 });
  const fieldCountsRef = useRef({});
  const [canvasItems, setCanvasItems] = useState([
    {
      id: "tab-1",
      name: "Details",
      type: "tab",
      sections: [
        {
          id: "section-1",
          name: "Section 1",
          type: "section",
          columns: [
            {
              id: "column-1",
              name: "Column 1",
              type: "column",
              fields: [],
            },
          ],
        },
      ],
    },
  ]);

  const addToCanvas = (field, parentId, parentType) => {
    const currentTime = Date.now();
    console.log(currentTime, field, parentId, parentType);

    if (
      lastAddedFieldRef.current &&
      lastAddedFieldRef.current.id === field.id &&
      currentTime - lastAddedFieldRef.current.timestamp < 1000
    ) {
      return;
    }

    lastAddedFieldRef.current = { id: field.id, timestamp: currentTime };

    const fieldType = field.name;
    fieldCountsRef.current[fieldType] =
      (fieldCountsRef.current[fieldType] || 0) + 1;
    const newFieldName = `${fieldType} ${fieldCountsRef.current[fieldType]}`;

    const newField = {
      ...field,
      id: `${field.id}-${currentTime}`,
      name: newFieldName,
    };

    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      const parent = findItemById(newItems, parentId, parentType);
      if (parent && parent.fields) {
        parent.fields.push(newField);
      } else {
        console.error("Parent not found or parent.fields is undefined", {
          parentId,
          parentType,
        });
      }
      return newItems;
    });
  };

  const updateCanvasItem = (index, updatedItem) => {
    setCanvasItems((prevItems) => {
      const newCanvasItems = [...prevItems];
      newCanvasItems[index] = updatedItem;
      return newCanvasItems;
    });
  };

  const moveItem = (dragIndex, hoverIndex, parentType) => {
    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      const parent = findItemById(newItems, dragIndex, parentType);
      const [movedItem] = parent.fields.splice(dragIndex, 1);
      parent.fields.splice(hoverIndex, 0, movedItem);
      return newItems;
    });
  };

  const findItemById = (items, id, type) => {
    console.log("Finding item by ID:", id, "of type:", type);
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

  const saveCanvas = () => {
    console.log("Canvas saved:", canvasItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="px-6 flex">
        <div className="w-1/4 p-4 bg-gray-100 rounded mr-4">
          <h2 className="text-xl font-semibold mb-4">Fields</h2>
          {fields.map((field) => (
            <Field key={field.id} field={field} addToCanvas={addToCanvas} />
          ))}
        </div>
        <div className="w-3/4 p-4 bg-gray-200 rounded flex flex-col items-center">
          <Canvas
            items={canvasItems}
            updateItem={updateCanvasItem}
            addToCanvas={addToCanvas}
            moveItem={moveItem}
            setCanvasItems={setCanvasItems}
          />
        </div>
      </div>
      <div className="m-6">
        <button
          onClick={saveCanvas}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </DndProvider>
  );
};

export default DocStudio;
