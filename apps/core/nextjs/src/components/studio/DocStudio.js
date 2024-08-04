import React, { useState, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Field from "./Field";
import Canvas from "./Canvas";
import fieldsData from "@/data/fields";
import SecondaryButton from "../buttons/Secondary";
import { toUnderscoreLowercase } from "@/utils/textConvert";

const DocStudio = ({ initialData, handleSave }) => {
  const [fields] = useState(fieldsData);
  const lastAddedFieldRef = useRef({ id: null, timestamp: 0 });
  const fieldCountsRef = useRef({});
  const [canvasItems, setCanvasItems] = useState(initialData);

  useEffect(() => {
    if (initialData) {
      setCanvasItems(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveCanvas();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvasItems]);

  const addToCanvas = (field, parentId, parentType, from) => {
    const fieldType = field.name;
    fieldCountsRef.current[fieldType] =
      (fieldCountsRef.current[fieldType] || 0) + 1;
    const newFieldName = `${fieldType} ${fieldCountsRef.current[fieldType]}`;
    const time = Date.now();

    const toUnderscoreFormat = (name) => {
      return name
        .replace(/\s+/g, "_") // Replace spaces with underscores
        .toLowerCase(); // Convert to lowercase
    };

    const newField = {
      ...field,
      id: `${toUnderscoreFormat(newFieldName)}`,
      id1: ``,
      name: newFieldName,
      type: fieldType,
    };

    setCanvasItems((prevItems) => {
      const currentTime = Date.now();
      const newItems = [...prevItems];

      if (
        lastAddedFieldRef.current &&
        field &&
        lastAddedFieldRef.current.id === field.id &&
        currentTime - lastAddedFieldRef.current.timestamp < 1000
      ) {
        return newItems;
      }

      lastAddedFieldRef.current = { id: field.id, timestamp: currentTime };
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

  const updateCanvasItem = (updatedItem) => {
    setCanvasItems(updatedItem);
  };

  const moveItem = (draggedItem, targetItem, parent1Id, parent2Id) => {
    setCanvasItems((prevItems) => {
      const newItems = [...prevItems];
      const parent1 = findItemById(newItems, parent1Id, "column");
      const parent2 = findItemById(newItems, parent2Id, "column");

      if (parent1 && parent2 && parent1.fields && parent2.fields) {
        const draggedIndex = parent1.fields.findIndex(
          (field) => field.id === draggedItem?.id
        );
        const targetIndex = parent2.fields.findIndex(
          (field) => field.id === targetItem.id
        );

        if (draggedIndex !== -1) {
          const [movedItem] = parent1.fields.splice(draggedIndex, 1);

          parent2.fields.splice(targetIndex, 0, movedItem);
        } else {
          console.error("Dragged item not found in the original parent");
        }
      } else {
        console.error("Parent not found or parent.fields is undefined");
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

  const saveCanvas = () => {
    const transformItem = (item) => {
      let newId = item.id;
      let newId1 = item.id1;

      if (!item.id || item.id === "") {
        newId = toUnderscoreLowercase(item.name);
      }

      if (!item.id1 || item.id1 === "") {
        newId = toUnderscoreLowercase(item.name);
        newId1 = newId;
      }

      const transformedItem = {
        ...item,
        id: newId,
        id1: newId1,
      };

      if (item.type === "section" || item.type === "column") {
        return {
          ...transformedItem,
          columns: item.columns ? item.columns.map(transformItem) : [],
          sections: item.sections ? item.sections.map(transformItem) : [],
          fields: item.fields ? item.fields.map(transformItem) : [],
        };
      } else if (item.type === "tab") {
        return {
          ...transformedItem,
          sections: item.sections.map(transformItem),
        };
      } else if (item.type === "field") {
        return transformedItem;
      }

      return transformedItem;
    };

    const transformedCanvasItems = canvasItems.map(transformItem);
    setCanvasItems(transformedCanvasItems);

    handleSave(transformedCanvasItems);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="px-6 flex">
        <div className="w-1/5 p-4 bg-white rounded mr-4 max-h-[75vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Fields</h2>
          {fields.map((field) => (
            <Field key={field.id} field={field} addToCanvas={addToCanvas} />
          ))}
        </div>

        <div className="w-4/5 flex flex-col">
          <div
            onClick={saveCanvas}
            className="flex cursor-pointer bg-white p-2 mb-2 rounded items-end justify-end"
          >
            <SecondaryButton
              text="Save"
              className="flex items-center justify-center px-6"
            />
          </div>
          {canvasItems && (
            <Canvas
              items={canvasItems}
              updateItem={updateCanvasItem}
              addToCanvas={addToCanvas}
              moveItem={moveItem}
              setCanvasItems={setCanvasItems}
            />
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default DocStudio;
