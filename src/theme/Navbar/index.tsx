import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import OriginalNavbar from '@theme-original/Navbar';
import SecondaryNav from '@site/src/components/SecondaryNav';
import ProductModal from '@site/src/components/ProductModal';

export default function Navbar(props: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Vérifier si on est sur la page d'accueil ou les release notes
        const isHomePage = location.pathname === '/' || location.pathname === '/uxodocs/';
        const isReleasesPage = location.pathname.startsWith('/releases');
        const shouldInterceptBurger = isHomePage || isReleasesPage;

        if (!shouldInterceptBurger) return;

        // Intercepter les clics sur le menu burger uniquement sur ces pages
        const handleBurgerClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const burgerButton = target.closest('.navbar__toggle, button[aria-label="Toggle navigation bar"]');
            
            if (burgerButton && window.innerWidth <= 996) {
                e.preventDefault();
                e.stopPropagation();
                setIsModalOpen(true);
            }
        };

        document.addEventListener('click', handleBurgerClick, true);
        return () => document.removeEventListener('click', handleBurgerClick, true);
    }, [location.pathname]);

    return (
        <>
            <OriginalNavbar {...props} />
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <SecondaryNav />
        </>
    );
}
