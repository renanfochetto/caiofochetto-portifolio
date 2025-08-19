import styles from './QuoteBlock.module.css';

export type QuoteBlockProps = {
  quote: string;
}

const QuoteBlock = ({ quote }: QuoteBlockProps) => {
  return (
    <div className={styles.quoteBlock}>
      <p>{quote}</p>
    </div>
  );
};

export default QuoteBlock;
