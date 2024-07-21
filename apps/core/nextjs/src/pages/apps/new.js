import NewDoc from "@/components/new/NewDoc";
import { useNavbar } from "@/contexts/NavbarContext";
import React, { useEffect } from "react";

const NewApp = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Apps");
    updatePagesText("Core");
    updateTextColor("text-gray-900");
  }, []);
  const config = {
    endpoint: "apps",
    title: "App",
    fields: [
      { title: "Name", type: "text", data: "name", required: true },
      {
        title: "Status",
        type: "select",
        data: "status",
        options: [
          {
            label: "Active",
            value: "Active",
          },
          {
            label: "Disabled",
            value: "Disabled",
          },
        ],
        required: true,
      },
      {
        title: "Description",
        type: "textarea",
        data: "description",
        required: true,
      },
    ],
    data: [],
  };
  return <NewDoc config={config} />;
};

export default NewApp;
