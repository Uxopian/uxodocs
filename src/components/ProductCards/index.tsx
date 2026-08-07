import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const ProductList = [
    {
        title: "ARender",
        version: "v2026.2.0",
        logo: "/img/arender/arender_logo_white.png",
        description:
            "High-performance document viewer to display and annotate all types of documents",
        link: "/docs/arender/overview",
        releaseNotesLink: "/releases?product=arender",
        color: "#2563D8",
        gradient: "linear-gradient(135deg, #4A8FEF, #3A7EE5, #2A6DD8, #1865D8)",
    },
    {
        title: "Fast2",
        version: "v2025.x.x",
        logo: "/img/fast2/Fast2_favicon_white.png",
        description:
            "Document migration platform to transform and migrate your documents to different systems",
        link: "/docs/fast2",
        releaseNotesLink: "/releases?product=fast2",
        color: "#2D7A86",
        gradient: "linear-gradient(135deg, #5CB8C7, #4AA5B4, #3A8F9D, #2F7D8B)",
    },
    {
        title: "FlowerDocs",
        version: "v2026.1.0",
        logo: "/img/flowerdocs/logo_flower_white.png",
        description:
            "Electronic document management (EDM) solution to organize, manage and exploit your document content",
        link: "/docs/flowerdocs",
        releaseNotesLink: "/releases?product=flowerdocs",
        color: "#9B1FCC",
        gradient: "linear-gradient(135deg, #D745FF, #C55BFF, #B56BFF, #A47BFF)",
    },
    {
        title: "Uxopian AI",
        version: "2026.0.0",
        logo: "/img/uxo_white.png",
        description:
            "Complete framework to easily integrate powerful AI features into your enterprise applications",
        link: "/docs/uxopian-ai",
        releaseNotesLink: "/releases?product=uxopian-ai",
        color: "#C46F05",
        gradient: "linear-gradient(135deg, #F59E0B, #E07D09, #C76E08, #A85A07)",
    },
];

function ProductCard({
    title,
    version,
    logo,
    description,
    link,
    releaseNotesLink,
    color,
    gradient,
}) {
    const logoUrl = useBaseUrl(logo);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader} style={{ background: gradient }}>
                <div className={styles.logoWrapper}>
                    <img src={logoUrl} alt={`${title} logo`} className={styles.logo} />
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div className={styles.version}>{version}</div>
            </div>
            <p className={styles.cardDescription}>{description}</p>
            <div className={styles.cardButtons}>
                <Link
                    className={styles.cardLinkPrimary}
                    to={link}
                    style={
                        {
                            "--card-color": color,
                        } as React.CSSProperties
                    }
                >
                    Documentation →
                </Link>
                <Link
                    className={styles.cardLinkSecondary}
                    to={releaseNotesLink}
                    style={
                        {
                            "--card-color": color,
                            borderColor: color,
                            color: color,
                        } as React.CSSProperties
                    }
                >
                    Release Notes
                </Link>
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

export default function ProductCards() {
    const uxoLogo = useBaseUrl("/img/uxo_white.png");
    const sunsetBg = useBaseUrl("/img/uxopian-sunset-background3.jpg");
    const nightBg = useBaseUrl("/img/uxopian-night-background4.jpg");

    return (
        <section className={styles.productsSection}>
            <div className={styles.backgroundWrapper}>
                <div
                    className={styles.backgroundLight}
                    style={{ backgroundImage: `url(${sunsetBg})` }}
                ></div>
                <div
                    className={styles.backgroundDark}
                    style={{ backgroundImage: `url(${nightBg})` }}
                ></div>
            </div>
            <div
                className={styles.backgroundLogo}
                style={{ backgroundImage: `url(${uxoLogo})` }}
            ></div>

            <div className="container">
                <h1 className={styles.mainTitle}>Product Documentation</h1>
                <p className={styles.subtitle}>
                    Discover our complete document management and artificial intelligence solutions.
                </p>

                <div className={styles.cardsGrid}>
                    {ProductList.map((props, idx) => (
                        <ProductCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
