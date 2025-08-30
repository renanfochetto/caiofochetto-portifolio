import styles from './VideoGallery.module.css';

type VideoGalleryProps = {
    videos: string[];
    layout: string;
    description?: string;
};

const VideoGallery = ({ videos, layout, description }: VideoGalleryProps) => {
    const layoutClass = layout ? styles[`layout--${layout}`] : styles.videoGrid;

    return (
        <>
            <div className={layoutClass}>
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
