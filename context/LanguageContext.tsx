// context/LanguageContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type LangCode = 'ID' | 'EN';

export interface LanguageOption {
  code: LangCode;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ID', label: 'Bahasa Indonesia' },
  { code: 'EN', label: 'English' },
];

// === KAMUS — Tambah teks baru di sini ===
const ID = {
  home: 'Beranda',
  about: 'Tentang',
  menu: 'Menu',
  gallery: 'Galeri',
  contact: 'Kontak',
  team: 'Tim',
  reservation: 'Reservasi',
  ourCollection: 'Koleksi Kami',
  galleryTitle: 'Galeri Momen & Kelezatan',
  galleryDesc:
    'Jelajahi kehangatan ruang makan, kesegaran bahan pilihan, dan dedikasi tim kami dalam menyajikan hidangan istimewa untuk Anda.',
  heroTitle: 'Selamat Datang',
  heroSub: 'Rasa enak, bahan segar',
  cta: 'Lihat Menu',
  copyright: 'Hak cipta dilindungi',
};

const EN: Record<keyof typeof ID, string> = {
  home: 'Home',
  about: 'About',
  menu: 'Menu',
  gallery: 'Gallery',
  contact: 'Contact',
  team: 'Our Team',
  reservation: 'Reservation',
  ourCollection: 'Our Collection',
  galleryTitle: 'Gallery of Moments & Delicacies',
  galleryDesc:
    'Explore the warmth of the dining room, the freshness of selected ingredients, and our team dedication in serving special dishes for you.',
  heroTitle: 'Welcome',
  heroSub: 'Tasty food, fresh ingredients',
  cta: 'View Menu',
  copyright: 'All rights reserved',
};
// === Selesai bagian kamus ===

const TRANSLATIONS: Record<LangCode, typeof ID> = { ID, EN };
export type TranslationKeys = typeof ID;

interface LanguageContextType {
  selectedLang: LanguageOption;
  setSelectedLang: (lang: LanguageOption) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLang, setSelectedLangState] = useState<LanguageOption>(LANGUAGES[0]);

  useEffect(() => {
    const saved = localStorage.getItem('app_lang') as LangCode | null;
    if (saved === 'ID' || saved === 'EN') {
      setSelectedLangState(LANGUAGES.find((l) => l.code === saved)!);
    }
  }, []);

  const setSelectedLang = (lang: LanguageOption) => {
    setSelectedLangState(lang);
    localStorage.setItem('app_lang', lang.code);
  };

  const t = TRANSLATIONS[selectedLang.code];

  return (
    <LanguageContext.Provider value={{ selectedLang, setSelectedLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage harus digunakan di dalam LanguageProvider');
  return context;
}