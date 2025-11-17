import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const ProductList = [
    {
        title: 'Fast2',
        logo: '/img/fast2/Fast2_favicon_white.png',
        description: 'Plateforme de migration documentaire pour transformer et migrer vos documents vers différents systèmes',
        link: '/docs/fast2',
        color: '#5CB8C7',
        gradient: 'linear-gradient(135deg, #5CB8C7, #4AA5B4, #3A8F9D, #2F7D8B)'
    },
    {
        title: 'FlowerDocs',
        logo: '/img/flowerdocs/logo_flower_white.png',
        description: 'Solution de gestion électronique de documents (GED) pour organiser, gérer et exploiter vos contenus documentaires',
        link: '/docs/flowerdocs',
        color: '#D745FF',
        gradient: 'linear-gradient(135deg, #D745FF, #C55BFF, #B56BFF, #A47BFF)'
    },
    {
        title: 'ARender',
        logo: '/img/arender/arender_logo_white.png',
        description: 'Visualiseur de documents haute performance pour afficher et annoter tous types de documents',
        link: '/docs/arender',
        color: '#4A8FEF',
        gradient: 'linear-gradient(135deg, #4A8FEF, #3A7EE5, #2A6DD8, #1865D8)'
    },
    {
        title: 'Uxopian AI',
        logo: '/img/uxo_white.png',
        description: 'Framework complet pour intégrer facilement des fonctionnalités d\'IA puissantes dans vos applications d\'entreprise',
        link: '/docs/uxopian-ai',
        color: '#E88AA0',
        gradient: 'linear-gradient(135deg, #F5A882, #EC9059, #E07869, #D36D78)'
    }
];

function ProductCard({ title, logo, description, link, color, gradient }) {
    const logoUrl = useBaseUrl(logo);

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader} style={{ background: gradient }}>
                <div className={styles.logoWrapper}>
                    <img src={logoUrl} alt={`${title} logo`} className={styles.logo} />
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
            </div>
            <p className={styles.cardDescription}>{description}</p>
            <Link
                className={styles.cardLink}
                to={link}
                style={{
                    '--card-color': color,
                    borderColor: color,
                    color: color
                } as React.CSSProperties}
            >
                Découvrir →
            </Link>
        </div>
    );
}

export default function ProductCards() {
    const uxoLogo = useBaseUrl('/img/uxo_white.png');
    const sunsetBg = useBaseUrl('/img/uxopian-sunset-background.jpg');
    const nightBg = useBaseUrl('/img/uxopian-night-background.jpg');

    return (
        <section className={styles.productsSection}>
            <div className={styles.backgroundWrapper}>
                <div className={styles.backgroundLight} style={{ backgroundImage: `url(${sunsetBg})` }}></div>
                <div className={styles.backgroundDark} style={{ backgroundImage: `url(${nightBg})` }}></div>
            </div>
            <div className={styles.backgroundLogo} style={{ backgroundImage: `url(${uxoLogo})` }}></div>

            <div className="container">
                <h1 className={styles.mainTitle}>Documentation produits</h1>
                <p className={styles.subtitle}>Découvrez nos solutions documentaires et d'intelligence artificielle complètes.</p>

                <div className={styles.cardsGrid}>
                    {ProductList.map((props, idx) => (
                        <ProductCard key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}