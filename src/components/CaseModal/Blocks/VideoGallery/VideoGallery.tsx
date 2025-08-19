import styles from './VideoGallery.module.css';

type VideoGalleryProps = {
  videos: string[];
}

const VideoGallery = ( { videos }: VideoGalleryProps) => {
  return (
    <div className={styles.videoGrid}>
      {videos.map((url, i) => (
        <div
          key={i}
          className={styles.videoWrapper}
        >
          <iframe
            src={url.replace('watch?v=', 'embed/')}
            title={`Vídeo ${i + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
        </div>
      ))}
    </div>
  );
};

export default VideoGallery;
