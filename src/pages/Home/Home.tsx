import styles from './Home.module.css';
import LinkContainer from '../../components/LinkContainer/LinkContainer.tsx';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import { useEffect } from 'react';

const Home = () => {
  const content = useLocalizedContent();

  useEffect(() => {
    if (content?.pageTitle) {
      document.title = content.pageTitle;
    }
  }, [content]);

  if (!content) return null;

  const { pagina, titulo, subtitulo } = content.inicial;

  return (
    <section
      id="home"
      className={styles.container}
    >
      <div className={styles.titleSection}>
        <h3>{pagina}</h3>
      </div>
      <div className={styles.intro}>
        {titulo.map((line: string, index: number) => (
          <div
            key={index}
            className={styles.introTitle}
          >
            <h2>{line}</h2>
          </div>
        ))}
        <div className={styles.introDescription}>
          {subtitulo.map((line: string, index: number) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className={styles.socials}>
        <div className={styles.lineBig}></div>
        <div className={styles.icons}>
          <LinkContainer />
        </div>
        <div className={styles.lineSmall}></div>
      </div>
    </section>
  );
};

export default Home;
