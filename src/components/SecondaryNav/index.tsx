import React from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import categories from "../../generated/topCategories.json";
import "../../css/secondary-nav.css";
import ExternalLinkIcon from "@site/static/img/utils/external-link-svgrepo-com.svg";

type Cat = { label: string; href: string };
type CategoriesStructure = Record<string, Record<string, Cat[]>>;

export default function SecondaryNav(): React.ReactElement | null {
    const { pathname } = useLocation();

    const categoriesMap = categories as CategoriesStructure;

    let product: string | null = null;
    let version: string = "current";

    const versionedMatch = pathname.match(/\/docs\/([^\/]+)\/(v[\d.]+-?[A-Z]*)(?:\/|$)/);
    if (versionedMatch) {
        product = versionedMatch[1];
        version = versionedMatch[2];
    } else {
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

    // For CSS class and color, treat arender-horizon as arender
    const cssProduct = product === "arender-horizon" ? "arender" : product;

    // ALWAYS set product colors, even if SecondaryNav won't be displayed
    // This ensures navbar active states get the correct background color
    React.useEffect(() => {
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        const prefix = "uxo-product-";
        Array.from(root.classList)
            .filter((c) => c.startsWith(prefix))
            .forEach((c) => root.classList.remove(c));
        if (cssProduct) {
            root.classList.add(`${prefix}${cssProduct}`);
            try {
                const tokenMap: Record<string, string> = {
                    flowerdocs: "--uxo-purple-500",
                    fast2: "--uxo-turquoise-1",
                    arender: "--uxo-blue-1",
                    "uxopian-ai": "--uxo-sunset-2",
                };
                const primaryToken = tokenMap[cssProduct] || "--uxo-purple-500";
                const computed = getComputedStyle(document.documentElement)
                    .getPropertyValue(primaryToken)
                    .trim();
                if (computed) {
                    document.documentElement.style.setProperty("--ifm-color-primary", computed);
                    const darkToken = primaryToken.replace(/-(1|500)$/, "-2");
                    const computedDark = getComputedStyle(document.documentElement)
                        .getPropertyValue(darkToken)
                        .trim();
                    if (computedDark)
                        document.documentElement.style.setProperty(
                            "--ifm-color-primary-dark",
                            computedDark
                        );
                }
            } catch (e) {
                // silent
            }
        }
        return () => {
            if (cssProduct) root.classList.remove(`${prefix}${cssProduct}`);
            try {
                document.documentElement.style.removeProperty("--ifm-color-primary");
                document.documentElement.style.removeProperty("--ifm-color-primary-dark");
            } catch (e) {
                // ignore
            }
        };
    }, [cssProduct]);

    // Ne pas afficher la secondary navbar sur les pages de release notes
    // ni sur les pages arender-horizon (le ViewerToggle dans la sidebar suffit)
    // (but product colors are still set via the useEffect above)
    if (pathname.includes("/release-note/") || pathname.includes("/releases") || product === "arender-horizon") {
        return null;
    }

    // Get categories for the detected product and version
    const productCategories = (product && categoriesMap[product]) || {};
    // Don't fall back to 'current' nav for explicitly versioned URLs — those pages
    // have their own structure and 'current' links would point to wrong paths.
    const items: Cat[] = productCategories[version] ?? (version === 'current' ? productCategories['current'] : []) ?? [];

    if (!items || items.length === 0) return null;
    useSyncSidebarToCategory(items, pathname); // Re-enabled sidebar filtering

    // Set uxo-has-secondary-nav class ONLY when SecondaryNav is actually displayed
    React.useEffect(() => {
        if (typeof document === "undefined") return;
        const root = document.documentElement;
        root.classList.add("uxo-has-secondary-nav");
        return () => {
            root.classList.remove("uxo-has-secondary-nav");
        };
    }, []);

    React.useEffect(() => {
        if (typeof document === "undefined") return;
        const setVar = () => {
            const nav = document.querySelector(".secondary-nav") as HTMLElement | null;
            if (!nav) return;
            const h = nav.getBoundingClientRect().height || 0;
            document.documentElement.style.setProperty(
                "--uxo-secondary-nav-height",
                `${Math.ceil(h)}px`
            );
        };
        setVar();
        const ro = new ResizeObserver(setVar);
        const navEl = document.querySelector(".secondary-nav");
        if (navEl) ro.observe(navEl);
        window.addEventListener("resize", setVar);
        return () => {
            window.removeEventListener("resize", setVar);
            if (navEl) ro.disconnect();
        };
    }, []);

    // Extra links for Fast2
    const extraLinks =
        product === "fast2"
            ? [
                {
                    label: "Get Support",
                    href: "https://arondor.atlassian.net/servicedesk/customer/portal/82",
                    external: true,
                },
                {
                    label: "Search the Knowledge-Base",
                    href: "https://arondor.atlassian.net/servicedesk/customer/portals?q=",
                    external: true,
                },
            ]
            : [];

    return (
        <nav
            className={"secondary-nav " + (product ? `secondary-nav--${product}` : "")}
            aria-label="Secondary navigation"
            data-product={product || ""}
        >
            <div className="navbar__inner secondary-nav__inner">
                {items.map((it) => (
                    <Link
                        key={it.href}
                        to={it.href}
                        className={
                            pathname.includes(it.href)
                                ? "secondary-nav__item active"
                                : "secondary-nav__item"
                        }
                    >
                        {it.label}
                    </Link>
                ))}
                {extraLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="secondary-nav__item"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.label}
                        <ExternalLinkIcon
                            style={{
                                marginLeft: "0.3rem",
                                width: "20px",
                                height: "20px",
                                display: "inline-block",
                                verticalAlign: "middle",
                            }}
                        />
                    </a>
                ))}
            </div>
        </nav>
    );
}

