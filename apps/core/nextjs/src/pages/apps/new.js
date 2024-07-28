import NewDoc from "@/components/new/NewDoc";
import { useNavbar } from "@/contexts/NavbarContext";
import { newAppConfig } from "@/modules/core/apps";
import React, { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const NewApp = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("Apps");
    updatePagesText("Core");
    updateTextColor("text-gray-200");
    setSidebarHidden(false);
  }, []);
  return <NewDoc config={newAppConfig} />;
};

export default NewApp;
