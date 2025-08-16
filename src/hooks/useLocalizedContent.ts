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
        // Use Vite base URL to ensure correct path resolution in different hosting environments (e.g., Vercel)
        const base = import.meta.env.BASE_URL || '/';
        const url = `${base.replace(/\/$/, '')}/locales/${language}.json`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to load locale: ${url} (status ${response.status})`);
        }

        const data: LocalizedContent = await response.json();
        setContent(data);
      } catch (err) {
        console.error('useLocalizedContent: error fetching localized content', err);
      }
    };

    fetchContent();
  }, [language]);

  return content;
};
