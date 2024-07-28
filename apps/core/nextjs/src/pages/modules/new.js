import NewDoc from "@/components/new/NewDoc";
import { useNavbar } from "@/contexts/NavbarContext";
import { newModuleConfig } from "@/modules/core/modules";
import React, { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const Newmodule = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("modules");
    updatePagesText("Core");
    updateTextColor("text-gray-200");
    setSidebarHidden(false);
  }, []);
  return <NewDoc config={newModuleConfig} />;
};

export default Newmodule;
