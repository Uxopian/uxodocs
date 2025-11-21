import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Product = { id: string; label: string; to: string };

const PRODUCTS: Product[] = [
  { id: 'fast2', label: 'Fast2', to: '/releases?product=fast2' },
  { id: 'arender', label: 'ARender', to: '/releases?product=arender' },
  { id: 'flowerdocs', label: 'FlowerDocs', to: '/releases?product=flowerdocs' },
  { id: 'uxopian-ai', label: 'Uxopian AI', to: '/releases?product=uxopian-ai' },
];

export default function ReleaseSwitcher({ current }: { current?: string }) {
  return (
    <nav className={styles.switcher} aria-label="Switch release notes">
      <div className={styles.inner}>
        {PRODUCTS.map((p) => (
          <Link
            key={p.id}
            to={p.to}
            className={`${styles.item} ${current === p.id ? styles.active : ''}`}
          >
            {p.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
