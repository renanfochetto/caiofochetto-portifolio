import styles from './CaseGrid.module.css';
import CaseCard from '../CaseCard/CaseCard.tsx';
import TagFilter from '../TagFilter/TagFilter.tsx';
import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { CaseModal } from '../CaseModal/CaseModal.tsx';
import { buildAssetPath } from '../../utils/path';
import type { CaseData } from '../../types';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import gsap from 'gsap';
import tagStyles from '../Tag/Tag.module.css';

export const CaseGrid = () => {
  const content = useLocalizedContent();
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  const cases = content?.cases?.projetos || [];
  const hasAnimatedTags = useRef(false);

  const getColumnDivisor: () => 1 | 2 | 3 = (): 1 | 2 | 3 => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isPortrait = height > width;

    if (isPortrait) {
      if (width <= 800) return 2;
      return 3;
    } else {
      if (width <= 500) return 1;
      if (width <= 1900) return 2;
      return 3;
    }
  };

  const filteredCases =
    activeTags.length === 0
      ? cases
      : cases.filter((c) =>
        c.tags.some((tag) => activeTags.includes(tag)),
      );

  const numColumns = useMemo(() => {
    const divisor = getColumnDivisor();
    return Math.ceil(filteredCases.length / divisor);
  }, [filteredCases]);

  // Função reutilizável para animar os cards
  const animateCards = (
    cards: NodeListOf<HTMLElement>,
    ease: string,
    duration = 0.8
  ) => {
    gsap.killTweensOf(cards);
    gsap.set(cards, { scale: 0.9, y: 20, opacity: 0 });
    gsap.to(cards, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration,
      ease,
      stagger: 0.08,
    });
  };

  const setTagFilterRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasAnimatedTags.current) return;

    const tags = node.querySelectorAll(
      `.${tagStyles.tag}`
    ) as NodeListOf<HTMLElement>;
    if (tags.length === 0) return;

    gsap.set(tags, { x: 100, opacity: 0 });

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      gsap.to(tags, {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      });

      hasAnimatedTags.current = true;
      observer.disconnect();
    }, { threshold: 0.1 });

    observer.observe(node);
  }, []);

  // Primeira entrada: anima com back.out (mais impactante)
  useEffect(() => {
    const container = document.querySelector(`.${styles.caseGrid}`);
    if (!container) return;

    const animatedCards = new WeakSet<HTMLElement>();

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target as HTMLElement;
        if (entry.isIntersecting && !animatedCards.has(el)) {
          animateCards([el] as unknown as NodeListOf<HTMLElement>, 'back.out(1.7)', 0.9);
          animatedCards.add(el);
        }
      });
    }, { threshold: 0.01 });

    const mutationObserver = new MutationObserver(() => {
      const cards = container.querySelectorAll(
        `.${styles.caseCardAnimation}`
      ) as NodeListOf<HTMLElement>;

      cards.forEach((card) => {
        if (!animatedCards.has(card)) {
          gsap.set(card, { scale: 0.9, y: 20, opacity: 0 });
          intersectionObserver.observe(card);
        }
      });
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [filteredCases]);

  // Mudança de filtro: anima com power3.out (mais direto)
  useEffect(() => {
    const container = document.querySelector(`.${styles.caseGrid}`);
    if (!container) return;

    const cards = container.querySelectorAll(
      `.${styles.caseCardAnimation}`
    ) as NodeListOf<HTMLElement>;
    if (!cards.length) return;

    animateCards(cards, 'power3.out', 0.6);
  }, [filteredCases.length, activeTags.join('|')]);

  if (!content?.cases) return null;

  return (
    <>
      <div className={styles.tagFilterContainer}>
        <TagFilter
          onFilterChange={setActiveTags}
          containerRef={setTagFilterRef}
        />
      </div>
      <div
        className={styles.caseGrid}
        aria-label={content.accessibility.filter}
        role="list"
        style={{
          gridTemplateColumns: `repeat(${numColumns}, var(--column-width))`,
        }}
      >
        {filteredCases.map((c) => (
          <CaseCard
            image={buildAssetPath(c.folder, c.capa)}
            key={c.id}
            onClick={() => setSelectedCase(c)}
            alt={c.alt}
            projeto={c.nome}
            tagKeys={c.tags}
            className={styles.caseCardAnimation}
          />
        ))}
        {selectedCase && (
          <CaseModal
            caseData={selectedCase}
            tagData={content?.cases?.tags}
            onClose={() => setSelectedCase(null)}
          />
        )}
      </div>
    </>
  );
};
