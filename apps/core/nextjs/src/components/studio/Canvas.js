import React, { useState } from "react";
import { useDrop } from "react-dnd";
import PrimaryButton from "../buttons/Primary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { addTab } from "./AddFields";
import { deleteItemById } from "./utils";
import StudioTabs from "./StudioTabs";

const ItemType = "FIELD";

const Canvas = ({
  items,
  updateItem,
  addToCanvas,
  moveItem,
  setCanvasItems,
}) => {
  const [tabs, setTabs] = useState(items);
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.name || "");

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

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

  const deleteField = (item, type) => {
    const updatedItems = deleteItemById(items, item.id, type);
    setCanvasItems([...updatedItems]);
  };

  return (
    <div ref={drop} className="w-full h-full bg-white rounded-md shadow-lg p-3">
      <div className="relative right-0 flex flex-row items-center mb-1">
        <ul className="relative flex flex-wrap p-1 gap-x-2 list-none bg-transparent">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className="z-30 flex flex-row text-center cursor-pointer"
            >
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
              <button
                onClick={() => deleteField(tab, "tab")}
                className="flex items-center justify-center z-40 -mt-2 shadow shadow-lg bg-white rounded-full h-4 w-4 shadow-black text-red-500 hover:text-red-700"
              >
                <FontAwesomeIcon icon={faTimes} className="w-3 h-3 " />
              </button>
            </li>
          ))}
          <li className="z-30 ml-4 flex-auto text-center">
            <div
              onClick={() => addTab(tabs, setTabs, setCanvasItems)}
              className=""
            >
              <PrimaryButton
                text="+ Add Tab"
                className="flex items-center justify-center p-1"
              />
            </div>
          </li>
        </ul>
      </div>
      <StudioTabs
        tabs={tabs}
        selectedTab={selectedTab}
        deleteField={deleteField}
        setCanvasItems={setCanvasItems}
        ItemType={ItemType}
        items={items}
        moveItem={moveItem}
      />
    </div>
  );
};

export default Canvas;
