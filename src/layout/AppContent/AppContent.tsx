import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import {useEffect} from 'react';
import {Header} from '../Header/Header.tsx';
import Career from '../../pages/Career/Career.tsx';
import Cases from '../../pages/Cases/Cases.tsx';
import {Socials} from '../../pages/Socials/Socials.tsx';
import Home from '../../pages/Home/Home.tsx';
import {Footer} from '../Footer/Footer.tsx';
import type {LocalizedContent} from '../../types';

function AppContent() {
  const content = useLocalizedContent();


  function updateMetaTags(metatags: LocalizedContent['metatags']) {
    const isTwitterTag = (name: string) => name.startsWith('twitter:');
    const { description, keywords, social } = metatags;

    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords);
    document.querySelector('title')!.innerText = social.title;

    const setOrCreateMeta = (name: string, content: string) => {
      const isTwitter = isTwitterTag(name);
      const selector = isTwitter ? `meta[name="${name}"]` : `meta[property="${name}"]`;
      const tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        const newTag = document.createElement('meta');
        newTag.setAttribute(isTwitter ? 'name' : 'property', name);
        newTag.setAttribute('content', content);
        document.head.appendChild(newTag);
      }
    };

    // Open Graph
    setOrCreateMeta('og:title', social.title);
    setOrCreateMeta('og:description', social.description);
    setOrCreateMeta('og:site_name', social.siteName);

    // Twitter (reaproveitando os mesmos valores)
    setOrCreateMeta('twitter:title', social.title);
    setOrCreateMeta('twitter:description', social.description);
  }


  useEffect(() => {
    if (content?.metatags) {
      updateMetaTags(content.metatags);
    }
  }, [content]);


// Atualiza acessibilidade
  useEffect(() => {
    if (!content?.accessibility) return;

    const root = document.getElementById('root');
    root?.setAttribute('aria-label', content.accessibility.root);
  }, [content]);

  if (!content) return null;

  return (
    <>
      <div aria-hidden="true" className="background-layer" />
      <Header />
      <main>
        <Home />
        <Career />
        <Cases />
        <Socials />
      </main>
      <Footer />
    </>
  );
}

export default AppContent;
