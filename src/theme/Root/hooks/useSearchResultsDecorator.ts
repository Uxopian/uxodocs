import { useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PRODUCT_CONFIG } from "../config/productConfig";

/**
 * Detects product from URL path or text
 */
function detectProductFromUrl(url: string): string | null {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.match(/\/docs\/arender[\/\?#]|docs\/arender[\/\?#]|\/docs\/arender$/))
        return "arender";
    if (lowerUrl.match(/\/docs\/fast2[\/\?#]|docs\/fast2[\/\?#]|\/docs\/fast2$/)) return "fast2";
    if (lowerUrl.match(/\/docs\/flowerdocs[\/\?#]|docs\/flowerdocs[\/\?#]|\/docs\/flowerdocs$/))
        return "flowerdocs";
    if (lowerUrl.match(/\/docs\/uxopian-ai[\/\?#]|docs\/uxopian-ai[\/\?#]|\/docs\/uxopian-ai$/))
        return "uxopian-ai";
    return null;
}

/**
 * Detects product from version string or path text
 */
function detectProductFromText(text: string): string | null {
    if (!text) return null;

    if (text.includes("ARender") || text.includes("arender")) return "arender";
    if (text.includes("Fast2") || text.includes("fast2")) return "fast2";
    if (text.includes("FlowerDocs") || text.includes("flowerdocs")) return "flowerdocs";
    if (text.includes("Uxopian") || text.includes("uxopian-ai")) return "uxopian-ai";

    // Detect from version patterns
    if (text.match(/v202[34]\.\d/)) return "arender";
    if (text.match(/v2025\.3/)) return "flowerdocs";
    if (text.match(/v2025\.[012456789x]/)) return "fast2";
    if (text.match(/v2026/)) return "uxopian-ai";

    return null;
}

/**
 * Hook to decorate search results with product logos and styling
 * Works for both dropdown results AND the /search page
 */
export function useSearchResultsDecorator() {
    const { siteConfig } = useDocusaurusContext();
    const baseUrl = siteConfig.baseUrl;

    useEffect(() => {
        // Decorate dropdown search results
        const decorateDropdownResults = () => {
            const dropdownMenu = document.querySelector('[class*="dropdownMenu"]');
            if (!dropdownMenu) return;

            const suggestions = dropdownMenu.querySelectorAll('[class*="suggestion"]');

            suggestions.forEach((suggestion) => {
                if (suggestion.className.includes("suggestions")) return;
                if (suggestion.querySelector(".search-product-logo")) return;

                const suggestionEl = suggestion as HTMLElement;
                const hitWrapper = suggestion.querySelector('[class*="hitWrapper"]');
                if (!hitWrapper) return;

                const hitPath = suggestion.querySelector(
                    '[class*="hitPath"]'
                ) as HTMLElement | null;

                let product: string | null = null;

                // Try to detect product from URL marker
                const urlMarker = suggestionEl.querySelector(
                    ".search-doc-url"
                ) as HTMLElement | null;
                if (urlMarker?.dataset?.url) {
                    product = detectProductFromUrl(urlMarker.dataset.url);
                }

                // Try from closest link
                if (!product) {
                    const link =
                        (suggestionEl.closest("a[href]") as HTMLAnchorElement | null) ||
                        (suggestionEl.querySelector("a[href]") as HTMLAnchorElement | null);
                    if (link?.href) {
                        product = detectProductFromUrl(link.href);
                    }
                }

                // Try from all links
                if (!product) {
                    const allLinks = suggestionEl.querySelectorAll("a[href]");
                    Array.from(allLinks).forEach((a) => {
                        if (product) return;
                        const href = (a as HTMLAnchorElement).href;
                        product = detectProductFromUrl(href);
                    });
                }

                // Try from data attributes
                if (!product) {
                    const allDataAttrs = Object.values(suggestionEl.dataset || {}).join(" ");
                    product = detectProductFromUrl(allDataAttrs);
                }

                // Try from path text content
                if (!product && hitPath?.textContent) {
                    product = detectProductFromText(hitPath.textContent);
                }

                if (!product) return;

                const config = PRODUCT_CONFIG[product];
                if (!config) return;

                const logoUrl = baseUrl.replace(/\/$/, "") + config.logo;

                // Hide default icons
                const hitIcon = suggestion.querySelector('[class*="hitIcon"]');
                if (hitIcon) {
                    (hitIcon as HTMLElement).style.cssText = "display: none !important;";
                }

                const hitTree = suggestion.querySelector('[class*="hitTree"]');
                if (hitTree) {
                    (hitTree as HTMLElement).style.cssText = "display: none !important;";
                }

                const hitAction = suggestion.querySelector('[class*="hitAction"]');
                if (hitAction) {
                    (hitAction as HTMLElement).style.cssText = "display: none !important;";
                }

                // Update path text with product name
                if (hitPath) {
                    updatePathWithProductName(hitPath, config.name);
                }

                // Add product logo
                const logoContainer = createProductLogo(logoUrl, config.bgColor);
                suggestionEl.insertBefore(logoContainer, suggestionEl.firstChild);
                suggestionEl.style.display = "flex";
                suggestionEl.style.alignItems = "center";

                // Add preview on hover
                const urlMarkerForPreview = suggestionEl.querySelector(
                    ".search-doc-url"
                ) as HTMLElement | null;
                const docUrl = urlMarkerForPreview?.dataset?.url;

                if (docUrl) {
                    addPreviewContainer(suggestionEl, docUrl, baseUrl);
                }
            });
        };

        // Note: Search page decoration is handled by the custom SearchPage component
        // This function is kept empty to avoid duplicating logos
        const decorateSearchPageResults = () => {
            // Intentionally empty - SearchPage component handles its own decoration
        };

        // Combined decorator
        const decorateAll = () => {
            decorateDropdownResults();
            decorateSearchPageResults();
        };

        // Initial decoration
        decorateAll();

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0 || mutation.type === "childList") {
                    setTimeout(decorateAll, 10);
                    setTimeout(decorateAll, 50);
                    setTimeout(decorateAll, 150);
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        const themeObserver = new MutationObserver(() => {
            document
                .querySelectorAll(".search-product-logo, .search-product-badge")
                .forEach((el) => el.remove());
            setTimeout(decorateAll, 50);
        });

        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => {
            observer.disconnect();
            themeObserver.disconnect();
        };
    }, [baseUrl]);
}

/**
 * Creates a product logo element
 */
function createProductLogo(logoUrl: string, bgColor: string, size: number = 34): HTMLDivElement {
    const logoContainer = document.createElement("div");
    logoContainer.className = "search-product-logo";
    logoContainer.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    min-width: ${size}px;
    background-image: url('${logoUrl}');
    background-size: 55%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${bgColor};
    border-radius: 8px;
    margin-right: 12px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    flex-shrink: 0;
  `;
    return logoContainer;
}

/**
 * Updates path text to show product name instead of version
 */
function updatePathWithProductName(pathEl: HTMLElement, productName: string) {
    let pathText = pathEl.textContent || "";

    const startsWithProductName =
        pathText.startsWith("Fast2") ||
        pathText.startsWith("ARender") ||
        pathText.startsWith("FlowerDocs") ||
        pathText.startsWith("Uxopian");

    // Replace version patterns like "v2023.14.0" or "v2025.3.0" with product name
    const versionPattern = /^v\d{4}(?:\.\d+)*(?:\.x)?\s*[›>•·\-]?\s*/i;

    if (versionPattern.test(pathText)) {
        pathText = pathText.replace(versionPattern, productName + " › ");
    } else if (!startsWithProductName) {
        // Don't add if it already starts with product name
        // pathText = productName + ' › ' + pathText;
    }

    pathEl.textContent = pathText;
}

/**
 * Adds a preview container that shows on hover
 */
function addPreviewContainer(suggestionEl: HTMLElement, docUrl: string, baseUrl: string) {
    const previewContainer = document.createElement("div");
    previewContainer.className = "search-preview";
    previewContainer.style.cssText = `
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    width: 350px;
    max-height: 300px;
    overflow: hidden;
    background: var(--ifm-background-color, #1b1b1d);
    border: 1px solid var(--ifm-color-emphasis-300, #444);
    border-radius: 8px;
    padding: 12px;
    margin-left: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 1000;
    font-size: 13px;
    line-height: 1.5;
    color: var(--ifm-font-color-base, #e3e3e3);
  `;
    previewContainer.innerHTML =
        '<div style="color: #888; font-style: italic;">Chargement...</div>';

    suggestionEl.style.position = "relative";
    suggestionEl.appendChild(previewContainer);

    let previewLoaded = false;
    let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

    suggestionEl.addEventListener("mouseenter", () => {
        hoverTimeout = setTimeout(() => {
            previewContainer.style.display = "block";

            const rect = previewContainer.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
                previewContainer.style.left = "auto";
                previewContainer.style.right = "100%";
                previewContainer.style.marginLeft = "0";
                previewContainer.style.marginRight = "8px";
            }
            if (rect.bottom > window.innerHeight) {
                previewContainer.style.top = "auto";
                previewContainer.style.bottom = "0";
            }

            if (!previewLoaded) {
                previewLoaded = true;
                const fullUrl = baseUrl.replace(/\/$/, "") + "/" + docUrl.replace(/^\//, "");

                fetch(fullUrl)
                    .then((res) => res.text())
                    .then((html) => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, "text/html");

                        const article =
                            doc.querySelector("article") ||
                            doc.querySelector(".markdown") ||
                            doc.querySelector("main");
                        if (article) {
                            let text = article.textContent || "";
                            text = text.replace(/\s+/g, " ").trim();
                            if (text.length > 300) {
                                text = text.substring(0, 300) + "...";
                            }
                            previewContainer.innerHTML = text || "<em>Aucun aperçu disponible</em>";
                        } else {
                            previewContainer.innerHTML = "<em>Aucun aperçu disponible</em>";
                        }
                    })
                    .catch(() => {
                        previewContainer.innerHTML = "<em>Erreur de chargement</em>";
                    });
            }
        }, 300);
    });

    suggestionEl.addEventListener("mouseleave", () => {
        if (hoverTimeout) {
            clearTimeout(hoverTimeout);
            hoverTimeout = null;
        }
        previewContainer.style.display = "none";
    });
}
