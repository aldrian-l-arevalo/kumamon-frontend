import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";
import { ConfigProvider, theme } from "antd";

const interStack =
  'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: interStack,
          fontFamilyCode:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
        // optional: if you use algorithms
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </ConfigProvider>
  </StrictMode>
);
