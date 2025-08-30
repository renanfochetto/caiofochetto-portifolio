// useLocalizedContent.ts
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/useLanguage.ts';
import type { LocalizedContent } from '../types';

export const useLocalizedContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<LocalizedContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: LocalizedContent = await response.json();
        setContent(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar conteúdo localizado:', error);
      }
    };

    fetchContent();
  }, [language]);

  return content;
};
