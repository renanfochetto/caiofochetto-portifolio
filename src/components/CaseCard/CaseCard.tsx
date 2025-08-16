import styles from './CaseCard.module.css';
import {useLocalizedContent} from '../../hooks/useLocalizedContent.ts';
import Tag from '../Tag/Tag.tsx';

type CaseCardProps = {
  image: string;
  alt: string;
  id?: number;
  projeto: string;
  tagKeys: string[]
}

const CaseCard = ({image, alt, projeto, tagKeys}: CaseCardProps) => {
  const content = useLocalizedContent();
  const tagData = content?.cases?.tags;

  return (
    <div className={styles.caseCard}>
      <img src={image} alt={alt}/>
      <div className={styles.tagList}>
        {
          tagKeys.map((key, index) => {
            const tag = tagData?.[key];
            if (!tag) return null;
            return <Tag key={index} label={tag.label} color={tag.color} />;
          })
        }
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
