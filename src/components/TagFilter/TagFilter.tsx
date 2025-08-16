import styles from './TagFilter.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import { useState } from 'react';
import Tag from '../Tag/Tag.tsx';

type TagData = {
  label: string;
  color: string;
}

type TagsMap = {
  [key: string]: TagData;
}

type TagFilterProps = {
  onFilterChange: (selectedTags: string[]) => void;
}

const TagFilter = ({ onFilterChange }: TagFilterProps) => {
  const content = useLocalizedContent();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  if (!content?.cases?.tags) return null;

  const tags = content.cases.tags as TagsMap;

  const handleTagClick = (tagKey: string) => {
    const updatedTags = selectedTags.includes(tagKey)
    ? selectedTags.filter(t => t !== tagKey)
      : [...selectedTags, tagKey];

    setSelectedTags(updatedTags);
    onFilterChange(updatedTags);
  }

  return (
    <div className={styles.tagFilter}>
      {Object.entries(tags).map(([key, { label, color }]) => (
        <div
          key={key}
        onClick={() => handleTagClick(key)}
        className={`${styles.tagWrapper} ${selectedTags.includes(key) ? styles.active : ''}`}
        >
          <Tag label={label} color={color} />
        </div>
      ))}
    </div>

  )
}

export default TagFilter;
