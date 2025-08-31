import styles from './TagFilter.module.css';
import tagStyles from '../Tag/Tag.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import { useState } from 'react';
import Tag from '../Tag/Tag.tsx';

type TagData = {
    label: string;
};

type TagsMap = {
    [key: string]: TagData;
};

type TagFilterProps = {
    onFilterChange: (selectedTags: string[]) => void;
};

const TagFilter = ({ onFilterChange }: TagFilterProps) => {
    const content = useLocalizedContent();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    if (!content?.cases?.tags) return null;

    const tags = content.cases.tags as TagsMap;

    const handleTagClick = (tagKey: string) => {
        const updatedTags = selectedTags.includes(tagKey)
            ? selectedTags.filter((t) => t !== tagKey)
            : [...selectedTags, tagKey];

        setSelectedTags(updatedTags);
        onFilterChange(updatedTags);
    };

    return (
        <div className={styles.tagFilter}>
            {Object.entries(tags).map(([key, { label }]) => (
                <button
                    key={key}
                    onClick={() => handleTagClick(key)}
                    className={styles.tagWrapper}
                    type="button"
                    aria-pressed={selectedTags.includes(key)}
                >
                    <Tag
                        label={label}
                        className={
                            selectedTags.includes(key) ? tagStyles.active : ''
                        }
                    />
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
