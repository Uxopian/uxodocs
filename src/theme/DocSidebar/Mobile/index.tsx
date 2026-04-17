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
    // Show the viewer toggle only for current (2026+) — not on old versioned pages.
    const isARenderCurrent =
        pathname.startsWith("/docs/arender") && !/^\/docs\/arender\/v\d/.test(pathname);

    return (
        <>
            {isARenderCurrent && <ViewerToggle />}
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
