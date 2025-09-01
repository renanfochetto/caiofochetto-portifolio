import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import {useEffect} from 'react';
import {Header} from '../Header/Header.tsx';
import Career from '../../pages/Career/Career.tsx';
import Cases from '../../pages/Cases/Cases.tsx';
import {Socials} from '../../pages/Socials/Socials.tsx';
import Home from '../../pages/Home/Home.tsx';
import {Footer} from '../Footer/Footer.tsx';

function AppContent() {
  const content = useLocalizedContent();

  useEffect(() => {
    if(!content) return;

    const root = document.getElementById('root');
    if (root) {
      root.setAttribute('aria-label', content.accessibility.root);
    }
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
