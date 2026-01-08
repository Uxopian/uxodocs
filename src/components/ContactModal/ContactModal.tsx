import React from 'react';
import styles from './styles.module.css';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps): React.JSX.Element | null {

    // IMPORTANT: useEffect doit être AVANT le return null pour restaurer le scroll
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    onClose();
                }
            };
            document.addEventListener('keydown', handleKeyDown);
            return () => {
                document.body.style.overflow = '';
                document.removeEventListener('keydown', handleKeyDown);
            };
        } else {
            // S'assurer que le scroll est restauré même si la modal se ferme
            document.body.style.overflow = '';
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleEscapeKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className={styles.modalOverlay}
            onClick={handleOverlayClick}
            onKeyDown={handleEscapeKey}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
        >
            <div className={styles.modalContent}>
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close contact form"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <h2 id="contact-modal-title" className={styles.visuallyHidden}>Contact Us</h2>

                <iframe
                    src="https://www.uxopian.com/en/contact-us"
                    className={styles.iframe}
                    title="Contact Form"
                    loading="lazy"
                    sandbox="allow-scripts allow-forms allow-same-origin"
                />
            </div>
        </div>
    );
}
