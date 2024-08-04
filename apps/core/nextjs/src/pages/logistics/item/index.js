import fields from "../../../../../../custom/logistics/logistics/doc/item/fields.js";
import settings from "../../../../../../custom/logistics/logistics/doc/item/settings.json";

import React, { useEffect } from "react";
import ListTable from "@/components/list/Table";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { useRouter } from "next/router";
import { toTitleCase } from "@/utils/textConvert";

const transformFields = (fields) => {
  const filters = {
    id: {
      type: "text",
      default: "",
    },
  };
  const listFields = [];

  fields.forEach((field) => {
    if (field.filter) {
      filters[field.id] = {
        type: field.type === "SelectField" ? "select" : "text",
        default: field.default || "",
      };
    }

    if (field.list) {
      listFields.push({
        id: field.id,
        name: field.name,
        type: field.type,
        default: field.default || "",
      });
    }
  });

  return { filters, listFields };
};

const documentList = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();
  const router = useRouter();

  const { filters: documentFilters, listFields } = transformFields(fields);

  const documentListConfig = {
    title: "documents",
    customize: true,
    isList: true,
    fields: listFields,
    data: [],
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
