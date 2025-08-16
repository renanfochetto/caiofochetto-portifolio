// useLocalizedContent.ts
import { useEffect, useState } from 'react';
import { useLanguage } from '../context/useLanguage.ts';

export const useLocalizedContent = () => {
  const { language } = useLanguage();
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
      }
    };

    fetchContent();
  }, [language]);

  return content;
};
