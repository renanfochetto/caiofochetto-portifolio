import styles from './Socials.module.css';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import Link from "../../components/Link/Link.tsx";

// Base links (keys map to translation keys under content.socials)
const baseLinks = [
  {
    key: 'linkedin' as const,
    defaultName: 'LINKEDIN',
    icon: '/icons/linkedin.svg',
    href: 'https://www.linkedin.com/in/caiofochetto/',
    preview: '/socials/linkedin-mobile.avif'
  },
  {
    key: 'youtube' as const,
    defaultName: 'YOUTUBE',
    icon: '/icons/youtube.svg',
    href: 'https://www.youtube.com/@caiofochetto/playlists',
    preview: '/socials/youtube-desktop.avif'
  }
];

const Socials = () => {
  const content = useLocalizedContent();

  if (!content) return null;

  const pagina = content?.socials?.pagina ?? 'SOCIALS';
  const localizedLinks = baseLinks.map((l) => ({
    name: content?.socials?.[l.key] ?? l.defaultName,
    icon: l.icon,
    href: l.href,
    preview: l.preview
  }));

  return (
    <section id="socials" className={styles.container}>
      <div className={styles.titleSection}>
        <h3>{pagina}</h3>
      </div>
      <div className={styles.socialsGrid}>
        {localizedLinks.map(link => (
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
            <img
              src={link.preview}
              className={styles.previewImage}
              alt={`Preview do perfil de Caio Fochetto no ${link.name}`}
              onClick={() => window.open(link.href, '_blank')}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Socials;
