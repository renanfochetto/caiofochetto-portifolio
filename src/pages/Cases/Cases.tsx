import styles from './Cases.module.css';
import {useLocalizedContent} from "../../hooks/useLocalizedContent.ts";

const Cases = () => {
  const content = useLocalizedContent();

  if (!content) return null;

  const {pagina} = content.cases;

  return (
      <section className={styles.container}>
        <div className={styles.titleSection}>
          <h3>{pagina}</h3>
        </div>
        <div className={styles.casesGrid}></div>
      </section>
  )
}

export default Cases;
