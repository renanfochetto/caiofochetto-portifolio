import { useState } from 'react';
import { useLanguage } from '../../context/useLanguage.ts';
import styles from './LanguageSelector.module.css';

type Language = {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: 'pt', label: 'PT-BR' },
  { code: 'en', label: 'ENGLISH' },
  { code: 'es', label: 'ESPAÑOL' },
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.selector}>
      <div className={styles.selected} onClick={toggleDropdown}>
        {languages.find((l) => l.code === language)?.label}
        <img
          src={isOpen ? '/icons/closeicon.svg' : '/icons/openicon.svg'}
          alt="Toggle menu"
        />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              className={styles.option}
              onClick={() => {
                setLanguage(lang.code as any);
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

export default LanguageSelector;
