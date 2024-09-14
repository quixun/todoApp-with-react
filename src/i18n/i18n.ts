import i18n, { Resource, InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import EN_Page from "../locales/en/en.json";
import VI_Page from "../locales/vi/vi.json";

export const locales: Record<string, string> = {
    en: "English",
    vi: "Tiếng Việt"
};

const resources: Resource = {
    en: {
        namespace: EN_Page.todo
    },
    vi: {
        namespace: VI_Page.todo
    }
};

const browserLanguage: keyof typeof locales = navigator.language.split("-")[0] as keyof typeof locales;
const defaultLanguage: keyof typeof locales = locales[browserLanguage] ? browserLanguage : "vi";

const options: InitOptions = {
    resources,
    lng: defaultLanguage, 
    ns: ["namespace"],
    fallbackLng: "vi",
    interpolation: {
        escapeValue: false,
    },
};

i18n.use(initReactI18next).init(options);

export default i18n;
