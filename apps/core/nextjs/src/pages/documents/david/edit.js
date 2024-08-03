import { fields } from "../../../../../../custom/arifahub/arifahub/doc/david/fields.js";

import DocStudio from "@/components/studio/DocStudio";
import { useData } from "@/contexts/DataContext";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { fetchData, postData } from "@/utils/Api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const toTitleCase = (str) => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

const StudioEdit = () => {
  const { sidebarWidth, setSidebarWidth, setSidebarHidden } = useSidebar();
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const [initialData, setInitialData] = useState(null);
  const router = useRouter();
  // const { id } = router.query;
  const { data, setData } = useData();

  const endpoint = "documents";

  const getPathSegmentBeforeEdit = (path) => {
    const segments = path.split("/");
    const editIndex = segments.indexOf("edit");
    if (editIndex > 0) {
      return segments[editIndex - 1];
    }
    return "";
  };

  const id = getPathSegmentBeforeEdit(router.pathname);

  const handleSave = async (canvasItems) => {
    try {
      const r = {
        app: data.app,
        module: data.module,
        id,
        canvasItems,
      };
      const response = await fetch("/api/saveFields", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(r),
      });

      const result = await response.json();
      if (response.ok) {
        await postData({ doc: id }, `migrate`);
      } else {
        console.error("Error saving fields:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const formattedId = toTitleCase(id);
      updateDashboardText(formattedId);
    }
    updatePagesText("Documents");
    updateTextColor("text-gray-900");
    setSidebarWidth(10);
    setSidebarHidden(true);
  }, [id]);

  useEffect(() => {
    const fetchData1 = async () => {
      if (!endpoint || !id) return;
      try {
        const response = await fetchData({}, `${endpoint}/${id}`);
        if (response?.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error(`Failed to fetch data, ${error.message || error}`);
      }
    };

    fetchData1();
  }, [endpoint, id]);

  useEffect(() => {
    if (fields) {
      setInitialData(fields);
    } else {
      setInitialData([
        {
          id: "tab-1",
          name: "Details",
          type: "tab",
          sections: [
            {
              id: "section-1",
              name: "Section 1",
              type: "section",
              columns: [
                {
                  id: "column-1",
                  name: "Column 1",
                  type: "column",
                  fields: [],
                },
              ],
            },
          ],
        },
      ]);
    }
  }, [fields]);

  return (
    <>
      {initialData && (
        <DocStudio handleSave={handleSave} initialData={initialData} />
      )}
    </>
  );
};

export default StudioEdit;
