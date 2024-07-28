import DocDetail from "@/components/detail/DocDetail";
import { useNavbar } from "@/contexts/NavbarContext";
import { moduleDetailConfig } from "@/modules/core/modules";
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const moduleDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("modules");
    updatePagesText("Core");
    updateTextColor("text-gray-100");
    setSidebarHidden(false);
  }, []);
  return (
    <div>
      <DocDetail config={moduleDetailConfig} />
    </div>
  );
};

export default moduleDetail;
