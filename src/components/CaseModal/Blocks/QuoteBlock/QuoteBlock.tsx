import styles from './QuoteBlock.module.css';

export type QuoteBlockProps = {
    quote: string[];
};

const QuoteBlock = ({ quote }: QuoteBlockProps) => {
    return (
        <div className={styles.quoteBlock}>
            {quote.map((q, i) => (
                <p key={i}>{q}</p>
            ))}
        </div>
    );
};

export default QuoteBlock;
