import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { appFilters, appListConfig } from "@/modules/core/apps";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";

const AppList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("Apps");
    updatePagesText("Core");
    updateTextColor("text-gray-900");
    setSidebarHidden(false);
  }, []);
  return (
    <ListTable
      tableConfig={appListConfig}
      filters={appFilters}
      endpoint={"apps"}
    />
  );
};

export default AppList;
