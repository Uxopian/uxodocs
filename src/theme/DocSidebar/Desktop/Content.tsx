import React from "react";
import Content from "@theme-original/DocSidebar/Desktop/Content";
import type ContentType from "@theme/DocSidebar/Desktop/Content";
import type { WrapperProps } from "@docusaurus/types";
import { useLocation } from "@docusaurus/router";
import ViewerToggle from "@site/src/components/ViewerToggle/ViewerToggle";

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): React.ReactElement {
    const { pathname } = useLocation();
    // Show the viewer toggle only for the current (2026+) version.
    // Old versioned pages (/docs/arender/v4/..., /docs/arender/v2023.x/...) have
    // no Horizon viewer — the toggle is meaningless there.
    const isARenderCurrent =
        pathname.startsWith("/docs/arender") && !/^\/docs\/arender\/v\d/.test(pathname);

    // The parent of this component is a flex column (the sidebar).
    // We render the toggle as a separate flex item that won't shrink,
    // then the Content (menu nav) takes the remaining space and scrolls.
    return (
        <>
            {isARenderCurrent && <ViewerToggle />}
            <Content {...props} />
        </>
    );
}
