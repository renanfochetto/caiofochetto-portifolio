import styles from './Socials.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import Link from '../../components/Link/Link.tsx';

const links = [
  {
    name: 'LINKEDIN',
    icon: '/icons/linkedin.svg',
    href: 'https://www.linkedin.com/in/caiofochetto/',
    preview: '/socials/linkedin-mobile.avif'
  },
  {
    name: 'YOUTUBE',
    icon: '/icons/youtube.svg',
    href: 'https://www.youtube.com/@caiofochetto/playlists',
    preview: {
      desktop: '/socials/youtube-desktop.avif',
      mobile: '/socials/youtube-mobile.avif'
    }
  }
];

// ✅ Detecta se deve usar imagem mobile
const shouldUseMobileImage = (): boolean => {
  return window.matchMedia('(max-width: 500px)').matches
  || window.matchMedia('(orientation: portrait)').matches;
};

// ✅ Retorna a classe correta com base no nome e contexto
const getImageClass = (name: string, isMobile: boolean = false): string => {
  if (name === 'LINKEDIN') return styles.linkedin;
  if (name === 'YOUTUBE') return isMobile ? styles.youtubeMobile : styles.youtube;
  return '';
};

const Socials = () => {
  const content = useLocalizedContent();
  const isMobile = shouldUseMobileImage();

  if (!content) return null;

  return (
    <section id="social" className={styles.container}>
      <div className={styles.titleSection}>
        <h3>{content?.socials?.pagina}</h3>
      </div>
      <div className={styles.socialsGrid}>
        {links.map(link => (
          <div key={link.name} className={styles.card}>
            <div className={styles.header}>
              <Link
                className={styles.linkSocial}
                href={link.href}
                icon={link.icon}
                alt={`Ícone de ${link.name}`}
              >
                <span>{link.name}</span>
              </Link>
            </div>
            {typeof link.preview === 'string' ? (
              <img
                src={link.preview}
                className={`${styles.previewImage} ${getImageClass(link.name, isMobile)}`}
                alt={`Preview do perfil de Caio Fochetto no ${link.name}`}
                onClick={() => window.open(link.href, '_blank')}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <picture onClick={() => window.open(link.href, '_blank')} style={{ cursor: 'pointer' }}>
                <source media="(max-width: 500px)" srcSet={link.preview.mobile} />
                <source media="(orientation: portrait)" srcSet={link.preview.mobile} />
                <img
                  src={link.preview.desktop}
                  className={`${styles.previewImage} ${getImageClass(link.name, isMobile)}`}
                  alt={`Preview do perfil de Caio Fochetto no ${link.name}`}
                />
              </picture>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Socials;
