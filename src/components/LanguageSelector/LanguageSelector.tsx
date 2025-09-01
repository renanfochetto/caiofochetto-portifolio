import {useEffect, useState} from 'react';
import { useLanguage } from '../../context/useLanguage.ts';
import styles from './LanguageSelector.module.css';

type Language = {
    code: string;
    label: string;
};

const languages: Language[] = [
    { code: 'pt', label: 'PORTUGUÊS' },
    { code: 'en', label: 'ENGLISH' },
    { code: 'es', label: 'ESPAÑOL' },
];

export const LanguageSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.selector}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
        <div className={styles.selector}>
            <button
                className={styles.selected}
                onClick={toggleDropdown}
                type="button"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {languages.find((l) => l.code === language)?.label}
                <img
                    src={
                        isOpen ? '/icons/closeicon.svg' : '/icons/openicon.svg'
                    }
                    alt="Toggle menu"
                />
            </button>
            {isOpen && (
                <ul className={styles.options} role="listbox">
                    {languages.map((lang) => (
                        <li
                            key={lang.code}
                            role="option"
                            aria-selected={language === lang.code}
                            className={styles.option}
                            onClick={() => {
                                setLanguage(lang.code as 'pt' | 'en' | 'es');
                                setIsOpen(false);
                            }}
                        >
                            {lang.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

