import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Lang = 'th' | 'en';
type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };

const LanguageContext = createContext<Ctx | null>(null);
const KEY = 'nb.lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem(KEY) as Lang) || 'th');
    const setLang = (l: Lang) => { setLangState(l); localStorage.setItem(KEY, l); };
    const toggle = () => setLang(lang === 'th' ? 'en' : 'th');

    useEffect(() => { if (!['th', 'en'].includes(lang)) setLang('th'); }, [lang]);

    const value = useMemo(() => ({ lang, setLang, toggle }), [lang]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
    return ctx;
}
