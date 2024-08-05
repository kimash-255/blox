import React, { useState, useEffect } from "react";
import Select from "react-select";
import { fetchData } from "@/utils/Api";
import { toast } from "react-toastify";
import { toUnderscoreLowercase } from "@/utils/textConvert";

const DocLink = ({
  name,
  handleChange,
  placeholder = "Select",
  doc,
  exclude = [],
  isMulti = false, // Optional: allow multi-select
  onLinkResponse, // New prop to handle linkresponse
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
            const fetchedOptions = response.data.list.map((option) => ({
              value: option, // Adjust based on your API response
              label: option.name || option.id, // Adjust based on your API response
            }));
            // Exclude already selected options
            const filteredOptions = exclude.length
              ? fetchedOptions.filter(
                  (option) =>
                    !exclude.some((excluded) => excluded.id === option.value.id)
                )
              : fetchedOptions;
            setOptions(filteredOptions);
          }
        }
        // Pass linkresponse to the parent component
        onLinkResponse(linkresponse);
      } catch (error) {
        setError(error.message || error);
        toast.error(`Failed to fetch data: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [onLinkResponse]);

  const handleSelectionChange = (selectedOption) => {
    setSelected(selectedOption);
    handleChange(selectedOption);
  };

  return (
    <Select
      value={selected}
      onChange={handleSelectionChange}
      options={options}
      isSearchable
      placeholder={placeholder}
      isMulti={isMulti}
      className="text-xs text-gray-800 dark:text-gray-200"
    />
  );
};

export default DocLink;
