import { useEffect } from "react";

/**
 * Hook to copy the direct link to clipboard when clicking on heading anchor links
 * Shows a tooltip feedback to confirm the copy action
 */
export function useHeadingLinkCopy() {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            const hashLink = target.closest("a.hash-link") as HTMLAnchorElement | null;

            if (hashLink) {
                e.preventDefault();

                const url = hashLink.href;

                navigator.clipboard
                    .writeText(url)
                    .then(() => {
                        showCopiedTooltip(hashLink);
                    })
                    .catch((err) => {
                        const textArea = document.createElement("textarea");
                        textArea.value = url;
                        textArea.style.position = "fixed";
                        textArea.style.left = "-9999px";
                        document.body.appendChild(textArea);
                        textArea.select();
                        try {
                            document.execCommand("copy");
                            showCopiedTooltip(hashLink);
                        } catch (fallbackErr) {
                            console.error("Failed to copy link:", fallbackErr);
                        }
                        document.body.removeChild(textArea);
                    });
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
}

/**
 * Shows a tooltip indicating the link was copied
 */
function showCopiedTooltip(element: HTMLElement) {
    // Remove any existing tooltip
    const existingTooltip = document.querySelector(".heading-link-copied-tooltip");
    if (existingTooltip) {
        existingTooltip.remove();
    }

    const tooltip = document.createElement("div");
    tooltip.className = "heading-link-copied-tooltip";
    tooltip.textContent = "Link copied!";
    tooltip.style.cssText = `
    position: absolute;
    background: var(--ifm-color-primary, #651FFF);
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transform: translateY(-5px);
    transition: opacity 0.2s ease, transform 0.2s ease;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = rect.top + window.scrollY - tooltipRect.height - 8;
    let left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;

    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < window.scrollY + 10) {
        top = rect.bottom + window.scrollY + 8;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;

    requestAnimationFrame(() => {
        tooltip.style.opacity = "1";
        tooltip.style.transform = "translateY(0)";
    });

    setTimeout(() => {
        tooltip.style.opacity = "0";
        tooltip.style.transform = "translateY(-5px)";
        setTimeout(() => {
            tooltip.remove();
        }, 200);
    }, 1500);
}
