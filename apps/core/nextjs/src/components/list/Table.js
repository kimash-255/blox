import React, { useState, useEffect } from "react";
import TableTemplate from "./TableTemplate";
import Pagination from "./Pagination";
import Filters from "./Filters";
import { fetchData } from "@/utils/Api";
import { toast } from "react-toastify";
import { useData } from "@/contexts/DataContext";

const ListTable = ({ tableConfig, filters, endpoint }) => {
  const { data: contextData, setData } = useData();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [activeFilters, setActiveFilters] = useState(() =>
    Object.keys(filters).reduce((acc, key) => {
      acc[key] = ""; // Initialize filters with empty values
      return acc;
    }, {})
  );

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const extendedFilters = {
          ...Object.fromEntries(
            Object.entries(activeFilters).map(([key, value]) => [
              `${key}_icontains`,
              value,
            ])
          ),
          page: currentPage,
          page_length: itemsPerPage,
        };
        const response = await fetchData(extendedFilters, endpoint);
        if (response?.data?.list) {
          setData(response?.data?.list);
          setFilteredData(response?.data?.list);
          setTotalPages(response.data.total_pages);
        }
      } catch (error) {
        toast.error(`Failed to fetch data, ${error.message || error}`);
      }
    };

    fetchData1();
  }, [endpoint, currentPage, itemsPerPage, activeFilters, setData]);

  useEffect(() => {
    if (!Array.isArray(contextData)) {
      setFilteredData([]);
      return;
    }

    const filtered = contextData.filter((item) => {
      return Object.keys(activeFilters).every((key) => {
        if (!activeFilters[key]) return true;
        return item[key]
          ?.toLowerCase()
          .includes(activeFilters[key]?.toLowerCase());
      });
    });

    setFilteredData(filtered);
  }, [contextData, activeFilters, currentPage, itemsPerPage]);

  const handleFilterChange = (name, value) => {
    const newFilters = { ...activeFilters, [name]: value };
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    const clearedFilters = Object.keys(activeFilters).reduce((acc, key) => {
      acc[key] = ""; // Reset each filter to an empty string
      return acc;
    }, {});
    setActiveFilters(clearedFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleEdit = (item) => {
    // console.log("Edit item:", item);
  };

  const currentItems = filteredData;

  return (
    <div className="px-8">
      <div className="flex flex-wrap justify-between items-center mb-2">
        <Filters
          filters={Object.keys(filters).reduce((acc, key) => {
            acc[key] = { ...filters[key], value: activeFilters[key] };
            return acc;
          }, {})}
          onFilterChange={handleFilterChange}
          handleClearFilters={handleClearFilters}
        />
        <button
          className="bg-red-500 text-white font-semibold py-2 px-2 rounded md:ml-2 align-middle transition-all border border-solid rounded-lg shadow-none cursor-pointer leading-pro ease-soft-in text-xs bg-150 active:opacity-85 hover:scale-102 tracking-tight-soft bg-x-25 bg-fuchsia-500 text-white hover:opacity-75"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
      <TableTemplate
        tableConfig={tableConfig}
        data={currentItems}
        onEdit={handleEdit}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
};

export default ListTable;
