import React from "react";
import { useLocation, useHistory } from "@docusaurus/router";
import styles from "./ViewerToggle.module.css";

export default function ViewerToggle(): React.ReactElement {
    const { pathname } = useLocation();
    const history = useHistory();

    const isReact = pathname.startsWith("/docs/arender-react");
    const isGwt = !isReact;

    const handleClick = (target: "gwt" | "react") => {
        if (target === "gwt" && !isGwt) {
            history.push("/docs/arender/");
        } else if (target === "react" && !isReact) {
            history.push("/docs/arender-react/");
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.segment} ${isGwt ? styles.active : ""}`}
                onClick={() => handleClick("gwt")}
                aria-pressed={isGwt}
            >
                Classic
            </button>
            <button
                className={`${styles.segment} ${isReact ? styles.active : ""}`}
                onClick={() => handleClick("react")}
                aria-pressed={isReact}
            >
                Modern
            </button>
        </div>
    );
}
