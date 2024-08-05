import React from "react";
import FilterSelect from "./Select";
import FilterText from "./FilterText";

const Filters = ({ filters, onFilterChange, handleClearFilters }) => {
  const handleFilterChange = (name, value) => {
    onFilterChange(name, value);
  };

  return (
    <div className="flex gap-2 mb-2">
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
                value={filter.value}
              />
            ) : (
              <FilterText
                placeholder={filterKey}
                name={filterKey}
                handleChange={handleFilterChange}
                value={filter.value}
              />
            )}
          </div>
        );
      })}

      <button
        className="bg-red-500 text-white font-semibold py-2 px-2 rounded md:ml-2 align-middle transition-all border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 bg-fuchsia-500 text-white hover:opacity-75"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filters;
