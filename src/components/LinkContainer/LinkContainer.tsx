import Link from '../Link/Link.tsx';
import styles from './LinkContainer.module.css';

type LinkContainerProps = {
  className?: string;
}

const links = [
  {
    name: 'youtube',
    icon: '/icons/youtube.svg',
    href: 'https://www.youtube.com/@caiofochetto/playlists'
  },
  {
    name: 'email',
    icon: '/icons/email.svg',
    href: 'mailto:caiofochetto@gmail.com'
  },
  {
    name: 'linkedin',
    icon: '/icons/linkedin.svg',
    href: 'https://www.linkedin.com/in/caiofochetto/'
  }
];

const LinkContainer = ( { className }: LinkContainerProps ) => {
  return (
    <div className={`${styles.linkContainer} ${className || ''}`}>
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
};

export default LinkContainer;
