import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import {translate} from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';

export default function HomeBreadcrumbItem(): JSX.Element {
  const location = useLocation();
  
  // Extract the doc plugin path from the current URL
  // e.g., /uxodocs/docs/fast2/catalog/source → /docs/fast2
  const pathMatch = location.pathname.match(/\/docs\/(fast2|arender|flowerdocs|uxopian-ai)/);
  const docBasePath = pathMatch ? `/docs/${pathMatch[1]}` : '/';
  
  const homeHref = useBaseUrl(docBasePath);

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}>
        <IconHome style={{width: '1rem', height: '1rem', verticalAlign: 'middle'}} />
      </Link>
    </li>
  );
}
