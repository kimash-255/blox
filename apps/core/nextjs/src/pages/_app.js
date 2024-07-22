import { useRouter } from "next/router";
import Sidebar from "@/components/common/Sidebar";
import "@/styles/globals.css";
import "@/styles/tooltips.css";
import "@/styles/perfect-scrollbar.css";
import "@/styles/nucleo-svg.css";
import "@/styles/nucleo-icons.css";
import "@/styles/soft-ui-dashboard-tailwind.css";
import Navbar from "@/components/common/Navbar";
import FixedPlugin from "@/components/common/FixedPlugin";
import Footer from "@/components/common/Footer";
import { DataProvider } from "@/contexts/DataContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { NavbarProvider } from "@/contexts/NavbarContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isAuthPage =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <div className="m-0 font-sans text-base antialiased font-normal font-lato leading-8 leading-default bg-gray-50 text-slate-500">
      <SidebarProvider>
        <NavbarProvider>
          <DataProvider>
            {!isAuthPage && <Sidebar />}
            <main
              className={`ease-soft-in-out ${
                !isAuthPage ? "xl:ml-68.5" : ""
              } flex flex-col relative rounded-xl transition-all duration-200`}
            >
              {!isAuthPage && <Navbar />}
              <div className="flex flex-col h-full min-h-screen">
                <div className="relative flex-grow">
                  <Component {...pageProps} />
                </div>
              </div>
              {!isAuthPage && <Footer />}
            </main>
            {/* {!isAuthPage && <FixedPlugin />} */}
          </DataProvider>
        </NavbarProvider>
      </SidebarProvider>
    </div>
  );
}
