import React from "react";
import ListTable from "@/components/list/Table";

const DocumentList = () => {
  const tableConfig = {
    title: "Documents",
    fields: [
      { title: "Author", type: "image", data: "image" },
      { title: "Function", type: "text", data: "function" },
      { title: "Status", type: "text", data: "status" },
      { title: "Employed", type: "text", data: "employed" },
    ],
    data: [],
  };

  const filters = {
    status: [
      { value: "", label: "All" },
      { value: "Online", label: "Online" },
      { value: "Offline", label: "Offline" },
    ],
    department: [
      { value: "", label: "All" },
      { value: "Organization", label: "Organization" },
      { value: "Engineering", label: "Engineering" },
      { value: "Creative", label: "Creative" },
      { value: "Development", label: "Development" },
      { value: "Tech", label: "Tech" },
      { value: "Design", label: "Design" },
      { value: "Business", label: "Business" },
      { value: "Consulting", label: "Consulting" },
      { value: "Analytics", label: "Analytics" },
      { value: "Marketing", label: "Marketing" },
    ],
  };

  return (
    <ListTable
      tableConfig={tableConfig}
      filters={filters}
      endpoint={"documents"}
    />
  );
};

export default DocumentList;
