/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import type { AppProps } from 'next/app'
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/utils/theme";
import createEmotionCache from "../src/utils/createEmotionCache";
import { configureAppStore } from "../src/redux/store";
import ErrorBoundary from "../src/component/errorBoundary";
import Snackbars from "../src/component/SnackBar/SnackBar";
import "../styles/globals.css";

const initialState = {
  // ... initial state of each chunk/feature
  utilities: { popUp: true },
};

const store:any = configureAppStore(initialState);

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: any) {
  <CacheProvider value={emotionCache}>
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />
          <Snackbars />
            <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </CacheProvider>
  return <Component {...pageProps} />
}
export default MyApp