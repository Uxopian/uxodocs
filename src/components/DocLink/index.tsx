import React from 'react';
import Link from '@docusaurus/Link';
import {useVersions} from '@docusaurus/plugin-content-docs/client';

interface DocLinkProps {
  to: string;
  version: string;
  product: string;
  children: React.ReactNode;
}

const DocLink: React.FC<DocLinkProps> = ({to, version, product, children}) => {
  const versions = useVersions(product);
  const currentVersion = versions.find((v) => v.name === 'current');
  const isCurrentVersion = currentVersion?.label === version;

  const path = isCurrentVersion
    ? `/docs/${product}/${to}`
    : `/docs/${product}/${version}/${to}`;

  return <Link to={path}>{children}</Link>;
};

export default DocLink;
