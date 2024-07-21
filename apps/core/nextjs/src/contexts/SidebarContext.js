import React, { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [sidebarWidth, setSidebarWidth] = useState(250); // Default width set here
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSidebarWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 250 ? 10 : 250));
  };

  const updateWidth = (width) => {
    setSidebarWidth(width);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <SidebarContext.Provider
      value={{ sidebarWidth, setSidebarWidth: updateWidth, toggleSidebarWidth }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  return useContext(SidebarContext);
};
