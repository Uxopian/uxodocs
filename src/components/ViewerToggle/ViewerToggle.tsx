import React from "react";
import { useLocation } from "@docusaurus/router";
import styles from "./ViewerToggle.module.css";
import arenderPages from "../../generated/arenderPages.json";

const CLASSIC_PREFIX = "/docs/arender";
const HORIZON_PREFIX = "/docs/arender-horizon";

// Build lookup sets of route paths for each tree
const classicPaths = new Set(
    (arenderPages.classic || []).map((s: string) => s.replace(/\/$/, ""))
);
const horizonPaths = new Set(
    (arenderPages.horizon || []).map((s: string) => s.replace(/\/$/, ""))
);

export default function ViewerToggle(): React.ReactElement {
    const { pathname } = useLocation();

    const isHorizon = pathname.startsWith(HORIZON_PREFIX + "/") || pathname === HORIZON_PREFIX;

    const handleSwitch = (target: "classic" | "horizon") => {
        if ((target === "horizon") === isHorizon) return;

        const fromPrefix = isHorizon ? HORIZON_PREFIX : CLASSIC_PREFIX;
        const toPrefix = target === "horizon" ? HORIZON_PREFIX : CLASSIC_PREFIX;
        const targetPaths = target === "horizon" ? horizonPaths : classicPaths;

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
                className={`${styles.segment} ${!isHorizon ? styles.active : ""}`}
                onClick={() => handleSwitch("classic")}
                aria-pressed={!isHorizon}
            >
                Classic
            </button>
            <button
                className={`${styles.segment} ${isHorizon ? styles.active : ""}`}
                onClick={() => handleSwitch("horizon")}
                aria-pressed={isHorizon}
            >
                Horizon
            </button>
        </div>
    );
}
