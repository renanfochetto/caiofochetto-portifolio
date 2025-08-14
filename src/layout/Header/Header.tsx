import styles from './Header.module.css';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector.tsx';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';

const Header = () => {
  const content = useLocalizedContent();

  if(!content) return null;

  const links = content.inicial.links

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>CAIO <br />FOCHETTO</h1>
      <LanguageSelector />
      <nav>
        <ul>
          {links.map((link: any) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
