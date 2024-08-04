const generateUniqueName = (prefix, items) => {
  let index = 1;
  while (items.some((item) => item.name === `${prefix} ${index}`)) {
    index++;
  }
  return `${prefix} ${index}`;
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

export const addColumn = (sectionId, setCanvasItems) => {
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

export const addSection = (tabId, position, sectionId, setCanvasItems) => {
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

export const addTab = (tabs, setTabs, setCanvasItems) => {
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
