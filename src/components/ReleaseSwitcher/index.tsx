import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type Product = { id: string; label: string; to: string };

const PRODUCTS: Product[] = [
  { id: 'fast2', label: 'Fast2', to: '/releases/fast2' },
  { id: 'arender', label: 'ARender', to: '/releases/arender' },
  { id: 'flowerdocs', label: 'FlowerDocs', to: '/releases/flowerdocs' },
  { id: 'uxopian-ai', label: 'Uxopian AI', to: '/releases/uxopian-ai' },
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
