import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import UXopianFeed from './UXopianFeed';

const FlowerDocsCardsList = [
    {
        title: 'Concepts',
        icon: '💡',
        description: 'Getting to grips with the platform\'s general concepts',
        link: '/docs/flowerdocs/concepts/getting-started',
        color: '#6c5ce7'
    },
    {
        title: 'Installation',
        icon: '🔧',
        description: 'Installing & deploying the platform',
        link: '/docs/flowerdocs/install/getting-started',
        color: '#fd79a8'
    },
    {
        title: 'FlowerDocs Academy',
        icon: '🎓',
        description: 'Find out more about FlowerDocs through training modules',
        link: '/docs/flowerdocs/learn/admin-hide-menu/getting-started',
        color: '#00b894'
    }
];

const GuidesList = [
    {
        title: 'Guides',
        description: 'Manage your platform with guides',
        items: [
            {
                icon: '🖥️',
                title: 'Graphical user interface',
                description: 'FlowerDocs GUI customisation',
                link: '/docs/flowerdocs/config/gui/getting-started'
            },
            {
                icon: '🛠️',
                title: 'Administration',
                description: 'Administering and configuring FlowerDocs Core',
                link: '/docs/flowerdocs/config/core/component-identifier'
            },
            {
                icon: '👁️',
                title: 'Operation',
                description: 'Operating & Supervising your platform',
                link: '/docs/flowerdocs/config/exploit/actuator'
            }
        ],
        color: '#0984e3'
    },
    {
        title: 'Development',
        description: 'FlowerDocs APIs at your disposal',
        items: [
            {
                icon: '🔌',
                title: 'JS plugins',
                description: 'Enriching the interface with your own scripts',
                link: '/docs/flowerdocs/apis/plugins/getting-started'
            },
            {
                icon: '📡',
                title: 'JSAPI',
                description: 'Enriching the interface with your own scripts',
                link: '/docs/flowerdocs/apis/jsapi/getting-started'
            },
            {
                icon: '⚙️',
                title: 'Core APIs',
                description: 'Consuming the FlowerDocs Core service layer',
                link: '/docs/flowerdocs/apis/core/intro'
            }
        ],
        color: '#6c5ce7'
    }
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
                {items.map((item, idx) => (
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
                ))}
            </div>

        </div>
    );
}

export default function FlowerDocsCards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <div className={styles.cardsGrid}>
                            {FlowerDocsCardsList.map((props, idx) => (
                                <FlowerDocsCard key={idx} {...props} />
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