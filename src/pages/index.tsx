import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import ProductCards from '@site/src/components/ProductCards';
import Heading from '@theme/Heading';

import styles from './index.module.css';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Bienvenue sur ${siteConfig.title}`}
      description="Documentation complète pour Fast2 et FlowerDocs">
      <main>
        <ProductCards />
      </main>
    </Layout>
  );
}
