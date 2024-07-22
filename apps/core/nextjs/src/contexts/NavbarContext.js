import React, { createContext, useContext, useState } from "react";

// Create context
const NavbarContext = createContext();

// Custom hook to use the context
export const useNavbar = () => {
  return useContext(NavbarContext);
};

// Context provider component
export const NavbarProvider = ({ children }) => {
  const [dashboardText, setDashboardText] = useState("Blox");
  const [pagesText, setPagesText] = useState("Dashboard");
  const [textColor, setTextColor] = useState("text-gray-800"); // Initial text color

  const updateDashboardText = (newText) => {
    setDashboardText(newText);
  };

  const updatePagesText = (newText) => {
    setPagesText(newText);
  };

  const updateTextColor = (newColor) => {
    setTextColor(newColor);
  };

  // Combine all values to provide through context
  const contextValues = {
    dashboardText,
    updateDashboardText,
    pagesText,
    updatePagesText,
    textColor,
    updateTextColor,
  };

  return (
    <NavbarContext.Provider value={contextValues}>
      {children}
    </NavbarContext.Provider>
  );
};
