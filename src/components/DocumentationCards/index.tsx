import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const DocumentationList = [
    {
        title: 'ARender',
        icon: '📄',
        description: 'Solution de visualisation de documents sécurisée et collaborative',
        link: '/docs/arender',
        color: '#e74c3c'
    },
    {
        title: 'FlowerDocs',
        icon: '🌸',
        description: 'Solution de gestion électronique de documents complète',
        link: '/docs/flower',
        color: '#6c5ce7'
    },
    {
        title: 'Fast2',
        icon: '🚀',
        description: 'Plateforme de migration documentaire puissante',
        link: '/docs/fast2/getting-started',
        color: '#fd79a8'
    },
    {
        title: 'Installation',
        icon: '🔧',
        description: 'Installer & déployer les plateformes',
        link: '/docs/flower/installation',
        color: '#fd79a8'
    },
    {
        title: 'Concepts',
        icon: '💡',
        description: 'Prise en main des concepts généraux',
        link: '/docs/flower/concepts',
        color: '#0984e3'
    },
    {
        title: 'APIs & Développement',
        icon: '�',
        description: 'Les APIs à votre disposition',
        link: '/docs/flower/apis',
        color: '#6c5ce7'
    },
    {
        title: 'Guides pratiques',
        icon: '�',
        description: 'Tutoriels et guides étape par étape',
        link: '/docs/flower/tutoriels',
        color: '#00b894'
    }
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
                Découvrir →
            </Link>
        </div>
    );
}

export default function DocumentationCards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <h1 className={styles.mainTitle}>Documentation</h1>
                <p className={styles.subtitle}>Consulter les différentes documentations produit.</p>

                <div className={styles.cardsGrid}>
                    {DocumentationList.map((props, idx) => (
                        <DocumentationCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}