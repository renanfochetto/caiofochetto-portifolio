import styles from './Socials.module.css';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import Link from '../../components/Link/Link.tsx';
import { useEffect, useState } from 'react';

const links = [
    {
        name: 'LINKEDIN',
        icon: '/icons/linkedin.svg',
        href: 'https://www.linkedin.com/in/caiofochetto/',
        preview: {
            desktop: '/socials/linkedin-desktop.avif',
            mobile: '/socials/linkedin-mobile.avif',
        },
    },
    {
        name: 'YOUTUBE',
        icon: '/icons/youtube.svg',
        href: 'https://www.youtube.com/@caiofochetto/playlists',
        preview: {
            desktop: '/socials/youtube-desktop.avif',
            mobile: '/socials/youtube-mobile.avif',
        },
    },
];

const getPreviewSrc = (
    link: (typeof links)[number],
    type: 'mobile' | 'desktop' | 'mixed',
) => {
    if (type === 'mobile') return link.preview.mobile;
    if (type === 'desktop') return link.preview.desktop;

    // mixed
    return link.name === 'YOUTUBE' ? link.preview.desktop : link.preview.mobile;
};

const getImageClass = (
    linkName: string,
    type: 'mobile' | 'desktop' | 'mixed',
) => {
    if (type === 'mixed') {
        if (linkName === 'LINKEDIN') return styles.linkedinMobile;
        if (linkName === 'YOUTUBE') return styles.youtubeDesktop;
    }

    if (type === 'mobile') {
        if (linkName === 'LINKEDIN') return styles.linkedinMobile;
        if (linkName === 'YOUTUBE') return styles.youtubeMobile;
    }

    if (type === 'desktop') {
        if (linkName === 'LINKEDIN') return styles.linkedinDesktop;
        if (linkName === 'YOUTUBE') return styles.youtubeDesktop;
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
            aria-label="Seção de redes sociais de Caio Fochetto"
        >
            <div className={styles.titleSection}>
                <h3>{content?.socials?.pagina}</h3>
            </div>
            <div className={styles.socialsGrid}>
                {links.map((link) => (
                    <div
                        key={link.name}
                        className={styles.card}
                    >
                        <div className={styles.header}>
                            <Link
                                className={styles.linkSocial}
                                href={link.href}
                                icon={link.icon}
                                alt={`Ícone de ${link.name}`}
                            >
                                <span>{link.name}</span>
                            </Link>
                        </div>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.previewLink}
                      >
                        <img
                            src={getPreviewSrc(link, previewType)}
                            className={`${styles.previewImage} ${getImageClass(link.name, previewType)}`}
                            alt={`Preview do perfil de Caio Fochetto no ${link.name}`}
                        />
                      </a>
                    </div>
                ))}
            </div>
        </section>
    );
};
