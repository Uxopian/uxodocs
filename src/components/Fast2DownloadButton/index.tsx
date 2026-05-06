import React from "react";
import styles from "./styles.module.css";

interface Fast2DownloadButtonProps {
    version: string;
}

export default function Fast2DownloadButton({ version }: Fast2DownloadButtonProps) {
    const cleanVersion = version.replace(/^v/, "").trim();
    if (!cleanVersion) return null;
    const href = `https://downloads.uxopian.com/?product=fast2&version=${encodeURIComponent(cleanVersion)}`;

    return (
        <div className={styles.wrapper}>
            <a
                href={href}
                className={styles.button}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Download Fast2 v${cleanVersion}`}
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
                <span className={styles.label}>Download Fast2 v{cleanVersion}</span>
            </a>
        </div>
    );
}
