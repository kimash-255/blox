// AdvancedSelect.js

import React from "react";
import Select from "react-select";

const options = [
  { value: "", label: "All" },
  { value: "Online", label: "Online" },
  { value: "Offline", label: "Offline" },
  // Add more options as needed
];

const AdvancedSelect = ({ name, value, onChange, options }) => {
  const handleChange = (selectedOption) => {
    onChange(name, selectedOption ? selectedOption.value : "");
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder={`Select ${name}`}
      isClearable
    />
  );
};

export default AdvancedSelect;
