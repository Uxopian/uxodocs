import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import UXopianFeed from "../FlowerDocsCards/UXopianFeed";

const ARenderCardsList = [
    {
        title: "What is ARender ?",
        icon: "💡",
        description: "Discover ARender and its capabilities",
        link: "what-is-arender/overview",
        color: "#B56BFF",
    },
    {
        title: "Installation",
        icon: "🔧",
        description: "Installing & deploying ARender",
        link: "installation/overview",
        color: "#D745FF",
    },
    {
        title: "Learn",
        icon: "📚",
        description: "Learn how to use ARender through guides and tutorials",
        link: "learn/architecture/overview",
        color: "#735EFC",
    },
];

const GuidesList = [
    {
        title: "Guides",
        description: "Configure and operate your ARender platform",
        items: [
            {
                icon: "⚙️",
                title: "Configurations",
                description: "Configure ARender to meet your needs",
                link: "guides/configurations/rendition/service-broker/",
            },
            {
                icon: "💻",
                title: "Exploitation",
                description: "Operating and managing your platform",
                link: "guides/exploitation/logs",
            },
            {
                icon: "🔄",
                title: "Operation",
                description: "Day-to-day operations and maintenance",
                link: "guides/operation/backup-restore",
            },
            {
                icon: "🔼",
                title: "Upgrade",
                description: "Upgrading your ARender installation",
                link: "guides/upgrade/4.8_to_2023.0/rendition",
            },
        ],
        color: "#0984e3",
    },
    {
        title: "Features",
        description: "Explore ARender's powerful features",
        items: [
            {
                icon: "♿",
                title: "Accessibility",
                description: "Accessibility features for all users",
                link: "features/accessibility",
            },
            {
                icon: "💬",
                title: "Annotations",
                description: "Annotate and collaborate on documents",
                link: "features/annotations",
            },
            {
                icon: "🔖",
                title: "Bookmarks",
                description: "Navigate documents with bookmarks",
                link: "features/bookmarks",
            },
            {
                icon: "🔨",
                title: "Document Builder",
                description: "Build and assemble documents",
                link: "features/documentbuilder",
            },
        ],
        color: "#735EFC",
    },
    {
        title: "Development",
        description: "Extend ARender with APIs and connectors",
        items: [
            {
                icon: "🔌",
                title: "Connector",
                description: "Connect ARender to your systems",
                link: "development/connector/overview",
            },
            {
                icon: "🧩",
                title: "Framework",
                description: "ARender development framework",
                link: "development/framework/overview",
            },
            {
                icon: "📡",
                title: "APIs",
                description: "RESTful and Java APIs",
                link: "development/apis/rendition/rest/admin/version",
            },
        ],
        color: "#B56BFF",
    },
];

function ARenderCard({ title, icon, description, link, color }) {
    return (
        <div className={styles.card}>
            <div className={styles.icon} style={{ color }}>
                {icon}
            </div>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{title}</h3>
            </div>
            <div className={styles.underline} style={{ backgroundColor: color }}></div>
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
            </div>
            <div className={styles.underline} style={{ backgroundColor: color }}></div>
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

export default function ARenderCards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <div className={styles.cardsGrid}>
                            {ARenderCardsList.map((props, idx) => (
                                <ARenderCard key={idx} {...props} />
                            ))}
                        </div>

                        <div className={styles.guidesGrid}>
                            {GuidesList.map((props, idx) => (
                                <GuidesCard key={idx} {...props} />
                            ))}
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
