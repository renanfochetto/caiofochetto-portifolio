import styles from './CaseCard.module.css';
import Tag from "../Tag/Tag.tsx";

type CaseCardProps = {
  image: string;
  alt: string;
  id?: number;
  projeto: string;
  tags: {
    label: string[];
    cor: string[];
  }
}

const CaseCard = ({ image, alt, projeto, tags }: CaseCardProps) => {
  return (
<div className={styles.caseCard}>
  <img src={image} alt={alt}/>
  <div className={styles.tagList}>
    {tags.label.map((label, index) => (
      <Tag key={index} label={label} color={tags.cor[index]} />
    ))}
  </div>
  <div className={styles.labelCard}>
    <div className={styles.labelProject}>
      <h5>{projeto}</h5>
    </div>
  </div>
</div>
  )
}

export default CaseCard;
