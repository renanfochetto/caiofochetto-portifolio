import styles from './CaseModal.module.css';
import type {CaseData} from '../../types';
import {useEffect} from 'react';
import {buildAssetPath} from '../../utils/path.ts';
import QuoteBlock from './Blocks/QuoteBlock/QuoteBlock.tsx';
import TextBlock from './Blocks/TextBlock/TextBlock.tsx';
import VideoGallery from './Blocks/VideoGallery/VideoGallery.tsx';
import PhotoGallery from './Blocks/PhotoGallery/PhotoGallery.tsx';
import Tag from '../Tag/Tag.tsx';
import type {CaseBlock} from '../../types';
import {createPortal} from 'react-dom';

export type CaseModalProps = {
  caseData: CaseData;
  tagData: Record<string, { label: string; color: string }>;
  onClose: () => void;
}


const CaseModal = ({caseData, tagData, onClose}: CaseModalProps) => {


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!caseData) return null;

  const {nome, empresa, cargo, ano, tags, logos, blocks, folder} = caseData;

  const renderBlock = (block: CaseBlock, index: number) => {
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
            layout={block.layout}
            description={block.description}
          />
        );
      case 'videoGallery':
        return (
          <VideoGallery
            key={index}
            videos={block.links}
            layout={block.layout}
            description={block.description}
          />
        );
      default:
        return null;
    }
  };

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div role="dialog" aria-modal="true" className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" width="64px" height="64px">
            <path
              d="M 19 15 C 17.977 15 16.951875 15.390875 16.171875 16.171875 C 14.609875 17.733875 14.609875 20.266125 16.171875 21.828125 L 30.34375 36 L 16.171875 50.171875 C 14.609875 51.733875 14.609875 54.266125 16.171875 55.828125 C 16.951875 56.608125 17.977 57 19 57 C 20.023 57 21.048125 56.609125 21.828125 55.828125 L 36 41.65625 L 50.171875 55.828125 C 51.731875 57.390125 54.267125 57.390125 55.828125 55.828125 C 57.391125 54.265125 57.391125 51.734875 55.828125 50.171875 L 41.65625 36 L 55.828125 21.828125 C 57.390125 20.266125 57.390125 17.733875 55.828125 16.171875 C 54.268125 14.610875 51.731875 14.609875 50.171875 16.171875 L 36 30.34375 L 21.828125 16.171875 C 21.048125 15.391875 20.023 15 19 15 z"/>
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <div className={styles.infoSection}>
            <div className={styles.titleSection}>
              <h5>{nome}</h5>
            </div>
            <div className={styles.tagsSection}>
              {tags.map((key, i) => {
                const tag = tagData?.[key];
                if (!tag) return null;
                return (
                  <Tag key={i} className={styles.tag} color={tag.color} label={tag.label}/>
                );
              })}
            </div>
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
            <span><strong>Case:</strong> {nome}</span>
            <span><strong>Empresa:</strong> {empresa}</span>
            <span><strong>Cargo:</strong> {cargo}</span>
            <span><strong>Ano:</strong> {ano}</span>
          </div>
        </div>
      </div>
    </div>, document.body
  );
};

export default CaseModal;
