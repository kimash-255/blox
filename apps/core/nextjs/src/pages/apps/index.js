import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { appFilters, appListConfig } from "@/modules/core/apps";
import { useNavbar } from "@/contexts/NavbarContext";

const AppList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Apps");
    updatePagesText("Core");
    updateTextColor("text-gray-900");
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
