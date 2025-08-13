import Link from "./Link.tsx";
import styles from './LinkContainer.module.css';

const links = [
  {
    name: 'youtube',
    icon: 'src/assets/icons/youtube.svg',
    href: 'https://www.youtube.com/@caiofochetto/playlists'
  },
  {
    name: 'email',
    icon: 'src/assets/icons/email3.svg',
    href: 'mailto:caiofochetto@gmail.com'
  },
  {
    name: 'linkedin',
    icon: '/linkedin.svg',
    href: 'https://www.linkedin.com/in/caiofochetto/'
  }
]

const LinkContainer = () => {
  return (
    <div className={styles.linkContainer}>
      {
        links.map(link => (
          <Link
            key={link.name}
            href={link.href}
            icon={link.icon}
            alt={`Ícone de ${link.name}`}
          />
        ))}
    </div>
  );
}

export default LinkContainer;
