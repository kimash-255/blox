import { fields } from "../../../../../../custom/logistics/logistics/doc/item/fields.js";
import settings from "../../../../../../custom/logistics/logistics/doc/item/settings.json";

import { useNavbar } from "@/contexts/NavbarContext";
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import { useRouter } from "next/router.js";
import { toTitleCase } from "@/utils/textConvert.js";
import DocumentDetail from "@/components/detail/DocumentDetail.js";

const documentDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden, setSidebarWidth } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    const pathParts = router.pathname.split("/").filter(Boolean);
    if (pathParts.length >= 2) {
      updateDashboardText(toTitleCase(pathParts[1]));
      updatePagesText(toTitleCase(pathParts[0]));
    } else if (pathParts.length === 1) {
      updateDashboardText(toTitleCase(pathParts[0]));
    }
    updateTextColor("text-gray-100");
    setSidebarHidden(false);
  }, [
    router.pathname,
    updateDashboardText,
    updatePagesText,
    updateTextColor,
    setSidebarHidden,
  ]);

  const currentPath = router.pathname;
  const getPathWithoutId = (path) => {
    const pathWithoutId = path.substring(1).split("/").slice(0, -1).join("/");
    return pathWithoutId;
  };

  const endpoint = getPathWithoutId(currentPath);

  const documentDetailConfig = {
    endpoint: endpoint,
    fields: fields,
  };

  return (
    <div>
      <DocumentDetail config={documentDetailConfig} />
    </div>
  );
};

export default documentDetail;
