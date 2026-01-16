import React from 'react';
import styles from './styles.module.css';

interface DownloadItem {
    title: string;
    description: string;
    fileType: 'JAR' | 'ZIP';
    artifactPath: string;
    fileName: string;
}

interface FlowerDocsDownloadsProps {
    version: string;
    arenderVersion?: string;
}

const FlowerDocsDownloads: React.FC<FlowerDocsDownloadsProps> = ({
    version,
    arenderVersion = "2023.15.0"
}) => {
    const baseUrl = "https://artifactory.arondor.cloud/artifactory/arondor-release";

    const downloadItems: DownloadItem[] = [
        {
            title: "FlowerDocs GUI",
            description: "Interface graphique",
            fileType: "JAR",
            artifactPath: "com/flower/docs/gui/flower-docs-gui-webapp",
            fileName: `flower-docs-gui-webapp-${version}.jar`
        },
        {
            title: "FlowerDocs Core",
            description: "Coeur de l'application exposant des web services",
            fileType: "JAR",
            artifactPath: "com/flower/docs/core/flower-docs-core-webapp",
            fileName: `flower-docs-core-webapp-${version}.jar`
        },
        {
            title: "FlowerDocs CLM",
            description: "Interagir avec FlowerDocs en ligne de commandes",
            fileType: "JAR",
            artifactPath: "com/flower/docs/core/flower-docs-clm",
            fileName: `flower-docs-clm-${version}-bundle.jar`
        },
        {
            title: "FlowerDocs default template",
            description: "Template par défaut de FlowerDocs",
            fileType: "ZIP",
            artifactPath: "com/flower/docs/flower-templates",
            fileName: `flower-templates-${version}-package.zip`
        },
        {
            title: "Connecteur ARender FlowerDocs",
            description: "Connecteur ARender pour FlowerDocs",
            fileType: "JAR",
            artifactPath: "com/flower/docs/arender/flower-docs-arender-hmi",
            fileName: `flower-docs-arender-hmi-${version}.jar`
        },
        {
            title: "ARender HMI",
            description: "Interface graphique de la visionneuse",
            fileType: "JAR",
            artifactPath: "com/arondor/arender/arondor-arender-hmi-spring-boot",
            fileName: `arondor-arender-hmi-spring-boot-${arenderVersion}.jar`
        },
        {
            title: "ARender Rendition Server",
            description: "Moteur de rendition de la visionneuse",
            fileType: "ZIP",
            artifactPath: "com/arondor/arender/micro/services/rendition-engine-package",
            fileName: `rendition-engine-package-${arenderVersion}.zip`
        },
        {
            title: "Solution GEC",
            description: "Gestion Electronique de Courriers",
            fileType: "ZIP",
            artifactPath: "com/arondor/flower/gec/flower-gec-packaging",
            fileName: `flower-gec-packaging-${version}-package-client.zip`
        },
        {
            title: "Solution eProcess",
            description: "Automatisation de processus métier",
            fileType: "ZIP",
            artifactPath: "com/arondor/flower/env/e-enveloppe-packaging",
            fileName: `e-enveloppe-packaging-${version}-package-client.zip`
        }
    ];

    const getDownloadUrl = (item: DownloadItem) => {
        const itemVersion = item.title.includes("ARender") && !item.title.includes("Connecteur")
            ? arenderVersion
            : version;
        return `${baseUrl}/${item.artifactPath}/${itemVersion}/${item.fileName}`;
    };

    const getSha256Url = (item: DownloadItem) => {
        return `${getDownloadUrl(item)}.sha256`;
    };

    return (
        <div className={styles.downloadsSection}>
            <h2 className={styles.downloadsTitle}>Downloads</h2>

            {downloadItems.map((item, index) => (
                <React.Fragment key={index}>
                    <div className={styles.downloadItem}>
                        <div className={styles.downloadInfo}>
                            <h6 className={styles.downloadTitle}>{item.title}</h6>
                            <p className={styles.downloadDescription}>{item.description}</p>
                        </div>
                        <div className={styles.downloadButtons}>
                            <a
                                href={getSha256Url(item)}
                                className={styles.downloadButton}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Sha256
                            </a>
                            <a
                                href={getDownloadUrl(item)}
                                className={`${styles.downloadButton} ${styles.downloadButtonPrimary}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.fileType}
                            </a>
                        </div>
                    </div>
                    {index < downloadItems.length - 1 && <hr className={styles.divider} />}
                </React.Fragment>
            ))}

            <div className={styles.otherVersions}>
                <a
                    href="/uxodocs/releases?product=flowerdocs"
                    className={styles.otherVersionsLink}
                >
                    Other versions
                </a>
            </div>
        </div>
    );
};

export default FlowerDocsDownloads;
