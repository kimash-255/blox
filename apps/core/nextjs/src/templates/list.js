import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { useRouter } from "next/router";
import { toTitleCase } from "@/utils/textConvert";

const documentList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();
  const router = useRouter();

  const documentListConfig = {
    title: "documents",
    customize: true,
    isList: true,
    fields: fields,
    data: [],
  };

  const documentFilters = {
    name: {
      type: "text",
    },
    app: {
      type: "text",
    },
    module: {
      type: "text",
    },
    id: {
      type: "text",
    },
  };

  useEffect(() => {
    const pathParts = router.pathname.split("/").filter(Boolean);
    if (pathParts.length >= 2) {
      updateDashboardText(toTitleCase(pathParts[1]));
      updatePagesText(toTitleCase(pathParts[0]));
    } else if (pathParts.length === 1) {
      updateDashboardText(toTitleCase(pathParts[0]));
    }
    updateTextColor("text-gray-900");
    setSidebarHidden(false);
  }, [
    router.pathname,
    updateDashboardText,
    updatePagesText,
    updateTextColor,
    setSidebarHidden,
  ]);

  const endpoint = router.pathname.substring(1);

  return (
    <ListTable
      tableConfig={documentListConfig}
      filters={documentFilters}
      endpoint={endpoint}
    />
  );
};

export default documentList;
