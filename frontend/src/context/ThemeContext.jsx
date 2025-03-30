"use client";

import { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("light");

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem("theme", themeName);

    const linkElement = document.getElementById("theme-variables");
    if (linkElement) {
      linkElement.href = `/themes/${themeName}/variables.css`;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "light";
      setCurrentTheme(savedTheme);

      const linkElement = document.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = `/themes/${savedTheme}/variables.css`;
      linkElement.id = "theme-variables";

      const existingLink = document.getElementById("theme-variables");
      if (existingLink) {
        document.head.removeChild(existingLink);
      }

      document.head.appendChild(linkElement);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
