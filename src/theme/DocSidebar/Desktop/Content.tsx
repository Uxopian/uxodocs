import React from "react";
import Content from "@theme-original/DocSidebar/Desktop/Content";
import type ContentType from "@theme/DocSidebar/Desktop/Content";
import type { WrapperProps } from "@docusaurus/types";
import { useLocation } from "@docusaurus/router";
import ViewerToggle from "@site/src/components/ViewerToggle/ViewerToggle";

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): React.ReactElement {
    const { pathname } = useLocation();
    // Show the viewer toggle on the modern ARender layout: the current version
    // and every v2026+ snapshot. Only the legacy versioned pages
    // (/docs/arender/v4/..., /docs/arender/v2023.x/...) have no Horizon viewer,
    // so we exclude those explicitly. Gating on "no version segment" instead
    // would drop the toggle from a v2026.x page as soon as a newer version ships.
    const isARenderModernLayout =
        pathname.startsWith("/docs/arender") &&
        !/^\/docs\/arender\/v(4|2023)\b/.test(pathname);

    // The parent of this component is a flex column (the sidebar).
    // We render the toggle as a separate flex item that won't shrink,
    // then the Content (menu nav) takes the remaining space and scrolls.
    return (
        <>
            {isARenderModernLayout && <ViewerToggle />}
            <Content {...props} />
        </>
    );
}
