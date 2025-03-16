export type Language = {
    id: string;
    name: string;
    nativeName: string;
    flag?: string;
  };

  export const LANGUAGES: Language[] = [
    {
      id: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇬🇧'
    },
    {
      id: 'ha',
      name: 'Hausa',
      nativeName: 'Hausa',
      flag: '🇳🇬'
    },
    {
      id: 'yo',
      name: 'Yoruba',
      nativeName: 'Yorùbá',
      flag: '🇳🇬'
    },
    {
      id: 'ig',
      name: 'Igbo',
      nativeName: 'Igbo',
      flag: '🇳🇬'
    }
  ];

  export const DEFAULT_LANGUAGE = 'en';