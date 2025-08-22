import styles from './Footer.module.css';
import LinkContainer from '../../components/LinkContainer/LinkContainer.tsx';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';

export const Footer = () => {
  const content = useLocalizedContent();

  if (!content) return null;

  const autor = content.footer.autor;

  return (
    <section>
      <footer>
        <h4>CAIO <br />FOCHETTO</h4>
        <p>
          <a className={styles.author} href="https://www.renanfochetto.dev" target="_blank" rel="noopener noreferrer">
            {autor}
          </a>
        </p>
        <LinkContainer className={styles.footerLinks}/>
      </footer>
    </section>
  );
};


