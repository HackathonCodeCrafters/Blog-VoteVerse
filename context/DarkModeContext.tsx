"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  toggleDarkMode: () => void;
  isLoading: boolean;
}

const DarkModeContext = createContext<DarkModeContextType>({
  darkMode: false,
  setDarkMode: () => {},
  toggleDarkMode: () => {},
  isLoading: true,
});

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const initializeDarkMode = () => {
      try {
        // Check localStorage first
        const savedMode = localStorage.getItem("darkMode");

        if (savedMode !== null) {
          const isDark = JSON.parse(savedMode);
          setDarkMode(isDark);

          // Apply immediately to prevent flash
          if (isDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        } else {
          // Fallback to system preference
          const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          setDarkMode(prefersDark);

          // Apply immediately to prevent flash
          if (prefersDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }

          // Save the system preference
          localStorage.setItem("darkMode", JSON.stringify(prefersDark));
        }
      } catch (error) {
        console.error("Error initializing dark mode:", error);
        // Fallback to light mode if there's an error
        setDarkMode(false);
        document.documentElement.classList.remove("dark");
      } finally {
        setIsLoading(false);
      }
    };

    // Run initialization
    initializeDarkMode();

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode === null) {
        setDarkMode(e.matches);
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Save dark mode preference when it changes (but not during initial load)
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));

        // Apply to document
        if (darkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error saving dark mode preference:", error);
      }
    }
  }, [darkMode, isLoading]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSetDarkMode = (value: boolean) => {
    setDarkMode(value);
  };

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode: handleSetDarkMode,
        toggleDarkMode,
        isLoading,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
