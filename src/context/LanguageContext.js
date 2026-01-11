"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLanguage = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5001/api/language", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language }),
        });

        const data = await res.json();
        setTranslations(data);
      } catch (err) {
        console.error("Language fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations, loading }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
