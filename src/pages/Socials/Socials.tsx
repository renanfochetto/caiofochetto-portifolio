import styles from './Socials.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import Link from '../../components/Link/Link.tsx';
import { useEffect, useState } from 'react';


const getPreviewSrc = (
  item: {
    preview: { desktop: string; mobile: string };
    id: string;
  },
  type: 'mobile' | 'desktop' | 'mixed',
) => {
  if (type === 'mobile') return item.preview.mobile;
  if (type === 'desktop') return item.preview.desktop;
  return item.id === 'youtube' ? item.preview.desktop : item.preview.mobile;
};

const getImageClass = (
  id: string,
  type: 'mobile' | 'desktop' | 'mixed',
) => {
  if (type === 'mixed') {
    if (id === 'linkedin') return styles.linkedinMobile;
    if (id === 'youtube') return styles.youtubeDesktop;
  }

  if (type === 'mobile') {
    if (id === 'linkedin') return styles.linkedinMobile;
    if (id === 'youtube') return styles.youtubeMobile;
  }

  if (type === 'desktop') {
    if (id === 'linkedin') return styles.linkedinDesktop;
    if (id === 'youtube') return styles.youtubeDesktop;
  }

  return '';
};


const usePreviewType = () => {
    const [previewType, setPreviewType] = useState<
        'mobile' | 'desktop' | 'mixed' | null
    >(null);

    useEffect(() => {
        const calcType = () => {
            const isPortrait = window.matchMedia(
                '(orientation: portrait)',
            ).matches;
            const isSmallScreen =
                window.matchMedia('(max-width: 500px)').matches;
            const isLargeScreen = window.matchMedia(
                '(min-width: 1800px)',
            ).matches;

            if (isPortrait || isSmallScreen) return 'mobile';
            if (isLargeScreen) return 'desktop';
            return 'mixed';
        };

        setPreviewType(calcType());

        // opcional: reagir a resize
        const onResize = () => setPreviewType(calcType());
        window.addEventListener('resize', onResize);
        window.addEventListener('orientationchange', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('orientationchange', onResize);
        };
    }, []);

    return previewType;
};

export const Socials = () => {
    const content = useLocalizedContent();
    const previewType = usePreviewType();

    if (!content || !previewType) return null;

    return (
        <section
            id="social"
            className={styles.container}
            aria-label={content.accessibility.socials}
        >
            <div className={styles.titleSection}>
                <h3>{content?.socials?.pagina}</h3>
            </div>
            <div className={styles.socialsGrid}>
              {content.socials.items.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.header}>
                    <Link
                      className={styles.linkSocial}
                      href={item.href}
                      icon={item.icon}
                      alt={`Ícone de ${item.name}`}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </div>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.previewLink}
                  >
                    <img
                      src={getPreviewSrc(item, previewType)}
                      className={`${styles.previewImage} ${getImageClass(item.id, previewType)}`}
                      alt={item.alt}
                    />
                  </a>
                </div>
              ))}
            </div>
        </section>
    );
};
