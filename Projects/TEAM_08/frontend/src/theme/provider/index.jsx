import { useTheme } from "next-themes";
import GlobalStyles from "@mui/material/GlobalStyles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "..";
import { globalStyles } from "../styles/global";
import { useEffect, useState } from "react";

const MUIThemeProvider = ({ children }) => {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  /**
   * @Mehdi
   * @Feature
   * @ToDO    : the usEffect hook will check the state of the theme- and then will accordingly
   * --------- update the theme throught the website
   */

  useEffect(() => {
    setCurrentTheme(lightTheme);
  }, [resolvedTheme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
