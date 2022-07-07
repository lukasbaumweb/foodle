import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const getMode = (window) => {
  let theme = "light";

  const isDarkModeEnabled =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDarkModeEnabled) theme = "dark";

  let savedTheme = window?.localStorage.getItem("mode");
  if (savedTheme) theme = savedTheme;

  return theme;
};

const DarkThemeProvider = ({ children }) => {
  const [mode, setMode] = React.useState(getMode(window));

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newTheme = prevMode === "light" ? "dark" : "light";
          window.localStorage.setItem("mode", newTheme);
          return newTheme;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: mode,
        primary: {
          main: "#f95738",
        },
        secondary: {
          main: "#ffbe0b",
        },
      },
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default DarkThemeProvider;
