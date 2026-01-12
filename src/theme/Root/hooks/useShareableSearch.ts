import { useEffect, useCallback, useRef } from "react";
import { useLocation, useHistory } from "@docusaurus/router";

// SVG icons
const SHARE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`;
const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

/**
 * Hook to handle shareable search via ?q= URL parameter
 * Redirects to search page when ?q= is present
 * and adds a share button to copy the search URL
 */
export function useShareableSearch() {
    const location = useLocation();
    const history = useHistory();
    const observerRef = useRef<MutationObserver | null>(null);
    const hasProcessedQuery = useRef(false);

    // Function to add share button to the search dropdown
    const addShareButton = useCallback(() => {
        // Target the dropdown menu that appears when searching
        const dropdownMenu = document.querySelector('[class*="dropdownMenu"]');
        if (!dropdownMenu) return;

        // Check if button already exists anywhere in dropdown
        if (dropdownMenu.querySelector(".search-share-btn")) return;

        // Find the search input inside dropdown
        const searchInput = dropdownMenu.querySelector('input[type="search"]') as HTMLInputElement;
        if (!searchInput) return;

        // Find the parent that can hold the button - try multiple selectors
        let container = searchInput.parentElement as HTMLElement;

        // Create share button
        const shareBtn = document.createElement("button");
        shareBtn.className = "search-share-btn";
        shareBtn.type = "button";
        shareBtn.title = "Copy search link";
        shareBtn.innerHTML = SHARE_ICON;

        // Style the button
        shareBtn.style.cssText = `
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 4px;
      color: var(--ifm-color-emphasis-500);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      opacity: 0;
      pointer-events: none;
      flex-shrink: 0;
    `;

        // Hover effects
        shareBtn.addEventListener("mouseenter", () => {
            shareBtn.style.background = "var(--ifm-color-emphasis-200)";
            shareBtn.style.color = "var(--ifm-color-primary)";
        });

        shareBtn.addEventListener("mouseleave", () => {
            shareBtn.style.background = "transparent";
            shareBtn.style.color = "var(--ifm-color-emphasis-500)";
        });

        // Click handler - copy URL with ?q= pointing to search page
        shareBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const query = searchInput.value.trim();
            if (!query) return;

            // Create URL to the search page
            const url = new URL(window.location.origin + window.location.pathname);
            url.pathname = "/search";
            url.searchParams.set("q", query);

            navigator.clipboard.writeText(url.toString()).then(() => {
                shareBtn.innerHTML = CHECK_ICON;
                shareBtn.style.color = "#10b981";

                setTimeout(() => {
                    shareBtn.innerHTML = SHARE_ICON;
                    shareBtn.style.color = "var(--ifm-color-emphasis-500)";
                }, 1500);
            });
        });

        // Insert button next to the clear button (×)
        // Find the clear button or any button in the header area
        const headerArea =
            dropdownMenu.querySelector('[class*="searchBar"]') ||
            dropdownMenu.querySelector('[class*="inputWrapper"]')?.parentElement ||
            container.parentElement;

        if (headerArea) {
            // Look for existing buttons/icons area
            const existingBtn = headerArea.querySelector("button:not(.search-share-btn)");
            if (existingBtn && existingBtn.parentElement) {
                existingBtn.parentElement.insertBefore(shareBtn, existingBtn);
            } else {
                headerArea.appendChild(shareBtn);
            }
        } else {
            container.appendChild(shareBtn);
        }

        // Update visibility based on input value
        const updateVisibility = () => {
            const hasValue = searchInput.value.trim().length > 0;
            shareBtn.style.opacity = hasValue ? "1" : "0";
            shareBtn.style.pointerEvents = hasValue ? "auto" : "none";
        };

        searchInput.addEventListener("input", updateVisibility);
        updateVisibility();
    }, []);

    // Handle ?q= parameter - redirect to search page
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get("q");

        // If we have ?q= and we're NOT already on the search page, redirect
        if (searchQuery && !hasProcessedQuery.current) {
            hasProcessedQuery.current = true;

            // If not already on search page, redirect to it
            if (!location.pathname.includes("/search")) {
                history.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                return;
            }

            // If on search page, fill the search input
            const fillSearchInput = () => {
                const searchInput = document.querySelector(
                    'input[type="search"]'
                ) as HTMLInputElement;

                if (searchInput) {
                    searchInput.focus();

                    // Use native setter to properly trigger React state
                    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                        window.HTMLInputElement.prototype,
                        "value"
                    )?.set;

                    if (nativeInputValueSetter) {
                        nativeInputValueSetter.call(searchInput, searchQuery);
                    } else {
                        searchInput.value = searchQuery;
                    }

                    // Dispatch input event to trigger search
                    searchInput.dispatchEvent(
                        new Event("input", { bubbles: true, cancelable: true })
                    );

                    return true;
                }
                return false;
            };

            // Retry until search input is available
            let attempts = 0;
            const maxAttempts = 50;

            const tryFillSearch = () => {
                if (fillSearchInput()) return;

                attempts++;
                if (attempts < maxAttempts) {
                    setTimeout(tryFillSearch, 100);
                }
            };

            setTimeout(tryFillSearch, 200);
        }
    }, [location.search, location.pathname, history]);

    // Reset processed flag when location changes
    useEffect(() => {
        hasProcessedQuery.current = false;
    }, [location.pathname]);

    // Observe DOM changes to add share button when dropdown appears
    useEffect(() => {
        addShareButton();

        observerRef.current = new MutationObserver(() => {
            const hasDropdown = document.querySelector('[class*="dropdownMenu"]');
            if (hasDropdown) {
                setTimeout(addShareButton, 20);
                setTimeout(addShareButton, 100);
            }
        });

        observerRef.current.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observerRef.current?.disconnect();
        };
    }, [addShareButton]);
}
