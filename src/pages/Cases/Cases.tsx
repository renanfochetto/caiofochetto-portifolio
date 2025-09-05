import styles from './Cases.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import { CaseGrid } from '../../components/CaseGrid/CaseGrid.tsx';
import { useRef, useCallback } from 'react';
import { gsap } from 'gsap';

const Cases = () => {
  const content = useLocalizedContent();
  const hasAnimatedTitle = useRef(false);

  const setCasesRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasAnimatedTitle.current) return;

    const title = node.querySelector(`.${styles.titleSection}`) as HTMLElement;
    if (!title) return;

    gsap.set(title, { x: -100, opacity: 0 });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.to(title, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => {
          hasAnimatedTitle.current = true;
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(node);
  }, []);

  if (!content) return null;
  const { pagina } = content.cases;

  return (
    <section
      id="cases"
      className={styles.scrollWrapper}
      ref={setCasesRef}
      aria-label={content.accessibility.cases}
    >
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <h3>{pagina}</h3>
        </div>
        <div className={styles.casesGrid}>
          <CaseGrid />
        </div>
      </div>
    </section>
  );
};

export default Cases;
