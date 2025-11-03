import React from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import categories from '../../generated/topCategories.json';
import '../../css/secondary-nav.css';

type Cat = { label: string; href: string };

export default function SecondaryNav(): React.ReactElement | null {
    const { pathname } = useLocation();

    const categoriesMap = categories as Record<string, Cat[]>;

    let product: string | null = null;
    let versionPrefix: string = '';

    // Check for versioned docs pattern: /docs/product/v1/product/...
    const versionedMatch = pathname.match(/\/docs\/([^\/]+)\/(v\d+)\/\1\//);
    if (versionedMatch) {
        product = versionedMatch[1];
        versionPrefix = `/${versionedMatch[1]}/${versionedMatch[2]}/${versionedMatch[1]}`;
    } else {
        // Fallback to original logic for non-versioned docs
        const docsMatch = pathname.match(/\/docs\/([^\/]+)/);
        if (docsMatch) {
            product = docsMatch[1];
        } else {
            for (const k of Object.keys(categoriesMap)) {
                if (!k) continue;
                if (pathname.includes(`/docs/${k}/`) || pathname.includes(`/${k}/`)) {
                    product = k;
                    break;
                }
            }
        }
    }

    // Adjust items to include version prefix if present
    const baseItems: Cat[] = (product && categoriesMap[product]) || [];
    const items: Cat[] = versionPrefix
        ? baseItems.map(item => ({
            ...item,
            href: item.href.replace(`/docs/${product}/`, `/docs${versionPrefix}/`)
        }))
        : baseItems;

    if (!items || items.length === 0) return null;
    useSyncSidebarToCategory(items, pathname);

    React.useEffect(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        const prefix = 'uxo-product-';
        Array.from(root.classList)
            .filter((c) => c.startsWith(prefix))
            .forEach((c) => root.classList.remove(c));
        if (product) {
            root.classList.add(`${prefix}${product}`);
            root.classList.add('uxo-has-secondary-nav');
            try {
                const tokenMap: Record<string, string> = {
                    flowerdocs: '--uxo-purple-500',
                    fast2: '--uxo-turquoise-1',
                    arender: '--uxo-blue-1',
                    'uxopian-ai': '--uxo-sunset-2',
                };
                const primaryToken = tokenMap[product] || '--uxo-purple-500';
                const computed = getComputedStyle(document.documentElement).getPropertyValue(primaryToken).trim();
                if (computed) {
                    document.documentElement.style.setProperty('--ifm-color-primary', computed);
                    const darkToken = primaryToken.replace(/-(1|500)$/, '-2');
                    const computedDark = getComputedStyle(document.documentElement).getPropertyValue(darkToken).trim();
                    if (computedDark) document.documentElement.style.setProperty('--ifm-color-primary-dark', computedDark);
                }
            } catch (e) {
                // silent
            }
        }
        return () => {
            if (product) root.classList.remove(`${prefix}${product}`);
            root.classList.remove('uxo-has-secondary-nav');
            try {
                document.documentElement.style.removeProperty('--ifm-color-primary');
                document.documentElement.style.removeProperty('--ifm-color-primary-dark');
            } catch (e) {
                // ignore
            }
        };
    }, [product]);

    React.useEffect(() => {
        if (typeof document === 'undefined') return;
        const setVar = () => {
            const nav = document.querySelector('.secondary-nav') as HTMLElement | null;
            if (!nav) return;
            const h = nav.getBoundingClientRect().height || 0;
            document.documentElement.style.setProperty('--uxo-secondary-nav-height', `${Math.ceil(h)}px`);
        };
        setVar();
        const ro = new ResizeObserver(setVar);
        const navEl = document.querySelector('.secondary-nav');
        if (navEl) ro.observe(navEl);
        window.addEventListener('resize', setVar);
        return () => {
            window.removeEventListener('resize', setVar);
            if (navEl) ro.disconnect();
        };
    }, []);



    return (
        <nav className={"secondary-nav " + (product ? `secondary-nav--${product}` : '')} aria-label="Secondary navigation" data-product={product || ''}>
            <div className="navbar__inner secondary-nav__inner">
                {items.map((it) => (
                    <Link
                        key={it.href}
                        to={it.href}
                        className={pathname.includes(it.href) ? 'secondary-nav__item active' : 'secondary-nav__item'}
                    >
                        {it.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export function useSyncSidebarToCategory(items: { label: string; href: string }[], pathname: string) {
    React.useEffect(() => {
        if (typeof document === 'undefined') return;

        const normalize = (s: string | null | undefined) => {
            if (!s) return '';
            try {
                const url = new URL(s, window.location.origin);
                return url.pathname.replace(/^\/+|\/+$/g, '');
            } catch (e) {
                return String(s).replace(/^\/+|\/+$/g, '');
            }
        };

        const active = items.find((it) => {
            const n = normalize(it.href);
            const cur = normalize(pathname);
            return cur === n || cur.startsWith(n) || cur.includes(`/${n}`) || n.includes(cur);
        });

        const findSidebar = () => {
            return (
                document.querySelector('.theme-doc-sidebar') ||
                document.querySelector('.theme-doc-sidebar-container') ||
                document.querySelector('.sidebar_njMd') ||
                document.querySelector('nav.menu') ||
                document.querySelector('.menu') ||
                null
            );
        };

        const apply = (sidebar: Element | null) => {
            if (!sidebar) return;
            const groups = Array.from(sidebar.querySelectorAll('.menu__list-item, details.menu__list-item, .theme-doc-sidebar-item-category, .theme-doc-sidebar-item-link')) as Element[];

            if (!active) {
                groups.forEach((g) => {
                    (g as HTMLElement).style.display = '';
                    if (g instanceof HTMLDetailsElement) g.open = false;
                });
                return;
            }

            const normCat = normalize(active.href);

            groups.forEach((g) => {
                try {
                    const links = Array.from(g.querySelectorAll('a')) as HTMLAnchorElement[];
                    const has = links.some((a) => {
                        const p = normalize(a.getAttribute('href'));
                        return p && (p === normCat || p.startsWith(normCat) || p.includes(`/${normCat}`));
                    });
                    if (has) {
                        (g as HTMLElement).classList.remove('uxo-hidden-by-filter');
                        if (g instanceof HTMLDetailsElement) g.open = true;
                    } else {
                        (g as HTMLElement).classList.add('uxo-hidden-by-filter');
                        if (g instanceof HTMLDetailsElement) g.open = false;
                    }
                } catch (e) {
                    // ignore
                }
            });
        };

        let observer: MutationObserver | null = null;
        let tried = 0;
        const maxTries = 10;

        const tryApply = () => {
            const sidebar = findSidebar();
            if (sidebar) {
                apply(sidebar);
            } else if (tried < maxTries) {
                tried++;
                setTimeout(tryApply, 150);
            } else {
                observer = new MutationObserver(() => {
                    const s = findSidebar();
                    if (s) {
                        apply(s);
                        if (observer) observer.disconnect();
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
            }
        };

        tryApply();

        return () => {
            if (observer) observer.disconnect();
            const sidebar = findSidebar();
            if (sidebar) {
                const groups = Array.from(sidebar.querySelectorAll('.menu__list-item, details.menu__list-item, .theme-doc-sidebar-item-category, .theme-doc-sidebar-item-link')) as Element[];
                groups.forEach((g) => ((g as HTMLElement).style.display = ''));
            }
        };
    }, [items, pathname]);
}
