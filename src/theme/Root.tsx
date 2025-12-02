import React, {JSX, useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Configuration des produits pour la recherche
const PRODUCT_CONFIG: Record<string, {
  name: string;
  logo: string;
  bgColor: string;
  badgeColor: string;
  badgeColorDark: string;
}> = {
  'fast2': {
    name: 'Fast2',
    logo: '/img/fast2/Fast2_favicon_white.png',
    bgColor: '#2D7D9A',
    badgeColor: '#2D7D9A',
    badgeColorDark: '#5CB8C7',
  },
  'arender': {
    name: 'ARender',
    logo: '/img/arender/arender_logo_white.png',
    bgColor: '#3A6FD8',
    badgeColor: '#3A6FD8',
    badgeColorDark: '#6B9AE8',
  },
  'flowerdocs': {
    name: 'FlowerDocs',
    logo: '/img/flowerdocs/logo_flower_white.png',
    bgColor: '#8B5CF6',
    badgeColor: '#8B5CF6',
    badgeColorDark: '#A78BFA',
  },
  'uxopian-ai': {
    name: 'Uxopian AI',
    logo: '/img/uxo_white.png',
    bgColor: '#D97706',
    badgeColor: '#D97706',
    badgeColorDark: '#FBBF24',
  },
};

function getProductFromText(text: string): string | null {
  if (!text) return null;
  const lowerText = text.toLowerCase();
  
  // Chercher les patterns d'URL explicites - ORDRE IMPORTANT (plus spécifique en premier)
  if (lowerText.includes('/docs/uxopian-ai') || lowerText.includes('docs/uxopian-ai')) {
    return 'uxopian-ai';
  }
  if (lowerText.includes('/docs/flowerdocs') || lowerText.includes('docs/flowerdocs')) {
    return 'flowerdocs';
  }
  if (lowerText.includes('/docs/arender') || lowerText.includes('docs/arender')) {
    return 'arender';
  }
  if (lowerText.includes('/docs/fast2') || lowerText.includes('docs/fast2')) {
    return 'fast2';
  }
  
  return null;
}

function useSearchResultsDecorator() {
  const {siteConfig} = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  useEffect(() => {
    // Patch le template de suggestion pour inclure l'URL
    const patchAutocomplete = () => {
      // Intercepter les clics pour récupérer l'URL
      document.addEventListener('click', (e) => {
        const suggestion = (e.target as HTMLElement).closest('[class*="suggestion"]');
        if (suggestion) {
          // L'URL sera dans l'événement autocomplete:selected
        }
      }, true);
    };
    
    patchAutocomplete();

    const decorateSearchResults = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      // Trouver le dropdown
      const dropdownMenu = document.querySelector('[class*="dropdownMenu"]');
      if (!dropdownMenu) return;
      
      // Trouver toutes les suggestions
      const suggestions = dropdownMenu.querySelectorAll('[class*="suggestion"]');
      
      suggestions.forEach((suggestion, index) => {
        // Ignorer le conteneur "suggestions"
        if (suggestion.className.includes('suggestions')) return;
        
        // Ignorer si déjà décoré avec logo
        if (suggestion.querySelector('.search-product-logo')) return;
        
        const suggestionEl = suggestion as HTMLElement;
        const hitWrapper = suggestion.querySelector('[class*="hitWrapper"]');
        if (!hitWrapper) return;
        
        const hitPath = suggestion.querySelector('[class*="hitPath"]') as HTMLElement | null;
        
        // Détecter le produit via le chemin affiché
        let product: string | null = null;
        
        if (hitPath?.textContent) {
          const pathText = hitPath.textContent;
          
          // D'abord vérifier les versions (plus fiable)
          // v2023.14.x = ARender
          if (pathText.match(/v2023\.14/)) {
            product = 'arender';
          }
          // v2025.3.x = FlowerDocs
          else if (pathText.match(/v2025\.3/)) {
            product = 'flowerdocs';
          }
          // v2025.x.x (sans .3) = Fast2
          else if (pathText.match(/v2025\.[x\d]/) && !pathText.match(/v2025\.3/)) {
            product = 'fast2';
          }
          // v2026 = Uxopian AI
          else if (pathText.match(/v2026/)) {
            product = 'uxopian-ai';
          }
          // Sinon chercher le nom du produit directement (si déjà remplacé)
          else if (pathText.includes('ARender')) {
            product = 'arender';
          }
          else if (pathText.includes('Fast2')) {
            product = 'fast2';
          }
          else if (pathText.includes('FlowerDocs')) {
            product = 'flowerdocs';
          }
          else if (pathText.includes('Uxopian')) {
            product = 'uxopian-ai';
          }
          // Fallback sur des mots-clés
          else {
            const lowerPath = pathText.toLowerCase();
            if (lowerPath.includes('rendition') || lowerPath.includes('annotation') || 
                lowerPath.includes('alfresco') || lowerPath.includes('m-files') ||
                lowerPath.includes('aca') || lowerPath.includes('share')) {
              product = 'arender';
            }
            else if (lowerPath.includes('punnet') || lowerPath.includes('broker') || 
                     lowerPath.includes('campaign') || lowerPath.includes('getting started')) {
              product = 'fast2';
            }
            else if (lowerPath.includes('flower') || lowerPath.includes('workflow') ||
                     lowerPath.includes('opensearch')) {
              product = 'flowerdocs';
            }
          }
        }
        
        // Si toujours pas de produit, ne pas décorer
        if (!product) return;
        
        const config = PRODUCT_CONFIG[product];
        if (!config) return;
        
        const logoUrl = baseUrl.replace(/\/$/, '') + config.logo;
        
        // Masquer les icônes par défaut
        const hitIcon = suggestion.querySelector('[class*="hitIcon"]');
        if (hitIcon) {
          (hitIcon as HTMLElement).style.cssText = 'display: none !important;';
        }
        
        const hitTree = suggestion.querySelector('[class*="hitTree"]');
        if (hitTree) {
          (hitTree as HTMLElement).style.cssText = 'display: none !important;';
        }
        
        const hitAction = suggestion.querySelector('[class*="hitAction"]');
        if (hitAction) {
          (hitAction as HTMLElement).style.cssText = 'display: none !important;';
        }
        
        // Modifier le chemin pour afficher le nom du produit au lieu de la version
        if (hitPath) {
          let pathText = hitPath.textContent || '';
          // Remplacer toutes les versions par le nom du produit
          pathText = pathText.replace(/^v[\d.x]+\s*›\s*/i, config.name + ' › ');
          pathText = pathText.replace(/^v[\d.x]+\s*>\s*/i, config.name + ' › ');
          // Si ça commence encore par une version
          if (pathText.match(/^v\d/i)) {
            pathText = config.name + ' › ' + pathText.replace(/^v[\d.x]+\s*›?\s*/i, '');
          }
          hitPath.textContent = pathText;
        }
        
        // Créer le logo du produit (AU DÉBUT de la ligne)
        const logoContainer = document.createElement('div');
        logoContainer.className = 'search-product-logo';
        logoContainer.style.cssText = `
          width: 34px;
          height: 34px;
          min-width: 34px;
          background-image: url('${logoUrl}');
          background-size: 55%;
          background-repeat: no-repeat;
          background-position: center;
          background-color: ${config.bgColor};
          border-radius: 8px;
          margin-right: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          flex-shrink: 0;
        `;
        
        // Insérer le logo AU DÉBUT de la suggestion
        suggestionEl.insertBefore(logoContainer, suggestionEl.firstChild);
        
        // S'assurer que la suggestion est en flexbox
        suggestionEl.style.display = 'flex';
        suggestionEl.style.alignItems = 'center';
      });
    };

    // Observer pour détecter quand le dropdown de recherche apparaît/change
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0 || mutation.type === 'childList') {
          const dropdown = document.querySelector('[class*="dropdownMenu"]');
          if (dropdown) {
            // Délais multiples pour s'assurer que le DOM est prêt
            setTimeout(decorateSearchResults, 10);
            setTimeout(decorateSearchResults, 50);
            setTimeout(decorateSearchResults, 150);
          }
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Observer les changements de thème
    const themeObserver = new MutationObserver(() => {
      document.querySelectorAll('.search-product-logo, .search-product-badge').forEach(el => el.remove());
      setTimeout(decorateSearchResults, 50);
    });
    
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();
      themeObserver.disconnect();
    };
  }, [baseUrl]);
}

