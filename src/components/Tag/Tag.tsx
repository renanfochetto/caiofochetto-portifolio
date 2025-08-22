import styles from './Tag.module.css';

type TagProps = {
  label: string;
  className?: string;
}

const Tag = ({ label, className }: TagProps) => {
  const combinedClass = [styles.tag, className].filter(Boolean).join(' ');
  return (
    <span className={combinedClass}>
      {label}
    </span>
  );
};

export default Tag;
