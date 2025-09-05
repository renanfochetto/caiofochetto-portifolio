import styles from './Cases.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import {CaseGrid} from '../../components/CaseGrid/CaseGrid.tsx';
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Cases = () => {
    const content = useLocalizedContent();

    const wrapperRef = useRef<HTMLElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<ScrollTrigger | null>(null);

    const hasAnimatedTitle = useRef(false);

  const hasAnimatedCards = useRef(false);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        if (!wrapper || !container) return;

        const killTrigger = () => {
            if (triggerRef.current) {
                triggerRef.current.kill(true);
                triggerRef.current = null;
            }
        };

        const createOrUpdate = () => {
            // zera posição antes de medir
            gsap.set(container, { x: 0 });

            const overflow = Math.max(
                0,
                container.scrollWidth - window.innerWidth,
            );
            killTrigger();

            if (overflow > 0) {
                const tween = gsap.to(container, {
                    // calcule SEMPRE no momento do refresh
                    x: () => -(container.scrollWidth - window.innerWidth),
                    ease: 'none',
                    scrollTrigger: {
                        id: 'cases-horizontal',
                        trigger: wrapper,
                        start: 'top top',
                        end: () =>
                            `+=${Math.max(0, container.scrollWidth - window.innerWidth)}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
                triggerRef.current = tween.scrollTrigger as ScrollTrigger;
            }
        };

        // refresh seguro: se já existe trigger, refresh; senão cria
        const refresh = () => {
            if (triggerRef.current) {
                triggerRef.current.refresh();
            } else {
                createOrUpdate();
            }
        };

        // debounce simples para eventos em rajada (resize/load/observer)
        let t: number | null = null;
        const queueRefresh = () => {
            if (t) window.clearTimeout(t);
            t = window.setTimeout(() => {
                t = null;
                refresh();
            }, 60);
        };

        // 1) setup inicial no próximo frame (não bloqueie por imagens)
        const raf = requestAnimationFrame(createOrUpdate);

        // 2) quando imagens carregarem (ou falharem), apenas refresque
        const imgs = Array.from(container.querySelectorAll('img'));
        const listeners: Array<[HTMLImageElement, (e: Event) => void]> = [];
        imgs.forEach((img) => {
            const onDone = () => queueRefresh();
            img.addEventListener('load', onDone);
            img.addEventListener('error', onDone);
            listeners.push([img, onDone]);
            // se já está completa (cache), também fila refresh
            if (img.complete) queueRefresh();
        });

        // 3) resize de janela
        window.addEventListener('resize', queueRefresh);

        // 4) mudanças de tamanho do container (ex.: filtro em <CaseGrid/>)
        const ro = new ResizeObserver(() => queueRefresh());
        ro.observe(container);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', queueRefresh);
            ro.disconnect();
            listeners.forEach(([img, onDone]) => {
                img.removeEventListener('load', onDone);
                img.removeEventListener('error', onDone);
            });
            killTrigger();
        };
    }, [content]);

  const setCasesRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasAnimatedTitle.current) return;

    const title = node.querySelector(`.${styles.titleSection}`) as HTMLElement;
    if (title) {
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
    }

    // Animação dos cards
    requestAnimationFrame(() => {
      const cards = document.querySelectorAll('.case-card-animation') as NodeListOf<HTMLElement>;
      if (cards.length === 0) return;

      gsap.set(cards, { scale: 0.8, y: 50, opacity: 0 });

      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.to(cards, {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
          stagger: 0.15,
        });

        hasAnimatedCards.current = true;
        observer.disconnect();
      }, { threshold: 0.3 });

      observer.observe(cards[0]);
    });
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
            <div
                className={styles.container}
                ref={containerRef}
            >
                <div className={styles.titleSection}>
                    <h3>{pagina}</h3>
                </div>
                <div className={styles.casesGrid}>
                    <CaseGrid
                      cardClassName="case-card-animation"
                    />
                </div>
            </div>
        </section>
    );
};

export default Cases;
