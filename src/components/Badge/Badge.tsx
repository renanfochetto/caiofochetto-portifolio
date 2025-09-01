import styles from './Badge.module.css';
import {useEffect, useState} from 'react';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';

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

const isTouchDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
};

const Badge = ({

                 experiencia,
                 labels,
                 index,
               }: {
  experiencia: Experiencia;
  labels: BadgeLabels;
  index: number;
}) => {
  const content = useLocalizedContent();
  const [flipped, setFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const id = `badgeBack-${index}`;

  const ariaLabel = content?.accessibility.experiencia
    .replace('{{empresa}}', experiencia.empresa)
    .replace('{{cargo}}', experiencia.cargo);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const handleToggle = () => {
    if (isTouch) {
      setFlipped((prev) => !prev);
    }
  };

  return (
    <>
      <div
        className={styles.badge}
        tabIndex={0}
        role="group"
        onClick={isTouch ? handleToggle : undefined}
        aria-describedby={id}
        aria-label={ariaLabel}
      >
        <div
          className={`${styles.badgeInner} ${flipped ? styles.flipped : ''}`}
          style={{
            backgroundColor: experiencia.corFundo,
            color: experiencia.corTexto,
            border: `2px solid ${experiencia.corTexto}`,
          }}
        >
          <div
            className={styles.badgeHole}
            style={{border: `2px solid ${experiencia.corTexto}`}}
          ></div>
          <div className={styles.badgeFront}>
            <img
              src={experiencia.logo}
              alt={`${experiencia.empresa} Logo`}
              style={{border: `2px solid ${experiencia.corTexto}`}}
            />
            <h3>{experiencia.empresa}</h3>
            <p>{experiencia.cargo}</p>
          </div>
          <div className={styles.badgeBack}>
            <p>
              <span>{labels.periodo}: </span>
              {experiencia.periodo}
            </p>
            <p className={styles.tempoTotal}>
              <span>{labels.total}: </span>
              {experiencia.total}
            </p>
            <p className={styles.atividades}>
              <span>{labels.atividades}: </span>
              {experiencia.atividades}
            </p>
            <p>
              <span>{labels.competencias}: </span>
              {experiencia.competencias}
            </p>
          </div>
        </div>
      </div>
      <div id={id} className={styles.accessibleBack} aria-hidden={!isTouch}>
        <h3>{experiencia.empresa}</h3>
        <p>{labels.periodo}: {experiencia.periodo}</p>
        <p>{labels.total}: {experiencia.total}</p>
        <p>{labels.atividades}: {experiencia.atividades}</p>
        <p>{labels.competencias}: {experiencia.competencias}</p>
      </div>
    </>
  );
};

export default Badge;
