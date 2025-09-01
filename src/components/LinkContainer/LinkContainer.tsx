import Link from '../Link/Link.tsx';
import styles from './LinkContainer.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';

type LinkContainerProps = {
  className?: string;
};

const links = [
  {
    name: 'linkedin',
    icon: '/icons/linkedin.svg',
    alt: 'Linkedin Profile',
    href: 'https://www.linkedin.com/in/caiofochetto/',
  },
  {
    name: 'youtube',
    icon: '/icons/youtube.svg',
    alt: 'Youtube Channel',
    href: 'https://www.youtube.com/@caiofochetto/playlists',
  },
  {
    name: 'email',
    icon: '/icons/email.svg',
    alt: 'Email Caio Fochetto',
    href: 'mailto:caiofochetto@gmail.com',
  },
];

const LinkContainer = ({className}: LinkContainerProps) => {
  const content = useLocalizedContent();

  if (!content) return null;

  return (
    <nav
      className={`${styles.linkContainer} ${className || ''}`}
      aria-label={content.accessibility.socialsLink}
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          icon={link.icon}
          alt={link.alt}
        />
      ))}
    </nav>
  );
};

export default LinkContainer;
