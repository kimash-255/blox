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
              typeof value === "string" ? `${key}_icontains` : key,
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

        const itemValue = item[key];
        const filterValue = activeFilters[key];

        if (typeof itemValue === "string" && typeof filterValue === "string") {
          return itemValue.toLowerCase().includes(filterValue.toLowerCase());
        }

        return itemValue === filterValue;
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
    <div className="px-4 md:px-8 w-full">
      <div className="flex flex-wrap justify-between items-center mb-2">
        <Filters
          filters={Object.keys(filters).reduce((acc, key) => {
            acc[key] = { ...filters[key], value: activeFilters[key] };
            return acc;
          }, {})}
          onFilterChange={handleFilterChange}
          handleClearFilters={handleClearFilters}
        />
      </div>
      <div className="w-[98%]">
        <TableTemplate
          tableConfig={tableConfig}
          data={currentItems}
          onEdit={handleEdit}
        />
      </div>
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
