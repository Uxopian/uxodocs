import React from "react";
import Link from "@docusaurus/Link";
import styles from "../FlowerDocsCards/styles.module.css";
import UXopianFeed from "../FlowerDocsCards/UXopianFeed";

const TopCardsList = [
    {
        title: "Getting Started",
        icon: "🚀",
        description: "Deploy the full stack in minutes with Docker Compose",
        link: "/docs/uxopian-ai/getting_started/overview",
        color: "#e17055",
    },
    {
        title: "Understanding Uxopian AI",
        icon: "🧠",
        description: "Architecture, components, authentication, and key concepts",
        link: "/docs/uxopian-ai/understanding/architecture",
        color: "#6c5ce7",
    },
    {
        title: "Admin Panel",
        icon: "📊",
        description: "Monitor usage, manage prompts and LLM providers",
        link: "/docs/uxopian-ai/admin/admin_panel_overview",
        color: "#00b894",
    },
];

const SectionsList = [
    {
        title: "How To Guides",
        description: "Step-by-step guides for common tasks",
        items: [
            {
                icon: "🌐",
                title: "Embed in a web application",
                description: "Add the chat panel to any web page",
                link: "/docs/uxopian-ai/how_to/embed_in_web_application",
            },
            {
                icon: "🤖",
                title: "Integrate with ARender",
                description: "AI menu in the ARender document viewer",
                link: "/docs/uxopian-ai/how_to/integrate_with_arender",
            },
            {
                icon: "🌸",
                title: "Integrate with FlowerDocs",
                description: "Chat panel via FlowerDocs scope files",
                link: "/docs/uxopian-ai/how_to/integrate_with_flowerdocs",
            },
            {
                icon: "⚙️",
                title: "Configure LLM providers",
                description: "OpenAI, Anthropic, Azure, Bedrock and more",
                link: "/docs/uxopian-ai/how_to/configure_llm_providers",
            },
        ],
        color: "#0984e3",
    },
    {
        title: "Extending Uxopian AI",
        description: "Customize and extend the platform",
        items: [
            {
                icon: "✍️",
                title: "Write prompts",
                description: "Author Thymeleaf prompt templates",
                link: "/docs/uxopian-ai/extending/writing_prompts",
            },
            {
                icon: "🔧",
                title: "Custom tools",
                description: "Give the LLM new capabilities via plugins",
                link: "/docs/uxopian-ai/extending/custom_tools",
            },
            {
                icon: "🧩",
                title: "Custom service helpers",
                description: "Inject your own data into prompt templates",
                link: "/docs/uxopian-ai/extending/custom_service_helpers",
            },
        ],
        color: "#e17055",
    },
];

const IntegrationsList = [
    {
        title: "ARender",
        icon: "📄",
        description: "AI menu in the ARender document viewer top panel",
        link: "/docs/uxopian-ai/how_to/integrate_with_arender",
    },
    {
        title: "FlowerDocs",
        icon: "🌸",
        description: "Chat panel embedded via FlowerDocs scope files",
        link: "/docs/uxopian-ai/how_to/integrate_with_flowerdocs",
    },
    {
        title: "Web application",
        icon: "🌐",
        description: "Embed the chat panel in any web application",
        link: "/docs/uxopian-ai/how_to/embed_in_web_application",
    },
];

function TopCard({ title, icon, description, link, color }) {
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

function SectionCard({ title, description, items, color }) {
    return (
        <div className={styles.guidesCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{title}</h3>
                <div className={styles.underline} style={{ backgroundColor: color }}></div>
            </div>
            <p className={styles.cardDescription}>{description}</p>
            <div className={styles.itemsList}>
                {items.map((item, idx) => (
                    <Link key={idx} to={item.link} className={styles.guideItem}>
                        <div className={styles.guideIcon} style={{ color }}>
                            {item.icon}
                        </div>
                        <div className={styles.guideContent}>
                            <h4 className={styles.guideTitle}>{item.title}</h4>
                            <p className={styles.guideDescription}>{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function IntegrationCard({ title, icon, description, link }) {
    return (
        <Link to={link} className={styles.connectorCard}>
            <div className={styles.connectorIcon} style={{ fontSize: "2rem" }}>
                {icon}
            </div>
            <h4 className={styles.connectorTitle}>{title}</h4>
            <p className={styles.connectorDescription}>{description}</p>
        </Link>
    );
}

export default function UxopianAICards() {
    React.useEffect(() => {
        if (typeof document !== "undefined") {
            document.body.classList.add("uxo-product-homepage");
            return () => {
                document.body.classList.remove("uxo-product-homepage");
            };
        }
    }, []);

    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <div className={styles.cardsGrid}>
                            {TopCardsList.map((props, idx) => (
                                <TopCard key={idx} {...props} />
                            ))}
                        </div>

                        <div className={styles.guidesGrid}>
                            {SectionsList.map((props, idx) => (
                                <SectionCard key={idx} {...props} />
                            ))}
                        </div>

                        <div className={styles.connectorsSection}>
                            <div className={styles.connectorsSectionHeader}>
                                <h2 className={styles.connectorsTitle}>Integrations</h2>
                                <p className={styles.connectorsSubtitle}>
                                    Connect Uxopian AI to your applications
                                </p>
                            </div>
                            <div className={styles.connectorsGrid}>
                                {IntegrationsList.map((props, idx) => (
                                    <IntegrationCard key={idx} {...props} />
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
