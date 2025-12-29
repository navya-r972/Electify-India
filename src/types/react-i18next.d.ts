import 'react-i18next';

declare module 'react-i18next' {
  export function useTranslation(ns?: string | string[]): {
    t: (key: string, options?: any) => string;
    i18n: {
      changeLanguage: (lng: string) => Promise<any>;
      language: string;
    };
  };

  export const initReactI18next: any;
}

declare module 'i18next' {
  export default interface i18n {
    use: (module: any) => i18n;
    init: (options: any) => Promise<any>;
    changeLanguage: (lng: string) => Promise<any>;
    language: string;
  }
}

declare module 'i18next-browser-languagedetector' {
  const LanguageDetector: any;
  export default LanguageDetector;
}

declare module 'i18next-http-backend' {
  const Backend: any;
  export default Backend;
}