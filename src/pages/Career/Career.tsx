import styles from './Career.module.css';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import Badge from '../../components/Badge/Badge.tsx';
import {useEffect, useRef, useCallback} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Experiencia {
  empresa: string;
  logo: string;
  corFundo: string;
  corTexto: string;
  cargo: string;
  periodo: string;
  total: string;
  atividades: string;
  competencias: string;
}

const Career = () => {
  const content = useLocalizedContent();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const hasAnimatedTitle = useRef(false);
  const hasAnimatedBadges = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const setup = () => {
      // kill only this section's previous trigger
      if (triggerRef.current) {
        triggerRef.current.kill(true);
        triggerRef.current = null;
      }
      gsap.set(container, {x: 0});

      const totalScroll = Math.max(
        0,
        container.scrollWidth - window.innerWidth,
      );

      if (totalScroll > 0) {
        const tween = gsap.to(container, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            id: 'career-horizontal',
            trigger: wrapper,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
        triggerRef.current = tween.scrollTrigger as ScrollTrigger;
      }
    };

    // wait for layout (items loaded)
    const id = requestAnimationFrame(setup);
    window.addEventListener('resize', setup);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', setup);
      if (triggerRef.current) {
        triggerRef.current.kill(true);
        triggerRef.current = null;
      }
    };
  }, [content]);

  const setCareerRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasAnimatedTitle.current) return;

    const title = node.querySelector(`.${styles.titleSection}`) as HTMLElement;
    if (!title) return;

    gsap.set(title, {x: -100, opacity: 0});

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
    }, {threshold: 0.3});

    observer.observe(node);
  }, []);

  const setBadgeGridRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasAnimatedBadges.current) return;

    const badges = node.querySelectorAll(`.${styles.badge}`) as NodeListOf<HTMLElement>;
    const lines = node.querySelectorAll(`.${styles.verticalLine}`) as NodeListOf<HTMLElement>;
    const years = node.querySelectorAll(`.${styles.timelineYear}`) as NodeListOf<HTMLElement>;
    const timelineLine = node.querySelector(`.${styles.timelineLine}`) as HTMLElement;

    if (badges.length === 0 || lines.length === 0 || years.length === 0 || !timelineLine) return;

    gsap.set(badges, { x: 200, opacity: 0 });
    gsap.set(lines, { height: 0 });
    gsap.set(years, { opacity: 0 });
    gsap.set(timelineLine, { scaleX: 0 });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      const tl = gsap.timeline({
        onComplete: () => {
          hasAnimatedBadges.current = true;
          observer.disconnect();
        }
      });

      tl.to(badges, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'elastic.out(0.5)',
        stagger: 0.2
      });

      tl.to(years, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',
      }, '<');

      tl.to(lines, {
        height: '6.5rem',
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
      }, '<0.2');

      tl.to(timelineLine, {
        scaleX: 1,
        duration: 1,
        ease: 'power2.out'
      }, '<');

    }, { threshold: 0.3 });

    observer.observe(node);
  }, []);

  if (!content) return null;
  const {pagina, experiencias, badge} = content.carreira;

  return (
    <section
      id="carreira"
      className={styles.scrollWrapper}
      ref={(el) => {
        wrapperRef.current = el;
        setCareerRef(el);
      }}
      aria-label={content.accessibility.carreira}
    >
      <div
        className={styles.container}
        ref={containerRef}
      >
        <div className={styles.titleSection}>
          <h3>{pagina}</h3>
        </div>
        <div ref={setBadgeGridRef}>
          <div className={styles.badgeGrid}>
            {experiencias.map((exp: Experiencia, index: number) => (
              <Badge
                key={index}
                experiencia={exp}
                labels={badge}
                index={index}
                className={styles.badge}
              />
            ))}
            <div className={styles.timeline}>
              <div className={styles.timelineLine} />
            </div>
            {[
              '2023',
              '2021',
              '2020',
              '2015',
              '2010',
              '2009',
              '2009',
              '2005',
              '2002',
            ].map((year, i) => (
              <div
                key={i}
                className={styles.timelineYear}
                role="presentation"
              >
                <div className={styles.verticalLine} aria-hidden="true" />
                {year}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
