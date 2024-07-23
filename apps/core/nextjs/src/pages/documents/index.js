import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { documentFilters, documentListConfig } from "@/modules/core/documents";
import { useNavbar } from "@/contexts/NavbarContext";

const documentList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Documents");
    updatePagesText("Core");
    updateTextColor("text-gray-900");
  }, []);
  return (
    <ListTable
      tableConfig={documentListConfig}
      filters={documentFilters}
      endpoint={"documents"}
    />
  );
};

export default documentList;
