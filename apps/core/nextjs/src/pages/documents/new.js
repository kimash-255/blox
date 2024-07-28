import NewDoc from "@/components/new/NewDoc";
import { useNavbar } from "@/contexts/NavbarContext";
import { newdocumentConfig } from "@/modules/core/documents";
import React, { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const Newdocument = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("Documents");
    updatePagesText("Core");
    updateTextColor("text-gray-200");
  }, []);
  return <NewDoc config={newdocumentConfig} />;
};

export default Newdocument;
