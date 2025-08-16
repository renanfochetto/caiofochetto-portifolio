import { createContext } from 'react';
import type { LanguageCode } from './LanguageProvider';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
