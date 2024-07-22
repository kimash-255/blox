import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { moduleFilters, moduleListConfig } from "@/modules/core/modules";
import { useNavbar } from "@/contexts/NavbarContext";

const moduleList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Modules");
    updatePagesText("Core");
    updateTextColor("text-gray-900");
  }, []);
  return (
    <ListTable
      tableConfig={moduleListConfig}
      filters={moduleFilters}
      endpoint={"modules"}
    />
  );
};

export default moduleList;
