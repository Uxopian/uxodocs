import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useDocsVersion } from "@docusaurus/plugin-content-docs/client";
import styles from "./styles.module.css";

interface PDFDownloadButtonProps {
    productId: string;
}

export default function PDFDownloadButton({
    productId,
}: PDFDownloadButtonProps): React.JSX.Element {
    const version = useDocsVersion();

    // Generate PDF path based on product and version
    // PDFs will be generated at build/pdfs/{product}-{version}.pdf
    const pdfPath = useBaseUrl(`/pdfs/${productId}-${version.version}.pdf`);

    return (
        <div className={styles.pdfButtonContainer}>
            <a
                href={pdfPath}
                className={styles.pdfButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download documentation as PDF"
            >
                <svg
                    className={styles.pdfIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16Z"
                        fill="currentColor"
                    />
                    <path
                        d="M6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99933 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z"
                        fill="currentColor"
                    />
                </svg>
                <span>Download as PDF</span>
            </a>
        </div>
    );
}
