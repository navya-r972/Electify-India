import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Create a singleton instance to avoid multiple initializations
let isInitializing = false;
let isInitialized = false;

// Only initialize in browser environment to avoid hydration issues
if (typeof window !== 'undefined' && !isInitialized && !isInitializing) {
  isInitializing = true;
  
  i18n
    // Load translations from public/locales
    .use(Backend)
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    .init({
    fallbackLng: 'en',
    lng: 'en', // Force default to English
    debug: process.env.NODE_ENV === 'development',
    supportedLngs: ['en', 'hi', 'ur'],
    
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    
    // Backend configuration
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // Detection options - prioritize user choice over browser detection
    detection: {
      order: ['localStorage', 'cookie'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
    },
  })
  .then(() => {
    isInitialized = true;
    isInitializing = false;
    console.log('i18n initialized successfully');
  })
  .catch(error => {
    console.error('i18n initialization error:', error);
    isInitializing = false;
  });
}

export default i18n;