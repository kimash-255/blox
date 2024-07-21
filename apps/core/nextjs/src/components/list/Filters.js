import React from "react";
import FilterSelect from "./Select";
import FilterText from "./FilterText";

const Filters = ({ filters, onFilterChange }) => {
  const handleFilterChange = (name, value) => {
    onFilterChange(name, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
      {Object.keys(filters).map((filterKey) => {
        const filter = filters[filterKey];
        return (
          <div className="flex flex-col" key={filterKey}>
            {filter.type === "select" ? (
              <FilterSelect
                placeholder={filterKey}
                name={filterKey}
                handleChange={handleFilterChange}
                options={filter.options}
              />
            ) : (
              <FilterText
                placeholder={filterKey}
                name={filterKey}
                handleChange={handleFilterChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
