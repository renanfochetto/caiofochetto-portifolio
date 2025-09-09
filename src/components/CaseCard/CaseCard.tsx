import styles from './CaseCard.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import Tag from '../Tag/Tag.tsx';

type CaseCardProps = {
    image: string;
    alt: string;
    id?: number;
    projeto: string;
    tagKeys: string[];
    onClick: () => void;
    className?: string;
};

const CaseCard = ({ image, alt, projeto, tagKeys, onClick, className }: CaseCardProps) => {
    const content = useLocalizedContent();
    const tagData = content?.cases?.tags;

    if (!content) return null;

    const ariaLabel = content?.accessibility.abrirCase
      .replace('{{projeto}}', projeto );

    return (
        <div
          className={`${styles.caseCard} ${className ?? ''}`}
            onClick={onClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={ariaLabel}

        >
            <img
                src={image}
                alt={alt}
                loading="lazy"
            />
            <div className={styles.tagList}>
                {tagKeys.map((key, index) => {
                    const tag = tagData?.[key];
                    if (!tag) return null;
                    return (
                        <Tag
                            key={index}
                            label={tag.label}
                        />
                    );
                })}
            </div>
            <div className={styles.labelCard}>
                <div className={styles.labelProject}>
                    <h5>{projeto}</h5>
                </div>
            </div>
        </div>
    );
};

export default CaseCard;
