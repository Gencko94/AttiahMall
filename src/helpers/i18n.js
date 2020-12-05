import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import translationEN from '../locales/en/translationEN.json';
import translationAR from '../locales/ar/translationAR.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  keySeparator: false, // we Dont useKeys in form messages.welcome
  interpolation: {
    escapeValue: false, // React already prevents xss
  },
});

export default i18n;
