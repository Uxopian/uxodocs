import React from "react";
import clsx from "clsx";
import {
    NavbarSecondaryMenuFiller,
    ThemeClassNames,
} from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";
import DocSidebarItems from "@theme/DocSidebarItems";
import ViewerToggle from "@site/src/components/ViewerToggle/ViewerToggle";

const DocSidebarMobileSecondaryMenu = ({ sidebar, path }) => {
    const mobileSidebar = useNavbarMobileSidebar();
    const { pathname } = useLocation();
    // Show the viewer toggle on the modern ARender layout: the current version
    // and every v2026+ snapshot. Only the legacy versioned pages (v4, v2023.x)
    // have no Horizon viewer, so we exclude those explicitly rather than gating
    // on "no version segment" (which would drop off a v2026.x page as soon as a
    // newer version ships).
    const isARenderModernLayout =
        pathname.startsWith("/docs/arender") &&
        !/^\/docs\/arender\/v(4|2023)\b/.test(pathname);

    return (
        <>
            {isARenderModernLayout && <ViewerToggle />}
            <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
                <DocSidebarItems
                    items={sidebar}
                    activePath={path}
                    onItemClick={(item) => {
                        if (item.type === "category" && item.href) {
                            mobileSidebar.toggle();
                        }
                        if (item.type === "link") {
                            mobileSidebar.toggle();
                        }
                    }}
                    level={1}
                />
            </ul>
        </>
    );
};

function DocSidebarMobile(props) {
    return (
        <NavbarSecondaryMenuFiller
            component={DocSidebarMobileSecondaryMenu}
            props={props}
        />
    );
}

export default React.memo(DocSidebarMobile);
