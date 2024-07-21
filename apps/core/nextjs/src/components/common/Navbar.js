import React, { useEffect, useState } from "react";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";

const Navbar = () => {
  const { dashboardText, pagesText, textColor } = useNavbar();
  const { sidebarWidth } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`relative items-center justify-between z-50 transition-all duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start ${
        isScrolled
          ? "fixed top-0 right-0 w-full my-6 mx-4 py-2 z-50 bg-transparent border-[1px] border-purple-700 shadow-xl shadow-purple-900 backdrop-blur-lg"
          : "relative flex flex-wrap px-0 py-8 mx-6"
      }`}
      style={{
        position: isScrolled ? "fixed" : "",
        width: isScrolled ? `calc(100% - ${sidebarWidth + 50}px)` : "",
      }}
    >
      <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
        <nav>
          <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
            <li
              className={`text-sm leading-normal ${
                isScrolled ? "text-gray-900" : textColor
              }`}
            >
              <a className="opacity-90">{pagesText}</a>
            </li>
            <li
              className={`text-sm pl-2 capitalize leading-normal ${
                isScrolled ? "text-gray-900" : textColor
              } before:float-left before:pr-2 before:text-gray-600 before:content-['/']`}
            >
              {dashboardText}
            </li>
          </ol>
          <h6
            className={`mb-0 font-bold capitalize ${
              isScrolled ? "text-gray-900" : textColor
            }`}
          >
            {dashboardText}
          </h6>
        </nav>

        <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
          <div className="flex items-center md:ml-auto md:pr-4">
            <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
              <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                placeholder="Type here..."
              />
            </div>
          </div>
          <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
            <li className="flex items-center">
              <a
                href="/login"
                className={`block px-0 py-2 text-sm font-semibold transition-all ease-nav-brand ${
                  isScrolled ? "text-gray-900" : textColor
                }`}
              >
                <i className="fa fa-user sm:mr-1"></i>
                <span className="hidden sm:inline">Sign In</span>
              </a>
            </li>
            <li className="flex items-center pl-4 xl:hidden">
              <a
                className={`block p-0 text-sm transition-all ease-nav-brand ${
                  isScrolled ? "text-gray-900" : textColor
                }`}
              >
                <div className="w-4.5 overflow-hidden">
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i className="ease-soft relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                </div>
              </a>
            </li>
            <li className="flex items-center px-4">
              <a
                className={`p-0 text-sm transition-all ease-nav-brand ${
                  isScrolled ? "text-gray-900" : textColor
                }`}
              >
                <i className="cursor-pointer fa fa-cog"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
