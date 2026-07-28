import React from 'react';
import styles from '../FlowerDocsDownloads/styles.module.css';

interface FlowerDocsMcpDownloadProps {
    version: string;
}

const FlowerDocsMcpDownload: React.FC<FlowerDocsMcpDownloadProps> = ({ version }) => {
    const baseUrl = "https://artifactory.arondor.cloud/artifactory/arondor-release";
    const artifactPath = "com/flower/docs/flower-docs-mcp-server";
    const fileName = `flower-docs-mcp-server-${version}.jar`;
    const downloadUrl = `${baseUrl}/${artifactPath}/${version}/${fileName}`;
    const sha256Url = `${downloadUrl}.sha256`;

    return (
        <div className={styles.downloadsSection}>
            <h2 className={styles.downloadsTitle}>Downloads</h2>

            <div className={styles.downloadItem}>
                <div className={styles.downloadInfo}>
                    <h6 className={styles.downloadTitle}>FlowerDocs MCP Server</h6>
                    <p className={styles.downloadDescription}>
                        MCP server exposing FlowerDocs administration and configuration as tools
                    </p>
                </div>
                <div className={styles.downloadButtons}>
                    <a
                        href={sha256Url}
                        className={styles.downloadButton}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Sha256
                    </a>
                    <a
                        href={downloadUrl}
                        className={`${styles.downloadButton} ${styles.downloadButtonPrimary}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        JAR
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FlowerDocsMcpDownload;
