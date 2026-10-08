import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useLocation } from "@docusaurus/router";
import { translate } from "@docusaurus/Translate";
import IconHome from "@theme/Icon/Home";
import styles from "./styles.module.css";

export default function HomeBreadcrumbItem(): JSX.Element {
    const location = useLocation();

    // Extract the doc plugin path from the current URL
    // e.g., /uxodocs/docs/fast2/catalog/source → /docs/fast2
    // "arender-horizon" must come before "arender", otherwise "arender"
    // matches as a prefix and Horizon pages point to the Classic home.
    const pathMatch = location.pathname.match(/\/docs\/(fast2|arender-horizon|arender|flowerdocs|uxopian-ai)/);
    // The ARender trees have no index route: /docs/arender/ is only a static
    // meta-refresh stub, which the client-side router never loads and renders
    // as "Page Not Found". Link straight to the tree's overview instead.
    const isARenderTree = pathMatch?.[1] === "arender" || pathMatch?.[1] === "arender-horizon";
    const docBasePath = pathMatch ? `/docs/${pathMatch[1]}${isARenderTree ? "/overview" : ""}` : "/";

    const homeHref = useBaseUrl(docBasePath);

    // Show which viewer tree the reader is in, on the same pages as the
    // Classic/Horizon toggle: the legacy versioned pages (v4, v2023.x) have
    // no Horizon tree, so they get no badge.
    const isARenderModernLayout =
        location.pathname.startsWith("/docs/arender") &&
        !/^\/docs\/arender\/v(4|2023)\b/.test(location.pathname);
    const isHorizon = pathMatch?.[1] === "arender-horizon";

    return (
        <>
            <li className="breadcrumbs__item">
                <Link
                    aria-label={translate({
                        id: "theme.docs.breadcrumbs.home",
                        message: "Home page",
                        description: "The ARIA label for the home page in the breadcrumbs",
                    })}
                    className="breadcrumbs__link"
                    href={homeHref}
                >
                    <IconHome style={{ width: "1rem", height: "1rem", verticalAlign: "middle" }} />
                </Link>
            </li>
            {isARenderModernLayout && (
                <li className="breadcrumbs__item">
                    <Link
                        className={`${styles.viewerBadge} ${isHorizon ? styles.horizon : styles.classic}`}
                        href={homeHref}
                        title={isHorizon ? "You are reading the Horizon viewer documentation" : "You are reading the Classic viewer documentation"}
                    >
                        {isHorizon ? "Horizon" : "Classic"}
                    </Link>
                </li>
            )}
        </>
    );
}
