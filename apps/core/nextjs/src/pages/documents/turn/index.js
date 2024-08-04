import { fields } from "../../../../../../custom/my_app/my_app/doc/turn/fields.js";

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
  return (
    <div>
      <DocDetail config={documentDetailConfig} />
    </div>
  );
};

export default documentDetail;
