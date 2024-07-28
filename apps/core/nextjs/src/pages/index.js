import HomePage from "@/components/home";
import { useNavbar } from "@/contexts/NavbarContext";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useSidebar } from "@/contexts/SidebarContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();
  const { setSidebarHidden } = useSidebar();

  useEffect(() => {
    updateDashboardText("Dashboard");
    updatePagesText("Blox");
    updateTextColor("text-gray-900");
    setSidebarHidden(false);
  }, []);
  return (
    <>
      <HomePage />
    </>
  );
}
