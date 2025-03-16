import { useCallback } from 'react';
import { useAppStore } from '@/store/app-store';
import { translations, TranslationKey } from '@/mocks/translations';

export const useTranslations = () => {
  const language = useAppStore((state) => state.language);

  const t = useCallback((key: TranslationKey): string => {
    try {
      // First try to get the translation in the selected language
      if (translations[language] && translations[language][key]) {
        return translations[language][key];
      }

      // Fallback to English
      if (translations.en && translations.en[key]) {
        return translations.en[key];
      }

      // If all else fails, return the key itself
      console.warn(`Translation missing for key: ${key}`);
      return key;
    } catch (error) {
      console.error('Error in translation:', error);
      return key;
    }
  }, [language]);

  return { t, language };
};