"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { setLanguage } = useLanguage();

  return (
    <select
      onChange={(e) => setLanguage(e.target.value)}
      className="border px-2 py-1 rounded"
    >
      <option value="en">English</option>
      <option value="hi">Hindi</option>
      <option value="bn">Bengali</option>
      <option value="ur">Urdu</option>
    </select>
  );
}
