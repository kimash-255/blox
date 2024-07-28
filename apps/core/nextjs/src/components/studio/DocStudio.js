import React, { useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Field from "@/components/studio/Field";
import Canvas from "@/components/studio/Canvas";
import fieldsData from "@/data/fields";

const DocStudio = () => {
  const [fields] = useState(fieldsData);
  const [canvasItems, setCanvasItems] = useState([]);
  const lastAddedFieldRef = useRef(null);
  const fieldCountsRef = useRef({});

  const addToCanvas = (field) => {
    const currentTime = Date.now();
    console.log(field);

    if (
      lastAddedFieldRef.current &&
      lastAddedFieldRef.current.id === field.id &&
      currentTime - lastAddedFieldRef.current.timestamp < 1000
    ) {
      return;
    }

    lastAddedFieldRef.current = { id: field.id, timestamp: currentTime };

    // Increment field type count and update field name
    const fieldType = field.name;
    fieldCountsRef.current[fieldType] =
      (fieldCountsRef.current[fieldType] || 0) + 1;
    const newFieldName = `${fieldType} ${fieldCountsRef.current[fieldType]}`;

    const newField = {
      ...field,
      id: `${field.id}-${currentTime}`,
      name: newFieldName,
    };

    setCanvasItems((prevItems) => [...prevItems, newField]);
  };

  const updateCanvasItem = (index, updatedItem) => {
    setCanvasItems((prevItems) => {
      const newCanvasItems = [...prevItems];
      newCanvasItems[index] = updatedItem;
      return newCanvasItems;
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const updatedItems = [...canvasItems];
    const [draggedItem] = updatedItems.splice(dragIndex, 1);
    updatedItems.splice(hoverIndex, 0, draggedItem);
    setCanvasItems(updatedItems);
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