function useHighlightParam() {
  const location = useLocation();

  useEffect(() => {
    const doHighlight = () => {
      document.querySelectorAll('mark.url-highlight').forEach((el) => {
        const parent = el.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(el.textContent || ''), el);
          parent.normalize();
        }
      });

      const params = new URLSearchParams(location.search);
      const highlightText = params.get('h') || params.get('highlight');
      
      if (!highlightText || highlightText.trim() === '') {
        return;
      }

      const searchTerms = highlightText.split(',').map(t => t.trim()).filter(Boolean);
      if (searchTerms.length === 0) return;

      const pattern = new RegExp(`(${searchTerms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

      const contentArea = document.querySelector('.markdown') || document.querySelector('article') || document.body;
      if (!contentArea) return;

      const walker = document.createTreeWalker(
        contentArea,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tagName = parent.tagName.toLowerCase();
            if (['script', 'style', 'mark', 'textarea', 'input', 'code'].includes(tagName)) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      const textNodes: Text[] = [];
      let node;
      while ((node = walker.nextNode())) {
        if (pattern.test(node.textContent || '')) {
          textNodes.push(node as Text);
          pattern.lastIndex = 0;
        }
      }

      textNodes.forEach((textNode) => {
        const text = textNode.textContent || '';
        const parts = text.split(pattern);
        
        if (parts.length <= 1) return;

        const fragment = document.createDocumentFragment();
        parts.forEach((part) => {
          if (pattern.test(part)) {
            pattern.lastIndex = 0;
            const mark = document.createElement('mark');
            mark.className = 'url-highlight';
            mark.textContent = part;
            fragment.appendChild(mark);
          } else {
            fragment.appendChild(document.createTextNode(part));
          }
        });

        textNode.parentNode?.replaceChild(fragment, textNode);
      });

      const firstHighlight = document.querySelector('mark.url-highlight');
      if (firstHighlight) {
        firstHighlight.scrollIntoView({behavior: 'smooth', block: 'center'});
      }
    };

    const timer = setTimeout(doHighlight, 300);
    return () => clearTimeout(timer);
  }, [location.search, location.pathname]);
}

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  useHighlightParam();
  useSearchResultsDecorator();
  return <>{children}</>;
}
