import React, { useState, useEffect } from "react";
import { toUnderscoreLowercase } from "@/utils/textConvert";
import { fetchTableData } from "./FetchTable";
import { useNavbar } from "@/contexts/NavbarContext";
import DataTable from "../new/DataTable";

const DataTableView = ({ fieldData, field }) => {
  const { dashboardText, pagesText } = useNavbar();
  const [data, setData] = useState(null);
  const [linkResponse, setlinkResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data, linkresponse } = await fetchTableData(
          field.doc, // Assuming field.doc is used here
          `${toUnderscoreLowercase(dashboardText)}__id`, // Assuming field.filterKey is used here
          fieldData.id // Assuming field.filterValue is used here
        );
        setData(data);
        // Handle linkresponse if needed
        setlinkResponse(linkresponse);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [field]);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div>{error}</div>;

  return <DataTable data={data} linkResponse={linkResponse} readOnly={true} />;
};

export default DataTableView;
