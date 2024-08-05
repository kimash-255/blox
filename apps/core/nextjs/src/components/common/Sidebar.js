import React, { useRef, useEffect, useState } from "react";
import Documentation from "./sidebar/Documentation";
import SidebarList from "./sidebar/List";
import {
  faDashboard,
  faMobileAndroid,
  faRegistered,
  faSignIn,
  faTable,
  faUser,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebar } from "@/contexts/SidebarContext";
import { useNavbar } from "@/contexts/NavbarContext";
import { useRouter } from "next/router";

const getTopPosition = () => {
  return (
    window.scrollY ||
    document.documentElement.scrollTop ||
    document.body.scrollTop
  );
};

const Sidebar = () => {
  const { sidebarWidth, setSidebarWidth, sidebarHidden } = useSidebar();
  const { dashboardText } = useNavbar();
  const sidebarRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (sidebarHidden) {
        setIsCollapsed(true);
      } else {
        if (sidebarRef.current) {
          setIsCollapsed(window.innerWidth < 1150);
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router, sidebarHidden]);

  useEffect(() => {
    if (sidebarRef.current) {
      setSidebarWidth(sidebarRef.current.offsetWidth);
    }
  }, [isCollapsed, sidebarHidden]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleScroll = () => {
      setTopPosition(getTopPosition());
    };

    handleScroll(); // Set initial top position

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <aside
      className={`${
        !sidebarHidden ? "" : "hidden"
      } w-fit min-h-screen max-h-screen relative top-0 flex flex-col`}
      style={{
        marginTop: topPosition,
      }}
      ref={sidebarRef}
    >
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="w-fit z-1 text-slate-700 bg-white py-4 px-2 rounded shadow-lg"
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} size="sm" />
        </button>
      )}

      <div
        className={`w-fit ease-nav-brand my-2 ml-2 block -translate-x-full flex-wrap flex-grow overflow-auto items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased shadow-gray-800 shadow-xl transition-transform duration-200 left-0 translate-x-0 backdrop-blur-md bg-white/70  ${
          !isCollapsed ? "" : "hidden"
        }`}
      >
        <div className="h-19.5 flex items-center justify-between px-4">
          <a
            className="block py-6 m-0 text-sm whitespace-nowrap text-slate-700"
            target="_blank"
            rel="noreferrer"
          >
            <span className="ml-1 font-semibold text-4xl transition-all duration-200 ease-nav-brand">
              Blox
            </span>
          </a>
          <button onClick={toggleSidebar} className="text-slate-700">
            <FontAwesomeIcon icon={faAngleDoubleLeft} size="lg" />
          </button>
        </div>

        <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />

        <div className="items-center block w-auto max-h-3/4 overflow-auto h-fit grow basis-full">
          <ul className="flex flex-col pl-0 mb-4">
            <SidebarList
              icon={faDashboard}
              text="Dashboard"
              link="/"
              active={dashboardText === "Dashboard"}
            />
            <SidebarList
              icon={faTable}
              text="Documents"
              link="/documents"
              active={dashboardText === "Documents"}
            />
            <SidebarList
              icon={faMobileAndroid}
              text="Apps"
              link="/apps"
              active={dashboardText === "Apps"}
            />
            <SidebarList
              icon={faMobileAndroid}
              text="Modules"
              link="/modules"
              active={dashboardText === "Modules"}
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
              active={dashboardText === "Profile"}
            />
            <SidebarList
              icon={faRegistered}
              text="Sign Up"
              link="/"
              active={dashboardText === "Sign Up"}
            />
            <SidebarList
              icon={faSignIn}
              text="Sign In"
              link="/login"
              active={dashboardText === "Sign In"}
            />
          </ul>
        </div>
        <Documentation />
      </div>
    </aside>
  );
};

export default Sidebar;
