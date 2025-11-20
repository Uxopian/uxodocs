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
      title={`${siteConfig.title}`}
      description="Product documentation for Uxopian Software"
      wrapperClassName={styles.homePageWrapper}>
      <main>
        <ProductCards />
      </main>
    </Layout>
  );
}
