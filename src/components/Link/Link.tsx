import styles from './Link.module.css';
import * as React from 'react';

type PropsLink = {
    href: string;
    icon?: string;
    alt?: string;
    children?: React.ReactNode;
    className?: string;
};

const Link = ({ href, icon, alt, children, className }: PropsLink) => {
    return (
        <a
            className={`${styles.links} ${className || ''}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {icon && (
                <img
                    className={styles.icon}
                    src={icon}
                    alt={alt}
                />
            )}
            {children}
        </a>
    );
};

export default Link;
