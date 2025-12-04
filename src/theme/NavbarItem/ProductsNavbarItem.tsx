import React, { useState } from 'react';
import ProductModal from '@site/src/components/ProductModal';
import styles from './styles.module.css';

export default function ProductsNavbarItem() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                className={styles.productsButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Open products menu"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.icon}
                >
                    <path
                        d="M3 6h18M3 12h18M3 18h18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
                <span className={styles.buttonText}>Products</span>
            </button>
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}
