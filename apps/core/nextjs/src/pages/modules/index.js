import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { moduleFilters, moduleListConfig } from "@/modules/core/modules";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";

const moduleList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("Modules");
    updatePagesText("Core");
    updateTextColor("text-gray-900");
    setSidebarHidden(false);
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
