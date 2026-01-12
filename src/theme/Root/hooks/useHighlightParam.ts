import { useEffect } from "react";
import { useLocation } from "@docusaurus/router";

/**
 * Hook to highlight text on page based on URL parameter
 * Supports ?h=, ?highlight=, and ?_highlight= parameters
 */
export function useHighlightParam() {
    const location = useLocation();

    useEffect(() => {
        const doHighlight = () => {
            // Remove existing highlights
            document.querySelectorAll("mark.url-highlight").forEach((el) => {
                const parent = el.parentNode;
                if (parent) {
                    parent.replaceChild(document.createTextNode(el.textContent || ""), el);
                    parent.normalize();
                }
            });

            const params = new URLSearchParams(location.search);
            const highlightText =
                params.get("h") || params.get("highlight") || params.getAll("_highlight").join(",");

            if (!highlightText || highlightText.trim() === "") {
                return;
            }

            const searchTerms = highlightText
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
            if (searchTerms.length === 0) return;

            const pattern = new RegExp(
                `(${searchTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
                "gi"
            );

            const contentArea =
                document.querySelector(".markdown") ||
                document.querySelector("article") ||
                document.body;
            if (!contentArea) return;

            const walker = document.createTreeWalker(contentArea, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    if (!parent) return NodeFilter.FILTER_REJECT;
                    const tagName = parent.tagName.toLowerCase();
                    if (
                        ["script", "style", "mark", "textarea", "input", "code"].includes(tagName)
                    ) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                },
            });

            const textNodes: Text[] = [];
            let node;
            while ((node = walker.nextNode())) {
                if (pattern.test(node.textContent || "")) {
                    textNodes.push(node as Text);
                    pattern.lastIndex = 0;
                }
            }

            textNodes.forEach((textNode) => {
                const text = textNode.textContent || "";
                const parts = text.split(pattern);

                if (parts.length <= 1) return;

                const fragment = document.createDocumentFragment();
                parts.forEach((part) => {
                    if (pattern.test(part)) {
                        pattern.lastIndex = 0;
                        const mark = document.createElement("mark");
                        mark.className = "url-highlight";
                        mark.textContent = part;
                        fragment.appendChild(mark);
                    } else {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });

                textNode.parentNode?.replaceChild(fragment, textNode);
            });

            // Scroll to first highlight
            const firstHighlight = document.querySelector("mark.url-highlight");
            if (firstHighlight) {
                firstHighlight.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        };

        const timer = setTimeout(doHighlight, 300);
        return () => clearTimeout(timer);
    }, [location.search, location.pathname]);
}
