import styles from './Header.module.css';
import {LanguageSelector} from '../../components/LanguageSelector/LanguageSelector.tsx';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import {useRef, useCallback} from 'react';
import gsap from 'gsap';

interface Link {
  id: string;
  label: string;
}

export const Header = () => {
  const hasAnimated = useRef(false);

  const selectorRef = useRef<HTMLDivElement | null>(null);

  const setHeaderRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || hasAnimated.current) return;

    const header = node;
    const logo  = header.querySelector(`.${styles.logo}`) as HTMLElement;
    const nav = header.querySelector('nav') as HTMLElement;
    const selector = selectorRef.current as HTMLElement | null;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(header, { borderBottomWidth: 1, duration: 0.3 });
    tl.to(header, { boxShadow: '0 10px 20px -10px rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(8px)', duration: 0.3 });

    tl.addLabel('navStart', '<0.1');
    if (nav) tl.from(nav, { x: 200, autoAlpha: 0, duration: 0.5 }, 'navStart');
    if (selector) tl.from(selector, { y: -50, autoAlpha: 0, scale: 0.95, duration: 0.5 }, 'navStart');

    tl.from(logo, {
      scale: 0.8,
      rotation: -10,
      autoAlpha: 0,
      x: -200,
      duration: 1.2,
      ease: 'back.out(2)'
    });

    hasAnimated.current = true;
  }, []);

  const content = useLocalizedContent();

  if (!content) return null;

  const links = content.inicial.links;

  return (
    <header
      className={styles.header}
      ref={setHeaderRef}
    >
      <a
        href="#home"
        className={styles.logoLink}
        aria-label={content.accessibility.inicio}
      >
        <h1 className={styles.logo}>
          <span>CAIO</span>
          <span>FOCHETTO</span>
        </h1>
      </a>
      <LanguageSelector ref={selectorRef}/>
      <nav
        aria-label={content.accessibility.nav}
      >
        <ul>
          {links.map((link: Link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={styles.linksNav}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
