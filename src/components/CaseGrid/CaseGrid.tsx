import styles from './CaseGrid.module.css';
import CaseCard from '../CaseCard/CaseCard.tsx';
import TagFilter from '../TagFilter/TagFilter.tsx';
import {useState, useMemo} from 'react';
import {CaseModal} from '../CaseModal/CaseModal.tsx';
import { buildAssetPath } from '../../utils/path';
import type {CaseData} from '../../types';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';


const CaseGrid = () => {
  const content = useLocalizedContent();
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  const cases = content?.cases?.projetos || [];

  const filteredCases = activeTags.length === 0
    ? cases
    : cases.filter(c => c.tags.some(tag => activeTags.includes(tag)));

  const numColumns = useMemo(() => {
    return Math.max(2, Math.ceil(filteredCases.length / 2));
  }, [filteredCases]);

  if (!content?.cases) return null;

  return (
    <>
      <div className={styles.tagFilterContainer}>
        <TagFilter onFilterChange={setActiveTags}/>
      </div>
      <div
        className={styles.caseGrid}
        style={{ gridTemplateColumns: `repeat(${numColumns}, 24rem)`}}
      >
        {filteredCases.map(c => (
          <CaseCard
            image={buildAssetPath(c.folder, c.capa)}
            key={c.id}
            onClick={() => setSelectedCase(c)}
            alt={`Imagem do Case ${c.nome}`}
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

export default CaseGrid;
