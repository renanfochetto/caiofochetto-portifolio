import styles from './Cases.module.css';
import {useLocalizedContent} from "../../hooks/useLocalizedContent.ts";
import CaseGrid from "../../components/CaseGrid/CaseGrid.tsx";

const Cases = () => {
  const content = useLocalizedContent();

  if (!content) return null;

  const {pagina} = content.cases;

  return (
      <section id="cases" className={styles.container}>
        <div className={styles.titleSection}>
          <h3>{pagina}</h3>
        </div>
        <div className={styles.casesGrid}>
          <CaseGrid />
        </div>
      </section>
  )
}

export default Cases;
