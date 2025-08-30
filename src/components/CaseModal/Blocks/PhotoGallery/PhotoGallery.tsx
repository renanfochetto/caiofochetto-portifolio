import styles from './PhotoGallery.module.css';

type PhotoGalleryProps = {
  images: { src: string; alt?: string }[];
  layout: string;
  description?: string;
};

const PhotoGallery = ({ images, layout, description }: PhotoGalleryProps) => {
  const layoutClass = styles[`layout--${layout}`] || '';

  return (
    <>
      <div className={layoutClass}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            alt={img.alt || `Imagem ${i + 1}`}
          />
        ))}
      </div>
      {description && <span className={styles.description}>{description}</span>}
    </>
  );
};

export default PhotoGallery;
