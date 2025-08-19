import styles from './Tag.module.css';

type TagProps = {
  label: string;
  color: string;
  className?: string;
}

const Tag = ({ label, color }: TagProps) => {
  return (
    <span
      className={styles.tag}
      style={{ backgroundColor: color}}
    >
    {label}
    </span>
  );
};

export default Tag;
