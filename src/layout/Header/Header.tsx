import styles from './Header.module.css';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector.tsx';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';

interface Link {
  id: string;
  label: string;
}

const Header = () => {
  const content = useLocalizedContent();

  if(!content) return null;

  const links = content.inicial.links;

  return (
    <header className={styles.header}>
      <a href="#home" className={styles.logoLink}>
        <h1 className={styles.logo}>CAIO <br />FOCHETTO</h1>
      </a>
      <LanguageSelector />
      <nav>
        <ul>
          {links.map((link: Link) => (
            <li key={link.id}>
              <a href={`#${link.id}`} className={styles.linksNav}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
