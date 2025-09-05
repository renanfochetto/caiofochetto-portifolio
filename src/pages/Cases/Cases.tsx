import styles from './Cases.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import { CaseGrid } from '../../components/CaseGrid/CaseGrid.tsx';
import { useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cases = () => {
  const content = useLocalizedContent();
  const wrapperRef = useRef<HTMLElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const hasAnimatedTitle = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const grid = gridRef.current;
    if (!wrapper || !grid) return;

    const setup = () => {
      if (triggerRef.current) {
        triggerRef.current.kill(true);
        triggerRef.current = null;
      }
      gsap.set(grid, { x: 0 });

      const totalScroll = Math.max(0, grid.scrollWidth - window.innerWidth);
      if (totalScroll > 0) {
        const tween = gsap.to(grid, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            id: 'cases-horizontal',
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
      ScrollTrigger.refresh();
    };

    const id = requestAnimationFrame(setup);
    window.addEventListener('resize', setup);

    // Observe width changes of the grid (e.g., when filtering changes columns)
    const ro = new ResizeObserver(() => setup());
    ro.observe(grid);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', setup);
      ro.disconnect();
      if (triggerRef.current) {
        triggerRef.current.kill(true);
        triggerRef.current = null;
      }
    };
  }, [content]);

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
      ref={(el) => {
        wrapperRef.current = el;
        setCasesRef(el);
      }}
      aria-label={content.accessibility.cases}
    >
      <div className={styles.container} ref={containerRef}>
        <div className={styles.titleSection}>
          <h3>{pagina}</h3>
        </div>
        <div className={styles.casesGrid} ref={gridRef}>
          <CaseGrid />
        </div>
      </div>
    </section>
  );
};

export default Cases;
