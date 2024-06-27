import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getLanguageFromUrl } from './urlUtils'; // Ensure this is the correct path

const detectedLanguage = getLanguageFromUrl() || navigator.language.split('-')[0]; // Use URL param or browser language

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: detectedLanguage, // Set the detected language here
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          timeAgo: '{{time}} ago',
        },
      },
      ko: {
        translation: {
          timeAgo: '{{time}} 전',
        },
      },
      zh: {
        translation: {
          timeAgo: '{{time}}前',
        },
      },
      ja: {
        translation: {
          timeAgo: '{{time}}前',
        },
      },
      ar: {
        translation: {
          timeAgo: 'منذ {{time}}',
        },
      },
      es: {
        translation: {
          timeAgo: 'hace {{time}}',
        },
      },
      fr: {
        translation: {
          timeAgo: 'il y a {{time}}',
        },
      },
    },
  });

export default i18n;
