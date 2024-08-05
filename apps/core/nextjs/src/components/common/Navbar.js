import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useNavbar } from "@/contexts/NavbarContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faSearch,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { getFromDB, deleteFromDB } from "@/utils/indexedDB";
import LogoutModal from "./LogoutModal";

const slugify = (text) => {
  const lowerText = text.toString().toLowerCase();
  if (["core", "dashboard", "blox"].includes(lowerText)) {
    return "";
  }
  return lowerText
    .replace(/\s+/g, "_") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

const Navbar = () => {
  const { dashboardText, pagesText, textColor } = useNavbar();
  const { sidebarWidth } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getFromDB("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await deleteFromDB("authToken");
    setIsAuthenticated(false);
    // Redirect to login page or perform other actions
    window.location.href = "/login"; // or use router.push("/login");
  };

  return (
    <>
      <nav
        className={`relative flex flex-wrap items-center justify-between z-50 transition-all duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start ${
          isScrolled
            ? "fixed top-0 right-0 w-full my-2 mx-2 py-2 z-50 bg-transparent border-[1px] border-purple-400 shadow-md shadow-purple-200 backdrop-blur-lg"
            : "relative px-0 py-4 mx-6"
        }`}
        style={{
          position: isScrolled ? "fixed" : "",
          width: isScrolled
            ? `calc(100% - ${sidebarWidth > 20 ? sidebarWidth + 20 : 20}px)`
            : "",
        }}
      >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap">
          <nav className="flex flex-row md:flex-col gap-x-4">
            <ol className="flex flex-wrap pt-1 bg-transparent rounded-lg sm:mr-16">
              <li
                className={`text-sm leading-normal ${
                  isScrolled ? "text-gray-900" : textColor
                }`}
              >
                <Link href={`/${slugify(pagesText)}`} passHref>
                  <div className="flex items-center cursor-pointer">
                    <FontAwesomeIcon
                      icon={faHome}
                      className="mr-2 text-purple-900"
                    />
                    <span className="opacity-90">{pagesText}</span>
                  </div>
                </Link>
              </li>
              <li
                className={`flex flex-row text-sm pl-2 capitalize leading-normal ${
                  isScrolled ? "text-gray-900" : textColor
                } before:float-left before:pr-2 before:text-gray-600 before:content-['/']`}
              >
                <Link
                  href={`/${slugify(pagesText)}/${slugify(dashboardText)}`}
                  passHref
                >
                  <div className="flex items-center cursor-pointer">
                    <FontAwesomeIcon
                      icon={faTachometerAlt}
                      className="mr-2 text-purple-900"
                    />
                    <span>{dashboardText}</span>
                  </div>
                </Link>
              </li>
            </ol>
            <h6
              className={`mb-0 font-bold capitalize hidden md:block ${
                isScrolled ? "text-gray-900 " : textColor
              }`}
            >
              {dashboardText}
            </h6>
          </nav>

          <div className="flex items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <div className="flex items-center md:ml-auto md:pr-4">
              <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-lg ease-soft">
                <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="text-purple-500"
                  />
                </span>
                <input
                  type="text"
                  className="pl-8.75 text-sm focus:shadow-soft-primary-outline ease-soft w-full leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
                  placeholder="Type here..."
                />
              </div>
            </div>
            <ul className="flex flex-row justify-end pl-4 mb-0 list-none">
              {isAuthenticated ? (
                <>
                  <li className="flex items-center mr-4">
                    <Link href="/profile" passHref>
                      <div
                        className={`flex items-center text-sm font-semibold transition-all ease-nav-brand ${
                          isScrolled ? "text-gray-900" : textColor
                        } cursor-pointer`}
                      >
                        <FontAwesomeIcon
                          icon={faUserCircle}
                          className="mr-2 text-purple-900"
                        />
                        <span className="hidden sm:inline">Profile</span>
                      </div>
                    </Link>
                  </li>
                  <li className="flex items-center mr-4">
                    <div
                      className={`flex items-center text-sm font-semibold transition-all ease-nav-brand ${
                        isScrolled ? "text-gray-900" : textColor
                      } cursor-pointer`}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="mr-2 text-purple-900"
                      />
                      <span className="hidden sm:inline">Logout</span>
                    </div>
                  </li>
                </>
              ) : (
                <li className="flex items-center">
                  <Link href="/login" passHref>
                    <div
                      className={`flex items-center text-sm font-semibold transition-all ease-nav-brand ${
                        isScrolled ? "text-gray-900" : textColor
                      } cursor-pointer`}
                    >
                      <FontAwesomeIcon
                        icon={faSignInAlt}
                        className="mr-2 text-purple-900"
                      />
                      <span className="hidden sm:inline">Login</span>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Navbar;
