import styles from './Header.module.css';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector.tsx';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';

interface Link {
    id: string;
    label: string;
}

export const Header = () => {
    const content = useLocalizedContent();

    if (!content) return null;

    const links = content.inicial.links;

    return (
        <header className={styles.header}>
            <a
                href="#home"
                className={styles.logoLink}
                aria-label="Ir para o início"
            >
                <h1 className={styles.logo}>
                  <span>CAIO</span>
                  <span>FOCHETTO</span>
                </h1>
            </a>
            <LanguageSelector />
            <nav aria-label="Navegação Principal">
                <ul>
                    {links.map((link: Link) => (
                        <li key={link.id}>
                            <a
                                href={`#${link.id}`}
                                className={styles.linksNav}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};
