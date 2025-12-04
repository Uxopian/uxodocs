import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';

export default function NavbarMobileSidebarPrimaryMenu(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();

  // Force le menu à se fermer et ouvrir notre modal à la place
  React.useEffect(() => {
    if (mobileSidebar.shown && typeof window !== 'undefined') {
      // Fermer le menu natif
      mobileSidebar.toggle();
      
      // Déclencher l'ouverture de notre modal
      setTimeout(() => {
        const event = new CustomEvent('openProductModal');
        window.dispatchEvent(event);
      }, 100);
    }
  }, [mobileSidebar.shown]);

  return null;
}
