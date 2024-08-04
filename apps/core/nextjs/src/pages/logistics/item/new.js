import { fields } from "../../../../../../custom/logistics/logistics/doc/item/fields.js";

import { useNavbar } from "@/contexts/NavbarContext";
import React, { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";
import NewDocument from "@/components/new/NewDocument.js";
import { useRouter } from "next/router.js";
import { toTitleCase } from "@/utils/textConvert.js";

const Newdocument = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();
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

  const endpoint = router.pathname
    .replace(/\/new$/, "")
    .replace(/\/$/, "")
    .substring(1);

  const newdocumentConfig = {
    endpoint: endpoint,
    name: "document",
    customize: true,
    isList: true,
    fields: fields,
    data: [],
  };

  return <NewDocument config={newdocumentConfig} />;
};

export default Newdocument;
