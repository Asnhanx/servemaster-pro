import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { zhCN, type Translations } from './zh-CN';
import { en } from './en';
import { zhTW } from './zh-TW';
import { ja } from './ja';

export type Language = 'zh-CN' | 'zh-TW' | 'en' | 'ja';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
    { code: 'zh-CN', label: '简体中文', flag: '🇨🇳' },
    { code: 'zh-TW', label: '繁體中文', flag: '🇹🇼' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

const translations: Record<Language, Translations> = {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    en,
    ja,
};

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: 'zh-CN',
    setLang: () => { },
    t: zhCN,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Language>(() => {
        const saved = localStorage.getItem('lang') as Language | null;
        return saved && translations[saved] ? saved : 'zh-CN';
    });

    const setLang = (newLang: Language) => {
        setLangState(newLang);
        localStorage.setItem('lang', newLang);
    };

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const t = translations[lang];

    return (
        <LanguageContext.Provider value= {{ lang, setLang, t }
}>
    { children }
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
