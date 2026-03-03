"use client";

import { useI18n } from '@/i18n/i18n-context';

/**
 * Premium pill-style language toggle.
 * Active locale slides to a white pill with a pink shadow & text.
 */
export function LanguageToggle() {
    const { locale, setLocale } = useI18n();

    return (
        <div
            role="group"
            aria-label="Select language"
            className="flex items-center bg-white/15 backdrop-blur-sm border border-white/25 rounded-full p-0.5 gap-0.5 shadow-inner"
        >
            {(['en', 'es'] as const).map((lang) => (
                <button
                    key={lang}
                    onClick={() => setLocale(lang)}
                    aria-pressed={locale === lang}
                    className={`
            relative px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest
            transition-all duration-200 ease-out
            ${locale === lang
                            ? 'bg-white text-[#FC0680] shadow-[0_2px_8px_rgba(252,6,128,0.35)] scale-105'
                            : 'text-white/70 hover:text-white hover:bg-white/10 scale-100'
                        }
          `}
                >
                    {lang}
                </button>
            ))}
        </div>
    );
}
