import styles from './PhotoGallery.module.css';

type PhotoGalleryProps = {
  images: { src: string; alt?: string }[];
}

const PhotoGallery = ( { images }: PhotoGalleryProps) => {
  return (
    <div className={styles.imageGrid}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt || `Imagem ${i + 1}`}
          className={styles.image}
        />
      ))}
    </div>
  );
};

export default PhotoGallery;
