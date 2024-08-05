import React, { useState } from "react";
import DocLink from "./DocLink";
import DataTable from "./DataTable";

const ChildTable = ({
  name,
  handleChange,
  doc,
  placeholder = "Select",
  readOnly = false,
  hidden = false,
}) => {
  const [selected, setSelected] = useState([]);
  const [linkResponse, setLinkResponse] = useState(null); // State to store linkresponse

  // Extract unique keys from selected items for column headers
  const getColumnHeaders = () => {
    const allKeys = new Set();
    selected.forEach((item) => {
      Object.keys(item).forEach((key) => allKeys.add(key));
    });

    const allKeysArray = Array.from(allKeys);
    const idIndex = allKeysArray.indexOf("id");
    const createdAtIndex = allKeysArray.indexOf("created_at");
    const modifiedAtIndex = allKeysArray.indexOf("modified_at");

    if (idIndex > -1) {
      allKeysArray.splice(idIndex, 1);
    }
    if (createdAtIndex > -1) {
      allKeysArray.splice(createdAtIndex, 1);
    }
    if (modifiedAtIndex > -1) {
      allKeysArray.splice(modifiedAtIndex, 1);
    }

    const orderedKeys = ["id", ...allKeysArray, "created_at", "modified_at"];
    return orderedKeys.map((key) => ({
      label: key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), // Format label
      key,
    }));
  };

  const columns = getColumnHeaders();

  const handleSelectionChange = (selectedOption) => {
    const newSelection = selectedOption.value;
    setSelected((prevSelected) => {
      const updatedSelection = [...prevSelected, newSelection];

      // Convert updatedSelection to a list of ids
      const idList = updatedSelection.map((item) => item.id);

      handleChange(idList);
      return updatedSelection;
    });
  };

  const handleDelete = (item) => {
    setSelected(selected.filter((i) => i !== item));
  };

  return (
    <div className={`relative ${hidden ? "hidden" : ""}`}>
      {/* Multi-select Dropdown */}
      <div>
        <DocLink
          name={name}
          handleChange={handleSelectionChange}
          doc={doc}
          isMulti={false}
          placeholder={placeholder}
          exclude={selected} // Pass selected list to exclude
          onLinkResponse={setLinkResponse} // Pass setLinkResponse to DocLink
        />
      </div>

      {/* Selected Items Table */}
      <DataTable
        data={selected}
        columns={columns}
        linkResponse={linkResponse}
        onDelete={handleDelete}
        readOnly={readOnly}
      />
    </div>
  );
};

export default ChildTable;
