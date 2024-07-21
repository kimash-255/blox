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
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const extendedFilters = {
          ...activeFilters,
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
    const filterName = name;
    const newFilters = { ...activeFilters, [filterName]: value };
    setActiveFilters(newFilters);
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
    console.log("Edit item:", item);
  };

  const currentItems = filteredData;

  return (
    <div className="p-8">
      <Filters filters={filters} onFilterChange={handleFilterChange} />
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
