import styles from './Career.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import Badge from '../../components/Badge/Badge.tsx';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const content = useLocalizedContent();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const setup = () => {
      // limpa triggers antigos
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set(container, { x: 0 });

      const totalScroll = Math.max(0, container.scrollWidth - window.innerWidth);

      if (totalScroll > 0) {
        gsap.to(container, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    };

    // aguarda layout (itens carregados)
    const id = requestAnimationFrame(setup);
    window.addEventListener('resize', setup);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', setup);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [content]);

  if (!content) return null;
  const { pagina, experiencias, badge } = content.carreira;

  return (
    <section id="carreira" className={styles.scrollWrapper} ref={wrapperRef}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.titleSection}>
          <h3>{pagina}</h3>
        </div>
        <div className={styles.badgeGrid}>
          {experiencias.map((exp: any, index: number) => (
            <Badge key={index} experiencia={exp} labels={badge} />
          ))}
          <div className={styles.timeline}></div>
          {["2023", "2021", "2020", "2015", "2010", "2009", "2009", "2005", "2002"].map((year, i) => (
            <div key={i} className={styles.timelineYear}>{year}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;
