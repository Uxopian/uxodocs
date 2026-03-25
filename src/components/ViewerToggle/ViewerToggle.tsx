import React from "react";
import { useLocation } from "@docusaurus/router";
import styles from "./ViewerToggle.module.css";
import arenderPages from "../../generated/arenderPages.json";

const CLASSIC_PREFIX = "/docs/arender";
const MODERN_PREFIX = "/docs/arender-modern";

// Build lookup sets of route paths for each tree
const classicPaths = new Set(
    (arenderPages.classic || []).map((s: string) => s.replace(/\/$/, ""))
);
const modernPaths = new Set(
    (arenderPages.modern || []).map((s: string) => s.replace(/\/$/, ""))
);

export default function ViewerToggle(): React.ReactElement {
    const { pathname } = useLocation();

    const isModern = pathname.startsWith(MODERN_PREFIX + "/") || pathname === MODERN_PREFIX;

    const handleSwitch = (target: "classic" | "modern") => {
        if ((target === "modern") === isModern) return;

        const fromPrefix = isModern ? MODERN_PREFIX : CLASSIC_PREFIX;
        const toPrefix = target === "modern" ? MODERN_PREFIX : CLASSIC_PREFIX;
        const targetPaths = target === "modern" ? modernPaths : classicPaths;

        // Extract sub-path after the prefix, e.g. "/overview/architecture"
        const subPath = pathname.slice(fromPrefix.length).replace(/\/$/, "");

        // Check if the same path exists in the target tree
        let targetUrl: string;
        if (subPath && targetPaths.has(subPath)) {
            targetUrl = toPrefix + subPath;
        } else {
            targetUrl = toPrefix + "/overview";
        }

        // Full page load to properly reset all Docusaurus plugin context
        // (SecondaryNav, sidebar, CSS variables, active states)
        window.location.href = targetUrl;
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.segment} ${!isModern ? styles.active : ""}`}
                onClick={() => handleSwitch("classic")}
                aria-pressed={!isModern}
            >
                Classic
            </button>
            <button
                className={`${styles.segment} ${isModern ? styles.active : ""}`}
                onClick={() => handleSwitch("modern")}
                aria-pressed={isModern}
            >
                Modern
            </button>
        </div>
    );
}
