import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProvider } from "./components/Toastify.tsx";
import { Provider } from "react-redux";
import { store } from "./hooks/store/store.ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import RtlCacheProvider from "./utils/RtlCacheProvider.tsx";

document.body.dir = "rtl";
const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "IranSansFaNum, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RtlCacheProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ToastProvider>
              <App />
            </ToastProvider>
          </Provider>
        </ThemeProvider>
      </CacheProvider>
    </RtlCacheProvider>
  </StrictMode>,
);
