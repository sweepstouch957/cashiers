"use client";

import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import en from './locales/en';
import es from './locales/es';
import type { Translations } from './locales/en';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Locale = 'en' | 'es';

const LOCALES: Record<Locale, Translations> = { en, es };

const STORAGE_KEY = 'app-locale';

function getSavedLocale(): Locale {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved === 'es' || saved === 'en') ? saved : 'en';
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface I18nContextValue {
    locale: Locale;
    t: Translations;
    setLocale: (l: Locale) => void;
    toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() => getSavedLocale());

    const setLocale = useCallback((l: Locale) => {
        setLocaleState(l);
        try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ssr */ }
    }, []);

    const toggleLocale = useCallback(() => {
        setLocale(locale === 'en' ? 'es' : 'en');
    }, [locale, setLocale]);

    return (
        <I18nContext.Provider value={{ locale, t: LOCALES[locale], setLocale, toggleLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useI18n() {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
    return ctx;
}