export function useSyncSidebarToCategory(
    items: { label: string; href: string }[],
    pathname: string
) {
    React.useEffect(() => {
        if (typeof document === "undefined") return;

        const normalize = (s: string | null | undefined) => {
            if (!s) return "";
            try {
                const url = new URL(s, window.location.origin);
                let path = url.pathname.replace(/^\/+|\/+$/g, "");
                if (path.startsWith("uxodocs/")) {
                    path = path.substring(8); // Remove 'uxodocs/'
                }
                return path;
            } catch (e) {
                let path = String(s).replace(/^\/+|\/+$/g, "");
                if (path.startsWith("uxodocs/")) {
                    path = path.substring(8);
                }
                return path;
            }
        };

        const currentPath = normalize(pathname);

        const currentSegments = currentPath.split("/").filter(Boolean);
        const currentDocsIdx = currentSegments.indexOf("docs");
        let currentVersion = null;

        if (currentDocsIdx !== -1 && currentSegments.length > currentDocsIdx + 2) {
            const potentialVersion = currentSegments[currentDocsIdx + 2];
            if (potentialVersion && potentialVersion.match(/^v[\d.]+-?[A-Z]*$/)) {
                currentVersion = potentialVersion;
            }
        }

        const isProductIndexPage =
            currentVersion &&
            currentSegments.length === 4 &&
            currentSegments[currentDocsIdx + 1] === currentSegments[currentDocsIdx + 3];

        const active = isProductIndexPage
            ? null
            : items.find((it) => {
                const itemHref = normalize(it.href);
                const itemSegments = itemHref.split("/").filter(Boolean);
                const docsIdx = itemSegments.indexOf("docs");

                if (docsIdx !== -1 && itemSegments.length > docsIdx + 2) {
                    const product = itemSegments[docsIdx + 1];
                    const potentialVersion = itemSegments[docsIdx + 2];
                    let itemCategoryBase = "";

                    if (potentialVersion && potentialVersion.match(/^v[\d.]+-?[A-Z]*$/)) {
                        if (itemSegments.length > docsIdx + 3) {
                            itemCategoryBase = itemSegments.slice(0, docsIdx + 4).join("/");
                        }
                    } else {
                        const category = itemSegments[docsIdx + 2];
                        if (currentVersion) {
                            itemCategoryBase = `docs/${product}/${currentVersion}/${category}`;
                        } else {
                            itemCategoryBase = itemSegments.slice(0, docsIdx + 3).join("/");
                        }
                    }

                    return itemCategoryBase && currentPath.startsWith(itemCategoryBase);
                }
                return false;
            });

        const findSidebar = () => {
            return (
                document.querySelector(".theme-doc-sidebar") ||
                document.querySelector(".theme-doc-sidebar-container") ||
                document.querySelector(".sidebar_njMd") ||
                document.querySelector("nav.menu") ||
                document.querySelector(".menu") ||
                document.querySelector("aside.theme-doc-sidebar-container") ||
                document.querySelector('[class*="sidebar"]') ||
                document.querySelector("aside nav") ||
                null
            );
        };

        const apply = (sidebar: Element | null) => {
            if (!sidebar) {
                return;
            }

            let mainMenu = sidebar.querySelector(".menu__list, ul.menu__list");
            if (!mainMenu) {
                mainMenu = sidebar.querySelector("ul") || sidebar;
            }

            let groups = Array.from(mainMenu.children).filter(
                (el) =>
                    el.classList.contains("menu__list-item") || el.tagName.toLowerCase() === "li"
            ) as Element[];

            // ALWAYS unwrap single parent groups (like "Documentation FlowerDocs")
            // This removes the unnecessary top-level wrapper from the sidebar hierarchy
            // even when a category is active
            if (groups.length === 1) {
                const nestedList = groups[0].querySelector("ul.menu__list");
                if (nestedList) {
                    const nestedGroups = Array.from(nestedList.children).filter(
                        (el) =>
                            el.classList.contains("menu__list-item") ||
                            el.tagName.toLowerCase() === "li"
                    ) as Element[];

                    if (nestedGroups.length > 1) {
                        groups = nestedGroups;
                    }
                }
            }

            if (!active) {
                groups.forEach((g) => {
                    (g as HTMLElement).classList.remove("uxo-hidden-by-filter");
                    (g as HTMLElement).classList.remove("hidden-sidebar-item");
                    // Force visibility with inline style to override any other styles
                    (g as HTMLElement).style.removeProperty("display");
                    (g as HTMLElement).style.removeProperty("max-height");
                    (g as HTMLElement).style.removeProperty("opacity");
                    if (g instanceof HTMLDetailsElement) g.open = false;
                });

                // Set up a MutationObserver to watch for the class being re-added
                const observerCallback = () => {
                    groups.forEach((g) => {
                        if ((g as HTMLElement).classList.contains("hidden-sidebar-item")) {
                            (g as HTMLElement).classList.remove("hidden-sidebar-item");
                        }
                    });
                };

                // Watch for changes
                groups.forEach((g) => {
                    const obs = new MutationObserver(observerCallback);
                    obs.observe(g, { attributes: true, attributeFilter: ["class"] });
                    // Store observer to clean up later (we'll let it run for the duration)
                });

                return;
            }

            const normCat = normalize(active.href);

            const catSegments = normCat.split("/").filter(Boolean);
            let categoryBasePath = "";

            const docsIdx = catSegments.indexOf("docs");
            if (docsIdx !== -1 && catSegments.length > docsIdx + 2) {
                const product = catSegments[docsIdx + 1];
                const potentialVersion = catSegments[docsIdx + 2];

                if (potentialVersion && potentialVersion.match(/^v[\d.]+-?[A-Z]*$/)) {
                    if (catSegments.length > docsIdx + 3) {
                        categoryBasePath = catSegments.slice(0, docsIdx + 4).join("/");
                    }
                } else {
                    categoryBasePath = catSegments.slice(0, docsIdx + 3).join("/");
                }
            }

            if (!categoryBasePath) {
                groups.forEach((g) => (g as HTMLElement).classList.remove("uxo-hidden-by-filter"));
                return;
            }

            groups.forEach((g) => {
                try {
                    let directLink: HTMLAnchorElement | null = null;

                    directLink =
                        g.querySelector(":scope > a") ||
                        g.querySelector(":scope > .menu__link") ||
                        g.querySelector(":scope > summary > a") ||
                        g.querySelector(":scope > div > a");

                    if (!directLink) {
                        // No direct link found, keep visible (might be a container)
                        (g as HTMLElement).classList.remove("uxo-hidden-by-filter");
                        return;
                    }

                    const linkText = directLink.textContent?.trim() || "unknown";
                    const directLinkPath = normalize(directLink.getAttribute("href"));
                    let shouldShow = false;

                    if (directLinkPath) {
                        if (directLinkPath === categoryBasePath) {
                            shouldShow = true;
                        } else if (directLinkPath.startsWith(categoryBasePath + "/")) {
                            shouldShow = true;
                        } else if (categoryBasePath.startsWith(directLinkPath + "/")) {
                            const remaining = categoryBasePath.substring(directLinkPath.length + 1);
                            const levels = remaining.split("/").filter(Boolean).length;
                            if (levels === 1) {
                                shouldShow = true;
                            }
                        }
                    } else {
                        const allLinks = Array.from(g.querySelectorAll("a")) as HTMLAnchorElement[];
                        shouldShow = allLinks.some((a) => {
                            const linkPath = normalize(a.getAttribute("href"));
                            if (!linkPath) return false;

                            return (
                                linkPath === categoryBasePath ||
                                linkPath.startsWith(categoryBasePath + "/") ||
                                (categoryBasePath.startsWith(linkPath + "/") &&
                                    categoryBasePath
                                        .substring(linkPath.length + 1)
                                        .split("/")
                                        .filter(Boolean).length === 1)
                            );
                        });
                    }

                    if (shouldShow) {
                        (g as HTMLElement).classList.remove("uxo-hidden-by-filter");
                        if (g instanceof HTMLDetailsElement && directLinkPath) {
                            if (
                                directLinkPath === currentPath ||
                                currentPath.startsWith(directLinkPath + "/")
                            ) {
                                g.open = true;
                            }
                        }
                    } else {
                        (g as HTMLElement).classList.add("uxo-hidden-by-filter");
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
                apply(sidebar);
            } else if (tried < maxTries) {
                tried++;
                setTimeout(tryApply, 200); // Increased from 150ms
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
                const groups = Array.from(
                    sidebar.querySelectorAll(
                        ".menu__list-item, details.menu__list-item, .theme-doc-sidebar-item-category, .theme-doc-sidebar-item-link"
                    )
                ) as Element[];
                groups.forEach((g) => (g as HTMLElement).classList.remove("uxo-hidden-by-filter"));
            }
        };
    }, [items, pathname]);
}
