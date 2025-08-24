import styles from './Badge.module.css';
import { useState } from 'react';

interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  total: string;
  atividades: string;
  competencias: string;
  logo: string;
  corFundo: string;
  corTexto: string;
}

interface BadgeLabels {
  periodo: string;
  total: string;
  atividades: string;
  competencias: string;
}

const Badge = ({experiencia, labels}: { experiencia: Experiencia, labels: BadgeLabels }) => {
  const [flipped, setFlipped] = useState(false);

  const handleToggle = () => {
    setFlipped(prev => !prev);
  };

  return (
    <div className={styles.badge} onClick={handleToggle}>
      <div className={`${styles.badgeInner} ${flipped ? styles.flipped : ''}`} style={{ backgroundColor: experiencia.corFundo, color: experiencia.corTexto, border: `2px solid ${experiencia.corTexto}` }}>
        <div className={styles.badgeHole} style={{ border: `2px solid ${experiencia.corTexto}`}}></div>
        <div className={styles.badgeFront}>
          <img src={experiencia.logo} alt={experiencia.empresa} style={{ border: `2px solid ${experiencia.corTexto}`}}/>
          <h3>{experiencia.empresa}</h3>
          <p>{experiencia.cargo}</p>
        </div>
        <div className={styles.badgeBack}>
          <p><span>{labels.periodo}: </span>{experiencia.periodo}</p>
          <p className={styles.tempoTotal}><span>{labels.total}: </span>{experiencia.total}</p>
          <p className={styles.atividades}><span>{labels.atividades}: </span>{experiencia.atividades}</p>
          <p><span>{labels.competencias}: </span>{experiencia.competencias}</p>
        </div>
      </div>
    </div>
  );
};

export default Badge;
