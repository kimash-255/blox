import React, { useRef, useEffect, useState } from "react";
import Documentation from "./sidebar/Documentation";
import SidebarList from "./sidebar/List";
import {
  faDashboard,
  faGlasses,
  faMobileAndroid,
  faMoneyBill,
  faRegistered,
  faSignIn,
  faTable,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "@/contexts/SidebarContext"; // Adjust the import path based on your project structure
import { useNavbar } from "@/contexts/NavbarContext";

const Sidebar = () => {
  const { sidebarWidth, setSidebarWidth } = useSidebar();
  const { dashboardText } = useNavbar();
  const sidebarRef = useRef(null);
  const [currentWidth, setCurrentWidth] = useState(0); // Start with 0 for mobile size

  useEffect(() => {
    const handleResize = () => {
      if (sidebarRef.current) {
        const width = window.innerWidth >= 1150 ? 250 : 0;
        setCurrentWidth(width);
        setSidebarWidth(width); // Update sidebar width dynamically
      }
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setSidebarWidth]);

  return (
    <aside
      ref={sidebarRef}
      className={`max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-2 ml-4 block w-full -translate-x-full flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-gray-800 shadow-xl transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent`}
      style={{ width: sidebarWidth }}
    >
      <div className="h-19.5">
        <i className="absolute top-0 right-0 hidden p-4 opacity-50 cursor-pointer fas fa-times text-slate-400 xl:hidden"></i>
        <a
          className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
          target="_blank"
        >
          <span className="ml-1 font-semibold text-4xl transition-all duration-200 ease-nav-brand">
            Blox
          </span>
        </a>
      </div>

      <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

      <div className="items-center block w-auto max-h-3/4 overflow-auto h-fit grow basis-full">
        <ul className="flex flex-col pl-0 mb-4">
          <SidebarList
            icon={faDashboard}
            text="Dashboard"
            link="/"
            active={dashboardText === "Dashboard"} // Check if current text matches dashboardText
          />
          <SidebarList
            icon={faTable}
            text="Documents"
            link="/documents"
            active={dashboardText === "Documents"} // Check if current text matches dashboardText
          />
          <SidebarList
            icon={faMobileAndroid}
            text="Apps"
            link="/apps"
            active={dashboardText === "Apps"} // Check if current text matches dashboardText
          />
          <SidebarList
            icon={faMobileAndroid}
            text="Modules"
            link="/modules"
            active={dashboardText === "Modules"} // Check if current text matches dashboardText
          />
          <li className="w-full mt-4">
            <h6 className="pl-6 ml-2 text-xs font-bold leading-tight uppercase opacity-60">
              Account pages
            </h6>
          </li>
          <SidebarList
            icon={faUser}
            text="Profile"
            link="/"
            active={dashboardText === "Profile"} // Check if current text matches dashboardText
          />
          <SidebarList
            icon={faRegistered}
            text="Sign Up"
            link="/"
            active={dashboardText === "Sign Up"} // Check if current text matches dashboardText
          />
          <SidebarList
            icon={faSignIn}
            text="Sign In"
            link="/login"
            active={dashboardText === "Sign In"} // Check if current text matches dashboardText
          />
        </ul>
      </div>
      <Documentation />
    </aside>
  );
};

export default Sidebar;
