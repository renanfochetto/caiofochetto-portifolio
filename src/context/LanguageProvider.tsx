import { useState } from 'react';
import { LanguageContext } from './LanguageContext';
import * as React from 'react';

export type LanguageCode = 'pt' | 'en' | 'es';

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('pt');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
