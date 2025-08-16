import styles from './CaseModal.module.css';
import type { CaseData } from '../../types';
import { useEffect } from 'react';

const CaseModal = ({ caseData, onClose }: { caseData: CaseData; onClose: () => void }) => {

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

  return (
    <div className={styles.modalOverlay} onClick={ onClose}>
    <div role="dialog" aria-modal="true" className={styles.modal}>
      <button onClick={onClose}>X</button>
      <h2>{caseData.nome}</h2>
      <p>Empresa: { caseData.empresa }</p>
      <p>Ano: { caseData.ano }</p>
      <img src={caseData.src} alt={`Imagem do case ${caseData.nome}`}/>
      <div>
        Tags: { caseData.tags.join(', ') }
      </div>
    </div>
    </div>

  );
};

export default CaseModal;
