import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getAppTheme } from "./theme";

type Mode = "light" | "dark";

interface ColorModeContextType {
  mode: Mode;
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextType>({
  mode: "dark",
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem("face_attendance_theme");
    return (saved === "light" || saved === "dark") ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("face_attendance_theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "light") {
      document.body.style.backgroundColor = "#F8FAFC";
      document.body.style.color = "#0F172A";
    } else {
      document.body.style.backgroundColor = "#0B0F17";
      document.body.style.color = "#F8FAFC";
    }
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

