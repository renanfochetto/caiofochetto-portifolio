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
            <div
              className={layoutClass}
              role="region"
              aria-label={images.length > 1 ? 'Galeria de Imagens' : 'Galeria de Imagem'}
            >
                {images.map((img, i) => (
                    <img
                        key={i}
                        src={img.src}
                        alt={img.alt || `Imagem ${i + 1}`}
                    />
                ))}
            </div>
            {description && (
                <span className={styles.description}>{description}</span>
            )}
        </>
    );
};

export default PhotoGallery;
