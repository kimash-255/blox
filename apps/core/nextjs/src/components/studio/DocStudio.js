// pages/docstudio.js
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import fieldsData from "@/data/fields";
import stylesData from "@/data/styles";
import Field from "./Field";
import Style from "./Style";

const DocStudio = () => {
  const [fields, setFields] = useState(fieldsData);
  const [styles, setStyles] = useState(stylesData);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) return;

    const sourceClone = Array.from(fields);
    const destClone = Array.from(styles);

    const [removed] = sourceClone.splice(source.index, 1);
    destClone.splice(destination.index, 0, removed);

    setFields(sourceClone);
    setStyles(destClone);
  };

  const saveFields = () => {
    // Save fields to fields.js
    console.log("Fields saved:", fields);
  };

  const saveStyles = () => {
    // Save styles to styles.js
    console.log("Styles saved:", styles);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Doc Studio</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex">
          <Droppable droppableId="fields">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/2 p-4 bg-gray-100 rounded mr-4"
              >
                <h2 className="text-xl font-semibold mb-4">Fields</h2>
                {fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Field field={field} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="styles">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/2 p-4 bg-gray-100 rounded"
              >
                <h2 className="text-xl font-semibold mb-4">Styles</h2>
                {styles.map((style, index) => (
                  <Draggable
                    key={style.id}
                    draggableId={style.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Style style={style} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <div className="mt-6">
        <button
          onClick={saveFields}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Save Fields
        </button>
        <button
          onClick={saveStyles}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Styles
        </button>
      </div>
    </div>
  );
};

export default DocStudio;
