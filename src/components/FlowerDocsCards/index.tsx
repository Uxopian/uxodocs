import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router";
import styles from "./styles.module.css";
import UXopianFeed from "./UXopianFeed";

const FlowerDocsCardsList = [
    {
        title: "Concepts",
        icon: "💡",
        description: "Getting to grips with the platform's general concepts",
        link: "/docs/flowerdocs/concepts/getting-started",
        color: "#6c5ce7",
    },
    {
        title: "Installation",
        icon: "🔧",
        description: "Installing & deploying the platform",
        link: "/docs/flowerdocs/install/getting-started",
        color: "#fd79a8",
    },
    {
        title: "FlowerDocs Academy",
        icon: "🎓",
        description: "Find out more about FlowerDocs through training modules",
        link: "/docs/flowerdocs/learn/admin-hide-menu/getting-started",
        color: "#00b894",
    },
];

const GuidesList = [
    {
        title: "Guides",
        description: "Manage your platform with guides",
        items: [
            {
                icon: "🖥️",
                title: "Graphical user interface",
                description: "FlowerDocs GUI customisation",
                link: "/docs/flowerdocs/config/gui/getting-started",
            },
            {
                icon: "🛠️",
                title: "Administration",
                description: "Administering and configuring FlowerDocs Core",
                link: "/docs/flowerdocs/config/core/component-identifier",
            },
            {
                icon: "👁️",
                title: "Operation",
                description: "Operating & Supervising your platform",
                link: "/docs/flowerdocs/config/exploit/actuator",
            },
        ],
        color: "#0984e3",
    },
    {
        title: "Development",
        description: "FlowerDocs APIs at your disposal",
        items: [
            {
                icon: "🔌",
                title: "JS plugins",
                description: "Enriching the interface with your own scripts",
                link: "/docs/flowerdocs/apis/plugins/getting-started",
            },
            {
                icon: "📡",
                title: "JSAPI",
                description: "Enriching the interface with your own scripts",
                link: "/docs/flowerdocs/apis/jsapi/getting-started",
            },
            {
                icon: "⚙️",
                title: "Core APIs",
                description: "Consuming the FlowerDocs Core service layer",
                link: "/docs/flowerdocs/apis/core/intro",
            },
        ],
        color: "#6c5ce7",
    },
];

const ConnectorsList = [
    {
        title: "FlowerDocs Companion",
        logo: "/img/flowerdocs/documentation/microsoft.png",
        description:
            "Injecting documents into FlowerDocs from the Microsoft Office suite",
        link: "/docs/flowerdocs/connecteurs/companion/install",
    },
    {
        title: "Plume",
        logo: "/img/flowerdocs/documentation/plume.png",
        description: "Writing emails from FlowerDocs",
        link: "/docs/flowerdocs/connecteurs/plume/getting-started",
    },
    {
        title: "Fast2",
        logo: "/img/flowerdocs/documentation/fast2.png",
        description: "ETL Documentary",
        link: "/docs/flowerdocs/connecteurs/fast2/getting-started",
    },
];

function FlowerDocsCard({ title, icon, description, link, color }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.icon} style={{ color }}>
                    {icon}
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div className={styles.underline} style={{ backgroundColor: color }}></div>
            </div>
            <p className={styles.cardDescription}>{description}</p>
            <Link className={styles.cardLink} to={link} style={{ color }}>
                Discover →
            </Link>
        </div>
    );
}

function GuidesCard({ title, description, items, color }) {
    return (
        <div className={styles.guidesCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div className={styles.underline} style={{ backgroundColor: color }}></div>
            </div>
            <p className={styles.cardDescription}>{description}</p>

            <div className={styles.itemsList}>
                {items.map((item, idx) =>
                    item.link ? (
                        <Link key={idx} to={item.link} className={styles.guideItem}>
                            <div className={styles.guideIcon} style={{ color }}>
                                {item.icon}
                            </div>
                            <div className={styles.guideContent}>
                                <h4 className={styles.guideTitle}>{item.title}</h4>
                                <p className={styles.guideDescription}>{item.description}</p>
                            </div>
                        </Link>
                    ) : (
                        <div key={idx} className={styles.guideItem}>
                            <div className={styles.guideIcon} style={{ color }}>
                                {item.icon}
                            </div>
                            <div className={styles.guideContent}>
                                <h4 className={styles.guideTitle}>{item.title}</h4>
                                <p className={styles.guideDescription}>{item.description}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

function ConnectorCard({ title, logo, description, link }) {
    const logoUrl = useBaseUrl(logo);

    return (
        <Link to={link} className={styles.connectorCard}>
            <div className={styles.connectorIcon}>
                <img src={logoUrl} alt={`${title} logo`} />
            </div>
            <h4 className={styles.connectorTitle}>{title}</h4>
            <p className={styles.connectorDescription}>{description}</p>
        </Link>
    );
}

// Helper function to detect version and adjust links
function useVersionAwareLinks() {
    const { pathname } = useLocation();

    // Detect if we're on a versioned path like /docs/flowerdocs/v2.8-LTS/flowerdocs/
    const versionMatch = pathname.match(/\/docs\/([^\/]+)\/(v[\d.-]+[^\/]*)\//);

    if (versionMatch) {
        const product = versionMatch[1];
        const version = versionMatch[2];
        const versionPrefix = `/${product}/${version}/${product}`;

        return (link: string) => {
            // Replace /docs/flowerdocs/ with /docs/flowerdocs/v2.8-LTS/flowerdocs/
            const pathMatch = link.match(/\/docs\/[^\/]+\/(.*)/);
            if (pathMatch) {
                return `/docs${versionPrefix}/${pathMatch[1]}`;
            }
            return link;
        };
    }

    // No version detected, return links as-is
    return (link: string) => link;
}

export default function FlowerDocsCards() {
    const adjustLink = useVersionAwareLinks();

    // Adjust all links based on current version
    const versionAwareFlowerDocsCards = FlowerDocsCardsList.map(card => ({
        ...card,
        link: adjustLink(card.link)
    }));

    const versionAwareGuidesList = GuidesList.map(guide => ({
        ...guide,
        items: guide.items.map(item => ({
            ...item,
            link: item.link ? adjustLink(item.link) : undefined
        }))
    }));

    const versionAwareConnectorsList = ConnectorsList.map(connector => ({
        ...connector,
        link: adjustLink(connector.link)
    }));

    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <div className={styles.cardsGrid}>
                            {versionAwareFlowerDocsCards.map((props, idx) => (
                                <FlowerDocsCard key={idx} {...props} />
                            ))}
                        </div>

                        <div className={styles.guidesGrid}>
                            {versionAwareGuidesList.map((props, idx) => (
                                <GuidesCard key={idx} {...props} />
                            ))}
                        </div>

                        <div className={styles.connectorsSection}>
                            <div className={styles.connectorsSectionHeader}>
                                <h2 className={styles.connectorsTitle}>Connectors</h2>
                                <p className={styles.connectorsSubtitle}>
                                    Configuring the connector used
                                </p>
                            </div>
                            <div className={styles.connectorsGrid}>
                                {versionAwareConnectorsList.map((props, idx) => (
                                    <ConnectorCard key={idx} {...props} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <aside className={styles.rightColumn} aria-label="UXopian blog preview">
                        <UXopianFeed />
                    </aside>
                </div>
            </div>
        </section>
    );
}
