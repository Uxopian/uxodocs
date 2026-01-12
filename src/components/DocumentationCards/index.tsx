import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

const DocumentationList = [
    {
        title: "ARender",
        icon: "📄",
        description: "Secure and collaborative document viewing solution",
        link: "/docs/arender",
        color: "#e74c3c",
    },
    {
        title: "FlowerDocs",
        icon: "🌸",
        description: "Complete electronic document management solution",
        link: "/docs/flower",
        color: "#6c5ce7",
    },
    {
        title: "Fast2",
        icon: "🚀",
        description: "Powerful document migration platform",
        link: "/docs/fast2/getting-started",
        color: "#fd79a8",
    },
    {
        title: "Installation",
        icon: "🔧",
        description: "Install & deploy the platforms",
        link: "/docs/flower/installation",
        color: "#fd79a8",
    },
    {
        title: "Concepts",
        icon: "💡",
        description: "Getting started with general concepts",
        link: "/docs/flower/concepts",
        color: "#0984e3",
    },
    {
        title: "APIs & Development",
        icon: "�",
        description: "APIs at your disposal",
        link: "/docs/flower/apis",
        color: "#6c5ce7",
    },
    {
        title: "Practical Guides",
        icon: "�",
        description: "Step-by-step tutorials and guides",
        link: "/docs/flower/tutoriels",
        color: "#00b894",
    },
];

function DocumentationCard({ title, icon, description, link, color }) {
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

export default function DocumentationCards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <h1 className={styles.mainTitle}>Documentation</h1>
                <p className={styles.subtitle}>Browse the different product documentations.</p>

                <div className={styles.cardsGrid}>
                    {DocumentationList.map((props, idx) => (
                        <DocumentationCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
