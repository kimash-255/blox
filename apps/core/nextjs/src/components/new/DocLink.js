import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchData } from "@/utils/Api";
import { toast } from "react-toastify";
import { toUnderscoreLowercase } from "@/utils/textConvert";
// import toast from "react-hot-toast"; // Ensure this import aligns with your toast setup

const DocLink = ({
  name,
  handleChange,
  placeholder = "Select",
  doc,
  isMulti = false, // Optional: allow multi-select
}) => {
  const [selected, setSelected] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint = `documents/${toUnderscoreLowercase(doc)}`;

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const linkresponse = await fetchData({}, endpoint);
        if (linkresponse.data) {
          const response = await fetchData(
            {},
            `${linkresponse.data.app}/${linkresponse.data.id}`
          );
          if (response?.data?.list) {
            setOptions(
              response.data.list.map((option) => ({
                value: option.id, // Adjust based on your API response
                label: option.name || option.id, // Adjust based on your API response
              }))
            );
          }
        }
      } catch (error) {
        setError(error.message || error);
        toast.error(`Failed to fetch data: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [endpoint]);

  const handleSelectionChange = (selectedOption) => {
    setSelected(selectedOption.value);
    handleChange(selectedOption);
  };

  if (loading) {
    // return <div>Loading...</div>;
  }

  if (error) {
    // return <div>Error: {error}</div>;
  }

  return (
    <Select
      value={selected}
      onChange={handleSelectionChange}
      options={options}
      isSearchable
      placeholder={selected || placeholder}
      isMulti={isMulti}
      className="text-xs text-gray-800 dark:text-gray-200"
    />
  );
};

export default DocLink;
