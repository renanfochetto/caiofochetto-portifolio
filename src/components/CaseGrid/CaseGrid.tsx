import styles from './CaseGrid.module.css';
import CaseCard from '../CaseCard/CaseCard.tsx';
import TagFilter from '../TagFilter/TagFilter.tsx';
import { useState, useMemo, useCallback, useRef } from 'react';
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

    const getColumnDivisor = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const isPortrait = height > width;

        if (isPortrait) {
            if (width <= 800) return 2;
            return 3; // Exemplo: 1100x1400
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

  const setTagFilterRef = useCallback((node: HTMLElement | null) => {
    if (!node || hasAnimatedTags.current) return;

    const tags = node.querySelectorAll(`.${tagStyles.tag}`) as NodeListOf<HTMLElement>;
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
