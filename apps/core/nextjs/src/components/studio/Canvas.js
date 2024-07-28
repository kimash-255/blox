import React, { useState } from "react";
import { useDrop } from "react-dnd";
import DraggableItem from "./DraggableItem";
import PrimaryButton from "../buttons/Primary";

const ItemType = "FIELD";

const Canvas = ({
  items,
  updateItem,
  addToCanvas,
  moveItem,
  setCanvasItems,
}) => {
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [tabs, setTabs] = useState(items); // Initialize tabs state
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.name || ""); // Set default selected tab

  const [{ isOver }, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!item.id && dropResult) {
        addToCanvas(item.field, dropResult.id, dropResult.type, "canvas");
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const generateUniqueName = (prefix, items) => {
    let index = 1;
    while (items.some((item) => item.name === `${prefix} ${index}`)) {
      index++;
    }
    return `${prefix} ${index}`;
  };

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

  const handleMoveItem = (draggedItem, targetItem, parent1Id, parent2Id) => {
    moveItem(draggedItem, targetItem, parent1Id, parent2Id);
  };

  const addColumn = (sectionId) => {
    setCanvasItems((prevItems) => {
      const currentTime = Date.now();
      const newItems = [...prevItems];
      const section = findItemById(newItems, sectionId, "section");
      const lastColumn = section.columns[section.columns.length - 1];

      if (lastColumn && currentTime - lastColumn.id < 200) {
        return prevItems;
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

  const addTab = () => {
    const newTab = {
      id: Date.now(),
      name: generateUniqueName("Tab", tabs),
      type: "tab",
      sections: [
        {
          id: Date.now(),
          name: generateUniqueName("Section", []),
          type: "section",
          columns: [
            {
              id: Date.now(),
              name: generateUniqueName("Column", []),
              type: "column",
              fields: [],
            },
          ],
        },
      ],
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setCanvasItems((prevItems) => [...prevItems, newTab]);
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
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
    <div ref={drop} className="w-full h-full bg-white rounded-md shadow-lg p-3">
      <div className="relative right-0 flex flex-row items-center mb-1">
        <ul className="relative flex flex-wrap p-1 gap-x-2 list-none bg-transparent">
          {tabs.map((tab) => (
            <li key={tab.id} className="z-30 flex-auto text-center">
              <a
                onClick={() => handleTabClick(tab.name)}
                className={`z-30 block w-full px-4 py-1 mb-0 transition-all border-0 rounded-lg ease-soft-in-out ${
                  selectedTab === tab.name
                    ? "bg-pink-100 text-purple-700"
                    : "bg-slate-50 text-slate-700"
                }`}
              >
                <span className="ml-1">{tab.name}</span>
              </a>
            </li>
          ))}
          <li className="z-30 ml-4 flex-auto text-center">
            <div onClick={addTab} className="">
              <PrimaryButton
                text="+ Add Tab"
                className="flex items-center justify-center p-1"
              />
            </div>
          </li>
        </ul>
      </div>
      {tabs.map(
        (tab) =>
          selectedTab === tab.name && (
            <div key={tab.id} className="mb-4">
              {/* <h3 className="text-lg font-semibold mb-2">{tab.name}</h3> */}
              {tab.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-md font-semibold">{section.name}</h4>
                    <div>
                      <button
                        className="text-xs px-2 py-1 align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-fuchsia-500 text-fuchsia-500 hover:opacity-75 mr-2"
                        onClick={() => addColumn(section.id)}
                      >
                        + Column
                      </button>
                      <button
                        className="text-xs px-2 py-1 align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-purple-700 text-purple-700 hover:opacity-75"
                        onClick={() => addSection(tab.id, "below", section.id)}
                      >
                        + Section Below
                      </button>
                      <button
                        className="text-xs px-2 py-1 ml-2 align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 border-purple-700 text-purple-700 hover:opacity-75"
                        onClick={() => addSection(tab.id, "above", section.id)}
                      >
                        + Section Above
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
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
          )
      )}
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
    <div ref={drop} className="flex-1 bg-slate-50 p-3 rounded-lg">
      {column.fields.length === 0 ? (
        <div>
          <DraggableItem
            key={0}
            item={{}}
            index={0}
            column={{}}
            selectedFieldId={selectedFieldId}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleInputChange={handleInputChange}
            moveItem={handleMoveItem}
            parentId={column.id}
            placeholder={true}
          />
        </div>
      ) : (
        column.fields.map((field, index) => (
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
        ))
      )}
    </div>
  );
};

export default Canvas;
