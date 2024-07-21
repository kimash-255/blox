import HomePage from "@/components/home";
import { useNavbar } from "@/contexts/NavbarContext";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { updateDashboardText, updatePagesText, updateTextColor } = useNavbar();

  useEffect(() => {
    updateDashboardText("Blox");
    updatePagesText("Dashboard");
    updateTextColor("text-gray-900");
  }, []);
  return (
    <>
      <HomePage />
    </>
  );
}
