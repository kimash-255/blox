import { fields } from "../../../../../../custom/logistics/logistics/doc/item/fields.js";
import settings from "../../../../../../custom/logistics/logistics/doc/item/settings.json";

import DocDetail from "@/components/detail/DocDetail";
import { useNavbar } from "@/contexts/NavbarContext";
import { documentDetailConfig } from "@/modules/core/documents";
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const documentDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden, setSidebarWidth } = useSidebar();

  useEffect(() => {
    updateDashboardText("Documents");
    updatePagesText("Core");
    updateTextColor("text-gray-100");
    setSidebarHidden(false);
    setSidebarWidth(350);
  }, []);
  const saveSettings = (setting) => {
    console.log(setting);
  };
  return (
    <div>
      <DocDetail
        config={documentDetailConfig}
        setting={settings}
        saveSettings={saveSettings}
      />
    </div>
  );
};

export default documentDetail;
