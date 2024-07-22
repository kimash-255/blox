import NewDoc from "@/components/new/NewDoc";
import { useNavbar } from "@/contexts/NavbarContext";
import { newModuleConfig } from "@/modules/core/modules";
import React, { useEffect } from "react";

const Newmodule = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("modules");
    updatePagesText("Core");
    updateTextColor("text-gray-200");
  }, []);
  return <NewDoc config={newModuleConfig} />;
};

export default Newmodule;
