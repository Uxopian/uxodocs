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

    // Check for versioned docs pattern: /docs/product/v1/product/... or /docs/product/v1/product
    const versionedMatch = pathname.match(/\/docs\/([^\/]+)\/(v\d+)\/\1(?:\/|$)/);
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
        ? baseItems.map(item => {
            // Extract the path after /docs/product/
            const pathMatch = item.href.match(/\/docs\/[^\/]+\/(.*)/);
            const remainingPath = pathMatch ? pathMatch[1] : '';
            return {
                ...item,
                href: `/docs${versionPrefix}/${remainingPath}`
            };
        })
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
                let path = url.pathname.replace(/^\/+|\/+$/g, '');
                // Remove /uxodocs/ prefix if present to match hrefs
                if (path.startsWith('uxodocs/')) {
                    path = path.substring(8); // Remove 'uxodocs/'
                }
                return path;
            } catch (e) {
                let path = String(s).replace(/^\/+|\/+$/g, '');
                // Remove /uxodocs/ prefix if present
                if (path.startsWith('uxodocs/')) {
                    path = path.substring(8);
                }
                return path;
            }
        };

        const currentPath = normalize(pathname);

        // Extract version from current path if present
        const currentSegments = currentPath.split('/').filter(Boolean);
        const currentDocsIdx = currentSegments.indexOf('docs');
        let currentVersion = null;

        if (currentDocsIdx !== -1 && currentSegments.length > currentDocsIdx + 2) {
            const potentialVersion = currentSegments[currentDocsIdx + 2];
            if (potentialVersion && potentialVersion.match(/^v\d+$/)) {
                currentVersion = potentialVersion;
            }
        }

        // Check if we're on the product index page (e.g., docs/flowerdocs/v2/flowerdocs)
        // In this case, we should show ALL categories, not filter
        const isProductIndexPage = currentVersion &&
            currentSegments.length === 4 &&
            currentSegments[currentDocsIdx + 1] === currentSegments[currentDocsIdx + 3];

        console.log('[SecondaryNav] Current path analysis:', {
            currentPath,
            currentVersion,
            itemsCount: items.length,
            isProductIndexPage
        });

        // If we're on the product index page, don't filter (show all categories)
        // Find which category the current page belongs to by checking all items
        const active = isProductIndexPage ? null : items.find((it) => {
            const itemHref = normalize(it.href);
            // Extract the category base path from this item
            const itemSegments = itemHref.split('/').filter(Boolean);
            const docsIdx = itemSegments.indexOf('docs');

            if (docsIdx !== -1 && itemSegments.length > docsIdx + 2) {
                const product = itemSegments[docsIdx + 1];
                const potentialVersion = itemSegments[docsIdx + 2];
                let itemCategoryBase = '';

                // Items from topCategories.json don't have version in their path
                // So we need to build the base path differently for versioned current paths
                if (potentialVersion && potentialVersion.match(/^v\d+$/)) {
                    // Item itself has version
                    if (itemSegments.length > docsIdx + 4) {
                        itemCategoryBase = itemSegments.slice(0, docsIdx + 5).join('/');
                    }
                } else {
                    // Item doesn't have version, but current path might
                    // Build base path: docs/product/[version]/category
                    const category = itemSegments[docsIdx + 2];
                    if (currentVersion) {
                        // Current path has version: docs/flowerdocs/v2/flowerdocs
                        // Item path: docs/flowerdocs/apis/...
                        // Build: docs/flowerdocs/v2/apis
                        itemCategoryBase = `docs/${product}/${currentVersion}/${category}`;
                    } else {
                        // No version in current path, use normal logic
                        itemCategoryBase = itemSegments.slice(0, docsIdx + 3).join('/');
                    }
                }

                console.log('[SecondaryNav] Checking item:', {
                    label: it.label,
                    itemHref,
                    itemCategoryBase,
                    matches: currentPath.startsWith(itemCategoryBase)
                });

                // Check if current page is under this category
                return itemCategoryBase && currentPath.startsWith(itemCategoryBase);
            }
            return false;
        });

        const findSidebar = () => {
            return (
                document.querySelector('.theme-doc-sidebar') ||
                document.querySelector('.theme-doc-sidebar-container') ||
                document.querySelector('.sidebar_njMd') ||
                document.querySelector('nav.menu') ||
                document.querySelector('.menu') ||
                document.querySelector('aside.theme-doc-sidebar-container') ||
                document.querySelector('[class*="sidebar"]') ||
                document.querySelector('aside nav') ||
                null
            );
        };

        const apply = (sidebar: Element | null) => {
            if (!sidebar) {
                console.log('[SecondaryNav] apply: no sidebar');
                return;
            }

            let mainMenu = sidebar.querySelector('.menu__list, ul.menu__list');
            if (!mainMenu) {
                console.log('[SecondaryNav] .menu__list not found, using fallback');
                mainMenu = sidebar.querySelector('ul') || sidebar;
            }

            let groups = Array.from(mainMenu.children).filter(el =>
                el.classList.contains('menu__list-item') ||
                el.tagName.toLowerCase() === 'li'
            ) as Element[];

            if (groups.length === 1) {
                const nestedList = groups[0].querySelector('ul.menu__list');
                if (nestedList) {
                    console.log('[SecondaryNav] Found nested menu structure, using nested items');
                    const nestedGroups = Array.from(nestedList.children).filter(el =>
                        el.classList.contains('menu__list-item') ||
                        el.tagName.toLowerCase() === 'li'
                    ) as Element[];

                    if (nestedGroups.length > 1) {
                        groups = nestedGroups;
                    }
                }
            }

            console.log('[SecondaryNav] apply: groups found:', groups.length, 'active:', active?.label);

            if (groups.length === 0) {
                console.log('[SecondaryNav] No groups found, aborting filter');
                return;
            }

            if (!active) {
                console.log('[SecondaryNav] No active category, showing all groups');
                groups.forEach((g) => {
                    (g as HTMLElement).classList.remove('uxo-hidden-by-filter');
                    (g as HTMLElement).classList.remove('hidden-sidebar-item');
                    // Force visibility with inline style to override any other styles
                    (g as HTMLElement).style.removeProperty('display');
                    (g as HTMLElement).style.removeProperty('max-height');
                    (g as HTMLElement).style.removeProperty('opacity');
                    if (g instanceof HTMLDetailsElement) g.open = false;
                });

                // Set up a MutationObserver to watch for the class being re-added
                const observerCallback = () => {
                    groups.forEach((g) => {
                        if ((g as HTMLElement).classList.contains('hidden-sidebar-item')) {
                            (g as HTMLElement).classList.remove('hidden-sidebar-item');
                            console.log('[SecondaryNav] Removed re-added hidden-sidebar-item class');
                        }
                    });
                };

                // Watch for changes
                groups.forEach((g) => {
                    const obs = new MutationObserver(observerCallback);
                    obs.observe(g, { attributes: true, attributeFilter: ['class'] });
                    // Store observer to clean up later (we'll let it run for the duration)
                });

                return;
            }

            const normCat = normalize(active.href);

            const catSegments = normCat.split('/').filter(Boolean);
            let categoryBasePath = '';

            const docsIdx = catSegments.indexOf('docs');
            if (docsIdx !== -1 && catSegments.length > docsIdx + 2) {
                const product = catSegments[docsIdx + 1];
                const potentialVersion = catSegments[docsIdx + 2];

                if (potentialVersion && potentialVersion.match(/^v\d+$/)) {
                    if (catSegments.length > docsIdx + 4) {
                        categoryBasePath = catSegments.slice(0, docsIdx + 5).join('/');
                    }
                } else {
                    categoryBasePath = catSegments.slice(0, docsIdx + 3).join('/');
                }
            }

            if (!categoryBasePath) {
                groups.forEach((g) => (g as HTMLElement).classList.remove('uxo-hidden-by-filter'));
                return;
            }

            groups.forEach((g) => {
                try {
                    let directLink: HTMLAnchorElement | null = null;

                    directLink = g.querySelector(':scope > a') ||
                        g.querySelector(':scope > .menu__link') ||
                        g.querySelector(':scope > summary > a') ||
                        g.querySelector(':scope > div > a');

                    if (!directLink) {
                        // No direct link found, keep visible (might be a container)
                        (g as HTMLElement).classList.remove('uxo-hidden-by-filter');
                        return;
                    }

                    const linkText = directLink.textContent?.trim() || 'unknown';
                    const directLinkPath = normalize(directLink.getAttribute('href'));
                    let shouldShow = false;

                    if (directLinkPath) {
                        if (directLinkPath === categoryBasePath) {
                            shouldShow = true;
                        } else if (directLinkPath.startsWith(categoryBasePath + '/')) {
                            shouldShow = true;
                        } else if (categoryBasePath.startsWith(directLinkPath + '/')) {
                            const remaining = categoryBasePath.substring(directLinkPath.length + 1);
                            const levels = remaining.split('/').filter(Boolean).length;
                            if (levels === 1) {
                                shouldShow = true;
                            }
                        }
                    } else {
                        const allLinks = Array.from(g.querySelectorAll('a')) as HTMLAnchorElement[];
                        shouldShow = allLinks.some((a) => {
                            const linkPath = normalize(a.getAttribute('href'));
                            if (!linkPath) return false;

                            return linkPath === categoryBasePath ||
                                linkPath.startsWith(categoryBasePath + '/') ||
                                (categoryBasePath.startsWith(linkPath + '/') &&
                                    categoryBasePath.substring(linkPath.length + 1).split('/').filter(Boolean).length === 1);
                        });
                    }

                    if (shouldShow) {
                        (g as HTMLElement).classList.remove('uxo-hidden-by-filter');
                        if (g instanceof HTMLDetailsElement && directLinkPath) {
                            if (directLinkPath === currentPath || currentPath.startsWith(directLinkPath + '/')) {
                                g.open = true;
                            }
                        }
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
        const maxTries = 20; // Increased from 10

        const tryApply = () => {
            const sidebar = findSidebar();
            if (sidebar) {
                console.log('[SecondaryNav] Sidebar found, applying filter', {
                    pathname,
                    active: active?.label,
                    tried
                });
                apply(sidebar);
            } else if (tried < maxTries) {
                tried++;
                console.log('[SecondaryNav] Sidebar not found, retry', tried, 'of', maxTries);
                setTimeout(tryApply, 200); // Increased from 150ms
            } else {
                console.log('[SecondaryNav] Max retries reached, using MutationObserver');
                observer = new MutationObserver(() => {
                    const s = findSidebar();
                    if (s) {
                        console.log('[SecondaryNav] Sidebar found via MutationObserver');
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
                groups.forEach((g) => (g as HTMLElement).classList.remove('uxo-hidden-by-filter'));
            }
        };
    }, [items, pathname]);
}
