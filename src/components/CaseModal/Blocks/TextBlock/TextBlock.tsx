import styles from './TextBlock.module.css';

export type TextBlockProps = {
    title: string;
    paragraph: string[];
};

const TextBlock = ({ title, paragraph }: TextBlockProps) => {
    return (
        <div
          className={styles.textBlock}
          role="region"
          aria-label={title}
        >
            <h5>{title}</h5>
            {paragraph.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    );
};

export default TextBlock;
