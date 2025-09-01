import styles from './VideoGallery.module.css';
import { useLocalizedContent } from '../../../../hooks/useLocalizedContent.ts';

type VideoGalleryProps = {
    videos: string[];
    layout: string;
    description?: string;
};

const VideoGallery = ({ videos, layout, description }: VideoGalleryProps) => {
  const content = useLocalizedContent();
  const layoutClass = layout ? styles[`layout--${layout}`] : styles.videoGrid;

  if (!content) return null;

    return (
        <>
            <div
              className={layoutClass}
              role="region"
              aria-label={videos.length > 1 ? content.accessibility.videoPlural : content.accessibility.videoSingular}
            >
                {videos.map((url, i) => (
                    <div
                        key={i}
                        className={styles.videoWrapper}
                    >
                        <iframe
                            src={url.replace('watch?v=', 'embed/')}
                            title={`Vídeo ${i + 1}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.video}
                            tabIndex={0}
                        />
                    </div>
                ))}
            </div>
            {description && (
                <span className={styles.description}>{description}</span>
            )}
        </>
    );
};

export default VideoGallery;
