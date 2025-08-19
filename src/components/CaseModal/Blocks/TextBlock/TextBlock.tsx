import styles from './TextBlock.module.css';

export type TextBlockProps = {
  title: string;
  paragraph: string;
}

const TextBlock = ( { title, paragraph }: TextBlockProps) => {
  return (
    <div className={styles.textBlock}>
      <h5>{title}</h5>
      <p>{paragraph}</p>
    </div>
  );
};

export default TextBlock;
