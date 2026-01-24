import { useLanguage } from './LanguageProvider'

export type I18nMap<T> = { th: T; en: T }

export function useI18nStatic<T>(map: I18nMap<T>): T {
    const { lang } = useLanguage()
    return map[lang]
}
