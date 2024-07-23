import DocDetail from "@/components/detail/DocDetail";
import { useNavbar } from "@/contexts/NavbarContext";
import { documentDetailConfig } from "@/modules/core/documents";
import { useEffect } from "react";

const documentDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Documents");
    updatePagesText("Core");
    updateTextColor("text-gray-100");
  }, []);
  return (
    <div>
      <DocDetail config={documentDetailConfig} />
    </div>
  );
};

export default documentDetail;
