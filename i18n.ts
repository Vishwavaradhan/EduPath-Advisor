// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)                // load translations from /locales/{lng}/{ns}.json
  .use(LanguageDetector)       // detect user language
  .use(initReactI18next)       // pass to react-i18next
  .init({
    fallbackLng: "en",
    debug: false,              // set true while developing
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    },
    detection: {
      order: ["localStorage", "querystring", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage"]
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: true }
  });

export default i18n;
