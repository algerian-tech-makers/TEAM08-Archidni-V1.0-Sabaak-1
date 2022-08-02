import { appWithTranslation } from "next-i18next";
import PageProvider from "../theme/provider/page.provider";

function App({ Component, pageProps, emotionCache }) {
  return (
    <PageProvider emotionCache={emotionCache}>
      <Component {...pageProps} />
    </PageProvider>
  );
}

export default appWithTranslation(App);
