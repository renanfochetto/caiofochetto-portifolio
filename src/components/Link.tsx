import styles from './Link.module.css';

type PropsLink = {
  href: string;
  icon?: string;
  alt?: string;
}

const Link = ({ href, icon, alt }: PropsLink) => {
  return (
    <a className={styles.links} href={href} target="_blank" rel="noopener noreferrer">
      {icon && <img className={alt} src={icon} alt={alt || 'Ícone de link'} style={{ marginRight: '8px' }} />}
    </a>
  );
};

export default Link;
