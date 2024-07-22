import DocDetail from "@/components/detail/DocDetail";
import { useNavbar } from "@/contexts/NavbarContext";
import { moduleDetailConfig } from "@/modules/core/modules";
import { useEffect } from "react";

const moduleDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("modules");
    updatePagesText("Core");
    updateTextColor("text-gray-100");
  }, []);
  return (
    <div>
      <DocDetail config={moduleDetailConfig} />
    </div>
  );
};

export default moduleDetail;
