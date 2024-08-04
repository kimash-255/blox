export const updateItemById = (items, id, type, key, value) => {
  const updateInNestedStructures = (items, id, key, value) => {
    if (!Array.isArray(items)) {
      console.error("Expected items to be an array but got:", items);
      return null;
    }

    for (const tab of items) {
      if (type === "section") {
        const section = tab.sections.find((item) => item.id === id);
        if (section) {
          section[key] = value;
          return items;
        }
      } else if (type === "column") {
        for (const section of tab.sections) {
          const column = section.columns.find((item) => item.id === id);
          if (column) {
            column[key] = value;
            return items;
          }
        }
      } else if (type === "field") {
        for (const section of tab.sections) {
          for (const column of section.columns) {
            const field = column.fields.find((item) => item.id === id);
            if (field) {
              field[key] = value;
              return items;
            }
          }
        }
      }
    }
    return null;
  };

  // Search and update the item based on the type
  if (type === "tab") {
    const tab = items.find((item) => item.id === id);
    if (tab) {
      tab[key] = value;
      return items;
    }
  } else if (type === "section" || type === "column" || type === "field") {
    return updateInNestedStructures(items, id, key, value);
  }

  console.error(`Invalid type specified: ${type}`);
  return null;
};

export const deleteItemById = (items, id, type) => {
  const deleteInNestedStructures = (items, id, type) => {
    if (!Array.isArray(items)) {
      console.error("Expected items to be an array but got:", items);
      return null;
    }

    return items.map((tab) => {
      if (type === "section") {
        tab.sections = tab.sections.filter((item) => item.id !== id);
      } else if (type === "column") {
        tab.sections = tab.sections.map((section) => {
          section.columns = section.columns.filter((item) => item.id !== id);
          return section;
        });
      } else if (type === "field") {
        tab.sections = tab.sections.map((section) => {
          section.columns = section.columns.map((column) => {
            column.fields = column.fields.filter((item) => item.id !== id);
            return column;
          });
          return section;
        });
      }
      return tab;
    });
  };

  if (type === "tab") {
    return items.filter((item) => item.id !== id);
  } else if (type === "section" || type === "column" || type === "field") {
    return deleteInNestedStructures(items, id, type);
  }

  console.error(`Invalid type specified: ${type}`);
  return null;
};
