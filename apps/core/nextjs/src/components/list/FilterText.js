const FilterText = ({ placeholder, name, handleChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      onChange={(e) => handleChange(name, e.target.value)}
      className="p-2 border rounded"
    />
  );
};

export default FilterText;
