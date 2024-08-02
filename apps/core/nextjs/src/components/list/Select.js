import React, { useState } from "react";
import Select from "react-select";

const FilterSelect = ({
  name,
  handleChange,
  options,
  placeholder = "Select",
}) => {
  const [selected, setSelected] = useState(null);

  const handleSelectionChange = (selectedOption) => {
    setSelected(selectedOption);
    handleChange(name, selectedOption.value);
  };

  return (
    <Select
      value={selected}
      onChange={handleSelectionChange}
      options={options}
      isSearchable
      placeholder={placeholder}
      className="text-xs text-gray-800 dark:text-gray-200 w-60"
    />
  );
};

export default FilterSelect;
