import styles from './Footer.module.css';
import LinkContainer from "../../components/LinkContainer/LinkContainer.tsx";

export const Footer = () => {
  return (
    <section>
      <div className={styles.coverImage}></div>
      <footer>
        <h4>CAIO <br />FOCHETTO</h4>
        <p>
          <a href="https://www.renanfochetto.dev" target="_blank" rel="noopener noreferrer">
            Desenvolvido por Renan Fochetto
          </a>
        </p>
        <LinkContainer className={styles.footerLinks}/>
      </footer>
    </section>
  )
};


