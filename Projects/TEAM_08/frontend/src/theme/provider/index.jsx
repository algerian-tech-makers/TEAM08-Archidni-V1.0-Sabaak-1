import GlobalStyles from "@mui/material/GlobalStyles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "..";
import { globalStyles } from "../styles/global";

const MUIThemeProvider = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
};

export default MUIThemeProvider;
