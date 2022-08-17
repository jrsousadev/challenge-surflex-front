import Head from "next/head";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyle } from "../styles/global";
import "react-toastify/dist/ReactToastify.css";
import createEmotionCache from "../utils/createEmotionCache";
import { AuthProvider } from "../contexts/AuthContext";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <CssBaseline />
        <GlobalStyle />
        <div style={{ position: "absolute", top: "0", right: "0" }}>
          <ToastContainer />
        </div>
        <Component {...pageProps} />
      </AuthProvider>
    </CacheProvider>
  );
};

export default MyApp;
