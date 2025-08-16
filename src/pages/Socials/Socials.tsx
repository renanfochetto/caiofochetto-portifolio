import styles from './Socials.module.css';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
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
    preview: '/socials/youtube-desktop.avif'
  }
];

const Socials = () => {
  const content = useLocalizedContent();
  console.log('Conteúdo carregado:', content);

  if (!content) return null;

  const {pagina} = content.socials;

  return (
    <section id="socials" className={styles.container}>
      <div className={styles.titleSection}>
        <h3>{pagina}</h3>
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
);
};

export default Socials;
