import styles from './Home.module.css';
import LinkContainer from '../../components/LinkContainer/LinkContainer.tsx';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import {useRef, useEffect, useCallback} from 'react';
import gsap from 'gsap';

const Home = () => {
  const hasAnimatedIntro = useRef(false);
  const hasAnimatedSocials = useRef(false);
  const content = useLocalizedContent();

  const setIntroRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || hasAnimatedIntro.current) return;

    const intro = node;
    const titles = node.querySelectorAll(`.${styles.introTitle}`) as NodeListOf<HTMLElement>;
    const description = node.querySelectorAll(`.${styles.introDescription}`) as NodeListOf<HTMLElement>;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(intro, {
      y: 30,
      opacity: 0,
      duration: 0.3,
    });

    // Títulos com stagger
    tl.from(titles, {
      y: 40,
      opacity: 0,
      duration: 0.5,
    });

    // Parágrafos
    tl.from(description, {
      y: 20,
      opacity: 0,
      duration: 0.4,
    });

    hasAnimatedIntro.current = true;
  }, []);

  const setSocialsRef = useCallback((node: HTMLDivElement | null) => {
    if (!node || hasAnimatedSocials.current) return;

    const lineBig = node.querySelector(`.${styles.lineBig}`) as HTMLElement;
    const lineSmall = node.querySelector(`.${styles.lineSmall}`) as HTMLElement;
    const icons = node.querySelector(`.${styles.icons}`) as HTMLElement;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(icons, { x: 100, autoAlpha: 0, duration: 0.4 });
    tl.fromTo(lineSmall, { scaleX: 0 }, { scaleX: 1, duration: 0.3, transformOrigin: 'right' });
    tl.fromTo(lineBig, { scaleX: 0 }, { scaleX: 1, duration: 0.5, transformOrigin: 'left' });

    hasAnimatedSocials.current = true;
  }, []);

  useEffect(() => {
    if (content?.pageTitle) {
      document.title = content.pageTitle;
    }
  }, [content]);

  if (!content) return null;

  const {titulo, subtitulo} = content.inicial;

  return (
    <section
      id="home"
      className={styles.container}
    >
      <div className={styles.intro} ref={setIntroRef}>
        {titulo.map((line: string, index: number) => (
          <div
            key={index}
            className={styles.introTitle}
          >
            <h2>{line}</h2>
          </div>
        ))}
        <div className={styles.introDescription}>
          {subtitulo.map((line: string, index: number) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className={styles.socials} ref={setSocialsRef}>
        <div className={styles.lineBig}></div>
        <div className={styles.icons}>
          <LinkContainer/>
        </div>
        <div className={styles.lineSmall}></div>
      </div>
    </section>
  );
};

export default Home;
