import { documentDetailConfig } from "@/modules/core/documents";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DocDetail from "@/components/detail/DocDetail";
import { useNavbar } from "@/contexts/NavbarContext";
import { fetchData } from "@/utils/Api";
import { useSidebar } from "@/contexts/SidebarContext.js";

const DocumentDetail = () => {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden, setSidebarWidth } = useSidebar();
  const router = useRouter();
  const [app, setApp] = useState("");
  const [module, setModule] = useState("");

  const endpoint = "documents";

  const getPathSegmentBeforeEdit = (path) => {
    const segments = path.split("/");
    const lastSegment = segments.pop();
    return lastSegment === "edit" ? segments.pop() : lastSegment;
  };

  const id = getPathSegmentBeforeEdit(router.pathname);

  useEffect(() => {
    updateDashboardText("Documents");
    updatePagesText("Core");
    updateTextColor("text-gray-100");
    setSidebarHidden(false);
    setSidebarWidth(350);

    // Fetch app and module based on `id` if needed
    const fetchDetails = async () => {
      if (id) {
        const response = await fetchData({}, `${endpoint}/${id}`);
        setApp(response.data.app);
        setModule(response.data.module);
      }
    };

    fetchDetails();
  }, []);

  const saveSettings = async (settings) => {
    try {
      const response = await fetch("/api/saveSettings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          app,
          module,
          id,
          settings,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Settings saved successfully");
      } else {
        console.error("Error saving settings:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {settings && (
        <DocDetail
          config={documentDetailConfig}
          setting={settings}
          saveSettings={saveSettings}
        />
      )}
    </div>
  );
};

export default DocumentDetail;
