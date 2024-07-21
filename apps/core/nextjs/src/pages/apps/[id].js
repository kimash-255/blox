import DocDetail from "@/components/detail/DocDetail";
import { useNavbar } from "@/contexts/NavbarContext";
import { appDetailConfig } from "@/modules/core/apps";
import { useEffect } from "react";

const AppDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Apps");
    updatePagesText("Core");
    updateTextColor("text-gray-100");
  }, []);
  return (
    <div>
      <DocDetail config={appDetailConfig} />
    </div>
  );
};

export default AppDetail;
