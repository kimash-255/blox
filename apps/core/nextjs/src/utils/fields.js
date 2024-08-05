export const extractFields = (obj) => {
  let fieldsList = [];

  // Function to recursively extract fields from any object
  const extract = (item) => {
    if (Array.isArray(item)) {
      item.forEach(extract);
    } else if (typeof item === "object") {
      if (item.fields) {
        fieldsList = fieldsList.concat(
          item.fields.map(({ id, id1, name, icon, ...rest }) => {
            let newId = id;
            let newId1 = id1;

            if (!id1) {
              newId = convertToUnderscore(name);
              newId1 = newId;
            } else {
              newId = id1;
            }

            return {
              ...rest,
              id: newId,
              id1: newId1,
              name,
            };
          })
        );
      }
      Object.values(item).forEach(extract);
    }
  };

  extract(obj);
  return fieldsList;
};
