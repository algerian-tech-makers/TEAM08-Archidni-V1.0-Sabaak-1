import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider as PreferredThemeProvider } from "next-themes";
import createEmotionCache from "../emotion-cache";
import MUIThemeProvider from ".";

const clientSideEmotionCache = createEmotionCache();

const PageProvider = ({ children, emotionCache = clientSideEmotionCache }) => (
  <PreferredThemeProvider>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </CacheProvider>
  </PreferredThemeProvider>
);

export default PageProvider;
