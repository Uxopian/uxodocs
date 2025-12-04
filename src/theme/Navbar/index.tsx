import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavbar from '@theme-original/Navbar';
import SecondaryNav from '@site/src/components/SecondaryNav';
import ProductModal from '@site/src/components/ProductModal';

export default function Navbar(props: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Fonction pour remplacer les textes de version par les noms de produits
        const replaceVersionTexts = () => {
            if (window.innerWidth > 996) return;

            const productMap: Record<string, string> = {
                'fast2': 'Fast2',
                'arender': 'ARender',
                'flowerdocs': 'FlowerDocs',
                'uxopian-ai': 'Uxopian AI'
            };

            // Approche 1: Chercher tous les dropdowns dans la sidebar mobile
            const sidebar = document.querySelector('.navbar-sidebar');
            if (!sidebar) return;

            // Chercher tous les éléments dropdown
            const dropdownItems = sidebar.querySelectorAll('.navbar__item.dropdown');
            
            dropdownItems.forEach((item) => {
                const dropdownLink = item.querySelector('.navbar__link');
                const dropdownMenu = item.querySelector('.dropdown__menu');
                
                if (!dropdownLink || !dropdownMenu) return;

                // Chercher les liens dans le menu pour identifier le produit
                const links = dropdownMenu.querySelectorAll('a[href*="/docs/"]');
                
                links.forEach((link) => {
                    const href = link.getAttribute('href') || '';
                    
                    // Identifier le produit
                    for (const [pluginId, productName] of Object.entries(productMap)) {
                        if (href.includes(`/${pluginId}/`)) {
                            // Remplacer le texte du dropdown parent
                            const textNodes = Array.from(dropdownLink.childNodes).filter(
                                node => node.nodeType === Node.TEXT_NODE
                            );
                            
                            textNodes.forEach((node) => {
                                const text = node.textContent || '';
                                // Remplacer les versions ou "Versions"
                                if (text.match(/v\d+\.\d+|Versions/i)) {
                                    node.textContent = productName;
                                }
                            });
                            return; // Sortir une fois trouvé
                        }
                    }
                });
            });
        };

        // Observer pour détecter l'ouverture de la sidebar
        const observer = new MutationObserver(() => {
            replaceVersionTexts();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });

        // Remplacer immédiatement si la sidebar est déjà ouverte
        replaceVersionTexts();

        // Intercepter les clics sur le menu burger UNIQUEMENT sur la page d'accueil et les releases
        const handleBurgerClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const burgerButton = target.closest('.navbar__toggle, button[aria-label="Toggle navigation bar"]');
            
            if (burgerButton && window.innerWidth <= 996) {
                // Vérifier si on est sur la page d'accueil ou les release notes
                const isHomePage = location.pathname === '/' || location.pathname === '/uxodocs/';
                const isReleasesPage = location.pathname.startsWith('/releases') || location.pathname.includes('/release-note');
                
                // N'intercepter QUE si on est sur ces pages spécifiques
                if (isHomePage || isReleasesPage) {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsModalOpen(true);
                } else {
                    // Attendre que la sidebar s'ouvre puis remplacer les textes
                    setTimeout(replaceVersionTexts, 100);
                }
                // Sinon, laisser le comportement natif (sidebar) fonctionner
            }
        };

        // Intercepter aussi les clics dans la navbar mobile (back to main menu)
        const handleNavbarItemClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const backToMainMenu = target.closest('a[class*="navbar__item"][href="/"]');
            
            if (backToMainMenu && window.innerWidth <= 996) {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(true);
                // Fermer le menu mobile natif
                const closeButton = document.querySelector('.navbar__toggle') as HTMLElement;
                if (closeButton) {
                    closeButton.click();
                }
            }
        };

        document.addEventListener('click', handleBurgerClick, true);
        document.addEventListener('click', handleNavbarItemClick, true);
        
        return () => {
            document.removeEventListener('click', handleBurgerClick, true);
            document.removeEventListener('click', handleNavbarItemClick, true);
            observer.disconnect();
        };
    }, [location.pathname]);

    return (
        <>
            <OriginalNavbar {...props} />
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <SecondaryNav />
        </>
    );
}
