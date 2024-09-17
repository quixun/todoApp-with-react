// i18n.ts
import i18n, { InitOptions, Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import EN_Page from "../locales/en/en.json";
import VI_Page from "../locales/vi/vi.json";

export const locales: Record<string, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

const resources: Resource = {
  en: {
    todo: EN_Page.todo,
  },
  vi: {
    todo: VI_Page.todo,
  },
};

const options: InitOptions = {
  resources,
  ns: ["todo"],
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ...options,
    detection: {
      order: ["navigator", "localStorage"], 
      caches: ["localStorage"], 
    },
  });

export default i18n;
