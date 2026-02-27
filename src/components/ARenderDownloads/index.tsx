import React from 'react';
import styles from './styles.module.css';

interface DownloadItem {
    title: string;
    description: string;
    fileType: 'JAR' | 'ZIP' | 'EAR' | 'WAR';
    artifactPath: string;
    fileName: string;
}

interface ARenderDownloadsProps {
    version: string;
}

const ARenderDownloads: React.FC<ARenderDownloadsProps> = ({
    version
}) => {
    const baseUrl = "https://artifactory.arondor.cloud/artifactory/arondor-release";

    const downloadItems: DownloadItem[] = [
        {
            title: "ARender Rendition",
            description: "ARender backend application installer",
            fileType: "JAR",
            artifactPath: "com/arondor/arender/micro/services/rendition-engine-installer",
            fileName: `rendition-engine-installer-${version}-rendition.jar`
        },
        {
            title: "ARender Web-UI",
            description: "ARender frontend application (Spring Boot)",
            fileType: "ZIP",
            artifactPath: "com/arondor/arender/arondor-arender-hmi-spring-boot-package",
            fileName: `arondor-arender-hmi-spring-boot-package-${version}.zip`
        },
        {
            title: "ARender HMI FileNet 5.x",
            description: "J2EE EAR application for FileNet",
            fileType: "EAR",
            artifactPath: "com/arondor/arender/arondor-arender-hmi-filenet-ear",
            fileName: `arondor-arender-hmi-filenet-ear-${version}.ear`
        },
        {
            title: "ARender HMI Content Manager 8.1",
            description: "J2EE WAR application for FileNet",
            fileType: "WAR",
            artifactPath: "com/arondor/arender/arondor-arender-hmi-cm",
            fileName: `arondor-arender-hmi-cm-${version}.war`
        },
        {
            title: "ARender Plugin for FileNet",
            description: "IBM Content Navigator plugin",
            fileType: "JAR",
            artifactPath: "com/arondor/arender/arondor-arender-navigator-plugin",
            fileName: `arondor-arender-navigator-plugin-${version}.jar`
        },
        {
            title: "ARender Plugin for Alfresco",
            description: "Alfresco Share plugin",
            fileType: "JAR",
            artifactPath: "com/arondor/arender/arender-for-alfresco-share-plugin",
            fileName: `arender-for-alfresco-share-plugin-${version}.jar`
        },
        {
            title: "ARender Plugin for Alfresco ADF",
            description: "Alfresco ADF plugin base for integration in ADF",
            fileType: "ZIP",
            artifactPath: "com/arondor/arender/arender-for-alfresco-ADF-plugin",
            fileName: `arender-for-alfresco-ADF-plugin-${version}.zip`
        },
        {
            title: "ARender API",
            description: "ARender Client API",
            fileType: "JAR",
            artifactPath: "com/arondor/arender/arondor-arender-client-api",
            fileName: `arondor-arender-client-api-${version}-javadoc.jar`
        },
        {
            title: "ARender API",
            description: "ARender Rendition API",
            fileType: "JAR",
            artifactPath: "com/arondor/arender/arondor-arender-rendition-api",
            fileName: `arondor-arender-rendition-api-${version}-javadoc.jar`
        }
    ];

    const getDownloadUrl = (item: DownloadItem) => {
        const itemVersion = version;
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
                    href="/releases?product=arender"
                    className={styles.otherVersionsLink}
                >
                    Other versions
                </a>
            </div>
        </div>
    );
};

export default ARenderDownloads;
