import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export type DownloadPortalProduct = "fast2" | "arender" | "flowerdocs";

const PRODUCT_NAMES: Record<DownloadPortalProduct, string> = {
    fast2: "Fast2",
    arender: "ARender",
    flowerdocs: "FlowerDocs",
};

export function getDownloadPortalUrl(product: DownloadPortalProduct, version: string): string {
    const cleanVersion = version.replace(/^v/, "").trim();
    return `https://downloads.uxopian.com/?product=${product}&version=${encodeURIComponent(cleanVersion)}`;
}

interface DownloadPortalButtonProps {
    product: DownloadPortalProduct;
    version: string;
}

export default function DownloadPortalButton({ product, version }: DownloadPortalButtonProps) {
    const cleanVersion = version.replace(/^v/, "").trim();
    if (!cleanVersion) return null;
    const productName = PRODUCT_NAMES[product];

    return (
        <div className={styles.wrapper}>
            <a
                href={getDownloadPortalUrl(product, cleanVersion)}
                className={clsx(styles.button, styles[product])}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download ${productName} v${cleanVersion}`}
            >
                <svg
                    className={styles.icon}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                </svg>
                <span className={styles.label}>
                    Download {productName} v{cleanVersion}
                </span>
            </a>
        </div>
    );
}
