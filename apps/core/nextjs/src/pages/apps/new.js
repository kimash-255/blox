import NewDoc from "@/components/new/NewDoc";
import { useNavbar } from "@/contexts/NavbarContext";
import { newAppConfig } from "@/modules/core/apps";
import React, { useEffect } from "react";

const NewApp = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Apps");
    updatePagesText("Core");
    updateTextColor("text-gray-200");
  }, []);
  return <NewDoc config={newAppConfig} />;
};

export default NewApp;
