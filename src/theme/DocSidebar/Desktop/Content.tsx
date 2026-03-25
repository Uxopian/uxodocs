import React from "react";
import Content from "@theme-original/DocSidebar/Desktop/Content";
import type ContentType from "@theme/DocSidebar/Desktop/Content";
import type { WrapperProps } from "@docusaurus/types";
import { useLocation } from "@docusaurus/router";
import ViewerToggle from "@site/src/components/ViewerToggle/ViewerToggle";

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): React.ReactElement {
    const { pathname } = useLocation();
    const isARender = pathname.startsWith("/docs/arender");

    // The parent of this component is a flex column (the sidebar).
    // We render the toggle as a separate flex item that won't shrink,
    // then the Content (menu nav) takes the remaining space and scrolls.
    return (
        <>
            {isARender && <ViewerToggle />}
            <Content {...props} />
        </>
    );
}
