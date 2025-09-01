import styles from './CaseModal.module.css';
import type { CaseData, CaseBlock } from '../../types';
import { useRef, useEffect } from 'react';
import { buildAssetPath } from '../../utils/path.ts';
import QuoteBlock from './Blocks/QuoteBlock/QuoteBlock.tsx';
import TextBlock from './Blocks/TextBlock/TextBlock.tsx';
import VideoGallery from './Blocks/VideoGallery/VideoGallery.tsx';
import PhotoGallery from './Blocks/PhotoGallery/PhotoGallery.tsx';
import Tag from '../Tag/Tag.tsx';
import { createPortal } from 'react-dom';
import { useLocalizedContent } from '../../hooks/useLocalizedContent.ts';
import { FocusTrap } from 'focus-trap-react';

export type CaseModalProps = {
    caseData: CaseData | null;
    tagData: Record<string, { label: string }>;
    onClose: () => void;
};

export const CaseModal = ({ caseData, tagData, onClose }: CaseModalProps) => {
    const content = useLocalizedContent();
    const modalRef = useRef<HTMLDivElement>(null);

    // ESC para fechar
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Bloquear scroll enquanto modal aberto
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!caseData || !content?.cases?.modalFooter) return null;
    const modalFooter = content.cases.modalFooter;
    const { nome, empresa, cargo, ano, tags, logos, blocks, folder } = caseData;

    const renderBlock = (block: CaseBlock, index: number) => {
        switch (block.type) {
            case 'text':
                return (
                    <TextBlock
                        key={index}
                        title={block.title}
                        paragraph={block.paragraph}
                    />
                );
            case 'quote':
                return (
                    <QuoteBlock
                        key={index}
                        quote={block.paragraph}
                    />
                );
            case 'photoGallery':
                return (
                    <PhotoGallery
                        key={index}
                        images={block.files.map((file, i) => ({
                            src: buildAssetPath(folder, file),
                            alt: block.alt?.replace('{{index}}', String(i + 1)) || `Imagem ${i + 1}`
                        }))}
                        layout={block.layout}
                        description={block.description}
                    />
                );
            case 'videoGallery':
                return (
                    <VideoGallery
                        key={index}
                        videos={block.links}
                        layout={block.layout}
                        description={block.description}
                    />
                );
            default:
                return null;
        }
    };

    return createPortal(
        <div
            className={styles.modalOverlay}
            role="presentation"
            onClick={onClose}
        >
            <FocusTrap
                focusTrapOptions={{
                    clickOutsideDeactivates: true,
                    initialFocus: () =>
                        modalRef.current?.querySelector('button') ||
                        modalRef.current!,
                    fallbackFocus: () => modalRef.current!,
                }}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={`modal-title-${nome}`}
                    ref={modalRef}
                    className={styles.modal}
                    tabIndex={-1}
                    onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
                >
                    {/* Botão de fechar */}
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label={content.accessibility.botaoFechar}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 72 72"
                            width="64px"
                            height="64px"
                        >
                            <path d="M19 15C17.977 15 16.951875 15.390875 16.171875 16.171875C14.609875 17.733875 14.609875 20.266125 16.171875 21.828125L30.34375 36L16.171875 50.171875C14.609875 51.733875 14.609875 54.266125 16.171875 55.828125C16.951875 56.608125 17.977 57 19 57C20.023 57 21.048125 56.609125 21.828125 55.828125L36 41.65625L50.171875 55.828125C51.731875 57.390125 54.267125 57.390125 55.828125 55.828125C57.391125 54.265125 57.391125 51.734875 55.828125 50.171875L41.65625 36L55.828125 21.828125C57.390125 20.266125 57.390125 17.733875 55.828125 16.171875C54.268125 14.610875 51.731875 14.609875 50.171875 16.171875L36 30.34375L21.828125 16.171875C21.048125 15.391875 20.023 15 19 15z" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className={styles.modalHeader}>
                        <div className={styles.infoSection}>
                            <div className={styles.titleSection}>
                                <h5 id={`modal-title-${nome}`}>{nome}</h5>
                            </div>
                            <div className={styles.tagsSection}>
                                {tags.map((key, i) => {
                                    const tag = tagData?.[key];
                                    if (!tag) return null;
                                    return (
                                        <Tag
                                            key={i}
                                            className={styles.tag}
                                            label={tag.label}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.logoSection}>
                            {logos.map((logo, i) => (
                                <img
                                    key={i}
                                    src={buildAssetPath(folder, logo)}
                                    alt=""
                                    aria-hidden="true"
                                    className={styles.logo}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Conteúdo */}
                    <div className={styles.contentBlocks}>
                        {blocks.map((block, index) =>
                            renderBlock(block, index),
                        )}
                    </div>

                    {/* Footer */}
                    <div className={styles.modalFooter}>
                        <div className={styles.techSheet}>
                            <span>
                                <strong>{modalFooter.case}</strong>
                                {nome}
                            </span>
                            <span>
                                <strong>{modalFooter.company}</strong>
                                {empresa}
                            </span>
                            <span>
                                <strong>{modalFooter.role}</strong>
                                {cargo}
                            </span>
                            <span>
                                <strong>{modalFooter.year}</strong>
                                {ano}
                            </span>
                        </div>
                    </div>
                </div>
            </FocusTrap>
        </div>,
        document.body,
    );
};
