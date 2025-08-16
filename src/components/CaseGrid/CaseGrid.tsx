import styles from './CaseGrid.module.css';
import CaseCard from '../CaseCard/CaseCard.tsx';
import TagFilter from '../TagFilter/TagFilter.tsx';
import {useState} from 'react';
import CaseModal from '../CaseModal/CaseModal.tsx';
import type {CaseData} from '../../types';

const cases = [
  {
    case: 'giorgio-no-brasil',
    id: 1,
    nome: '#GiorgioNoBrasil',
    empresa: 'History Channel - A+E Networks',
    src: '/cases/giorgionoBrasil.jpg',
    ano: 2017,
    tags: [
      'digitalStrategy'
    ]
  },
  {
    case: 'havaianas',
    id: 2,
    nome: 'Havaianas + NetFlix',
    empresa: 'Playground',
    src: '/cases/havaianas.png',
    ano: 2021,
    tags: [
      'digitalContent', 'digitalStrategy'
    ]
  },
  {
    case: 'history',
    id: 3,
    nome: 'ALONE / SOZINHOS',
    empresa: 'Playground',
    src: '/cases/history.png',
    ano: 2021,
    tags: [
      'digitalContent', 'digitalStrategy'
    ]
  },
  {
    case: 'natura',
    id: 4,
    nome: 'Natura',
    empresa: 'Playground',
    src: '/cases/natura.png',
    ano: 2021,
    tags: [
      'branding', 'digitalContent'
    ]
  },
  {
    case: 'p4jz',
    id: 5,
    nome: 'Podcast Passion 4 Jazz',
    empresa: 'Playground',
    src: '/cases/p4jz.png',
    ano: 2021,
    tags: [
      'graphicDesign'
    ]
  },
  {
    case: 'playground',
    id: 6,
    nome: 'Branded Content',
    empresa: 'Playground',
    src: '/cases/playground.png',
    ano: 2020,
    tags: [
      'branding'
    ]
  }
];

const CaseGrid = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  const filteredCases = activeTags.length === 0
    ? cases
    : cases.filter(c => c.tags.some(tag => activeTags.includes(tag)));

  return (
    <>
      <div className={styles.tagFilterContainer}>
        <TagFilter onFilterChange={setActiveTags}/>
      </div>
      <div className={styles.caseGrid}>
        {filteredCases.map(c => (
          <CaseCard
            image={c.src}
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
            onClose={() => setSelectedCase(null)}
          />
        )}
      </div>
    </>
  );
};

export default CaseGrid;
