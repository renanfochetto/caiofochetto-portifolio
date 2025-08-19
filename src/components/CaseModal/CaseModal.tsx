import styles from './CaseModal.module.css';
import type {CaseData} from '../../types';
import {useEffect} from 'react';
import { buildAssetPath } from '../../utils/path.ts';
import QuoteBlock from './Blocks/QuoteBlock/QuoteBlock.tsx';
import TextBlock from './Blocks/TextBlock/TextBlock.tsx';
import VideoGallery from './Blocks/VideoGallery/VideoGallery.tsx';
import PhotoGallery from './Blocks/PhotoGallery/PhotoGallery.tsx';
import type { CaseBlock } from '../../types';

const CaseModal = ({caseData, onClose}: { caseData: CaseData; onClose: () => void }) => {


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!caseData) return null;

  const {nome, empresa, cargo, ano, tags, logos, blocks, folder} = caseData;

  const renderBlock = (block: CaseBlock, index: number)=> {
    switch (block.type) {
      case 'text':
        return <TextBlock key={index} title={block.title} paragraph={block.paragraph}/>;
      case 'quote':
        return <QuoteBlock key={index} quote={block.paragraph}/>;
      case 'photoGallery':
        return (
          <PhotoGallery
            key={index}
            images={block.files.map((file, i) => ({
              src: buildAssetPath(folder, file),
              alt: `Imagem ${i + 1}`
            }))}
          />
        );
      case 'videoGallery':
        return <VideoGallery key={index} videos={block.links}/>;
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div role="dialog" aria-modal="true" className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>X</button>

        //MODAL HEADER
        <div className={styles.modalHeader}>
          <div className={styles.tagSection}>
            {tags.map((tag, i) => (
              <span key={i} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <div className={styles.logoSection}>
            {logos.map((logo, i) => (
              <img
                key={i}
                src={buildAssetPath(folder, logo)}
                alt={`Logo ${i}`}
                className={styles.logo}/>
            ))}
          </div>
        </div>

        <div className={styles.contentBlocks}>
          {blocks.map((block, index) => renderBlock(block, index))}
        </div>

        <div className={styles.modalFooter}>
          <div className={styles.techSheet}>
            <p><strong>Case:</strong> {nome}</p>
            <p><strong>Empresa:</strong> {empresa}</p>
            <p><strong>Cargo:</strong> {cargo}</p>
            <p><strong>Ano:</strong> {ano}</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CaseModal;
