import { useRouter } from "next/router";
import Sidebar from "@/components/common/Sidebar";
import "@/styles/globals.css";
import Navbar from "@/components/common/Navbar";
import FixedPlugin from "@/components/common/FixedPlugin";
import Footer from "@/components/common/Footer";
import { DataProvider } from "@/contexts/DataContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { NavbarProvider } from "@/contexts/NavbarContext";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <div className="m-0 font-sans text-base antialiased font-normal font-lato leading-8 leading-default bg-gray-50 text-slate-500">
      <SidebarProvider>
        <NavbarProvider>
          <DataProvider>
            <main
              className={`ease-soft-in-out ${
                !isAuthPage ? "" : ""
              } flex flex-row relative rounded-xl transition-all duration-200`}
            >
              {!isAuthPage && <Sidebar />}
              <div className="relative flex flex-col h-full min-h-screen "></div>
              <div className="relative flex flex-col h-full min-h-screen w-full">
                {!isAuthPage && <Navbar />}
                <div className="flex flex-col h-full min-h-screen">
                  <div className="relative flex-grow">
                    <Component {...pageProps} />
                  </div>
                </div>
                {!isAuthPage && <Footer />}
              </div>
            </main>
            {/* {!isAuthPage && <FixedPlugin />} */}
          </DataProvider>
        </NavbarProvider>
      </SidebarProvider>
    </div>
  );
}
