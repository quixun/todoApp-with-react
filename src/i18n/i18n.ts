import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_Page from "../locales/en/firstPage.json";
import VI_Page from "../locales/vi/firstPage.json";

export const locales = {
    en: "English",
    vi: "Tiếng việt"
}

const resources = {
    en: {
        namespace: EN_Page
    },
    vi: {
        namespace: VI_Page
    }
  }

i18n.use(initReactI18next).init({
    resources,
    lng: "vi",
    ns: ["namespace"],
    fallbackLng: "vi",
    interpolation: {
      escapeValue: false,
    },
})

