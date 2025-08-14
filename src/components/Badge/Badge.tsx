import styles from './Badge.module.css';

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
  return (
    <div className={styles.badge}>
      <div className={styles.badgeInner} style={{ backgroundColor: experiencia.corFundo, color: experiencia.corTexto, border: `2px solid ${experiencia.corTexto}` }}>
        <div className={styles.badgeHole} style={{ border: `2px solid ${experiencia.corTexto}`}}></div>
        <div className={styles.badgeFront}>
          <img src={experiencia.logo} alt={experiencia.empresa} style={{ border: `2px solid ${experiencia.corTexto}`}}/>
          <h3>{experiencia.empresa}</h3>
          <p>{experiencia.cargo}</p>
        </div>
        <div className={styles.badgeBack}>
          <p><span>{labels.periodo}: </span>{experiencia.periodo}</p>
          <p><span>{labels.total}: </span>{experiencia.total}</p>
          <p><span>{labels.atividades}: </span>{experiencia.atividades}</p>
          <p><span>{labels.competencias}: </span>{experiencia.competencias}</p>
        </div>
      </div>
    </div>
  )
};

export default Badge;
