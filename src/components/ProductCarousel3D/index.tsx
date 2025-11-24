import React, { useState, useEffect } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useHistory } from '@docusaurus/router';
import styles from './styles.module.css';

type Product = {
  id: string;
  label: string;
  to: string;
  logo: string;
  gradient: string;
  color: string;
  description: string;
};

const PRODUCTS: Product[] = [
  {
    id: 'fast2',
    label: 'Fast2',
    to: '/uxodocs/releases?product=fast2',
    logo: '/img/fast2/Fast2_favicon_white.png',
    gradient: 'linear-gradient(135deg, #5CB8C7 0%, #4AA5B4 50%, #3A8F9D 100%)',
    color: '#5CB8C7',
    description: 'Content Migration Platform',
  },
  {
    id: 'arender',
    label: 'ARender',
    to: '/uxodocs/releases?product=arender',
    logo: '/img/arender/arender_logo_white.png',
    gradient: 'linear-gradient(135deg, #4A8FEF 0%, #3A7EE5 50%, #2A6DD8 100%)',
    color: '#4A8FEF',
    description: 'Document Viewing Solution',
  },
  {
    id: 'flowerdocs',
    label: 'FlowerDocs',
    to: '/uxodocs/releases?product=flowerdocs',
    logo: '/img/flowerdocs/logo_flower_white.png',
    gradient: 'linear-gradient(135deg, #A855F7 0%, #9333EA 50%, #7E22CE 100%)',
    color: '#A855F7',
    description: 'Document Management System',
  },
  {
    id: 'uxopian-ai',
    label: 'Uxopian AI',
    to: '/uxodocs/releases?product=uxopian-ai',
    logo: '/img/uxo_white.png',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
    color: '#F59E0B',
    description: 'AI-Powered Solutions',
  },
];

interface ProductCarousel3DProps {
  current?: string;
  onProductChange?: (productId: string) => void;
}

export default function ProductCarousel3D({ current, onProductChange }: ProductCarousel3DProps) {
  const history = useHistory();
  
  const [activeId, setActiveId] = useState(current || PRODUCTS[0].id);

  useEffect(() => {
    if (current) setActiveId(current);
  }, [current]);

  const activeIndex = PRODUCTS.findIndex((p) => p.id === activeId);
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  const handleCardClick = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();

    if (product.id === activeId) return;

    const realCard = document.getElementById(`card-${product.id}`);
    if (realCard) {
      const clickedElement = e.currentTarget as HTMLElement;
      const rect = clickedElement.getBoundingClientRect();
      const isLeftClick = rect.left < window.innerWidth / 2;
      realCard.style.transition = 'none';
      if (isLeftClick) {
        realCard.classList.remove(styles.posFarRight);
        realCard.classList.add(styles.posFarLeft);
      } else {
        realCard.classList.remove(styles.posFarLeft);
        realCard.classList.add(styles.posFarRight);
      }
      void realCard.offsetWidth;
      realCard.style.transition = '';
    }

    setActiveId(product.id);

    if (onProductChange) {
        onProductChange(product.id);
    } else {
        history.push(product.to);
    }
  };

  const getPositionClass = (index: number, centerIndex: number, total: number) => {
    let offset = index - centerIndex;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    if (offset === 0) return styles.posCenter;
    if (offset === 1) return styles.posRight;
    if (offset === -1) return styles.posLeft;
    
    if (offset === 2 || offset === -2) return styles.posFarRight; 
    
    return styles.posHidden;
  };

  const renderCard = (product: Product, isGhost = false) => {
    const index = PRODUCTS.findIndex(p => p.id === product.id);
    let positionClass = getPositionClass(index, safeActiveIndex, PRODUCTS.length);
    
     if (isGhost) {
       positionClass = styles.posFarLeft; 
     }

    const isActive = product.id === activeId;

    return (
      <a
        id={!isGhost ? `card-${product.id}` : undefined}
        key={isGhost ? `${product.id}-ghost` : product.id}
        href={product.to}
        onClick={(e) => handleCardClick(e, product)}
        className={`${styles.productCard} ${positionClass} ${isActive ? styles.active : ''}`}
        style={{
          '--card-gradient': product.gradient,
          '--card-color': product.color,
        } as React.CSSProperties}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardContent}>
            <div className={styles.logoContainer}>
              <div className={styles.logoBackdrop} />
              {(() => {
                const logoUrl = useBaseUrl(product.logo);
                const fallback = useBaseUrl('/img/uxo.png');
                return (
                  <img
                    src={logoUrl}
                    alt={product.label}
                    className={styles.productLogo}
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      if (img.src !== fallback) {
                        img.src = fallback;
                        img.onerror = null;
                      }
                    }}
                  />
                );
              })()}
            </div>
            <h3 className={styles.productName}>{product.label}</h3>
            <p className={styles.productDescription}>{product.description}</p>
          </div>
        </div>
      </a>
    );
  };

  const ghostIndex = (safeActiveIndex + 2) % PRODUCTS.length;
  const ghostProduct = PRODUCTS[ghostIndex];

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div className={styles.cardsScene}>
          {PRODUCTS.map(product => renderCard(product, false))}
          
          {ghostProduct && renderCard(ghostProduct, true)}
        </div>
      </div>
      
      <div className={styles.backgroundEffects}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
      </div>
    </div>
  );
}