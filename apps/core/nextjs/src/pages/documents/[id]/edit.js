import DocStudio from "@/components/studio/DocStudio";
import { useSidebar } from "@/contexts/SidebarContext";
import React, { useEffect } from "react";

const StudioEdit = () => {
  const { sidebarWidth, setSidebarWidth, setSidebarHidden } = useSidebar();
  useEffect(() => {
    setSidebarWidth(0);
    setSidebarHidden(true);
  }, []);
  return <DocStudio />;
};

export default StudioEdit;
