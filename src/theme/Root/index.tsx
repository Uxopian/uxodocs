import React, { JSX } from "react";
import {
    useShareableSearch,
    useHighlightParam,
    useSearchResultsDecorator,
    useHeadingLinkCopy,
} from "./hooks";
/**
 * Root component that wraps the entire Docusaurus site
 * Provides global hooks for search enhancement and URL-based features
 */
export default function Root({ children }: { children: React.ReactNode }): JSX.Element {
    useShareableSearch();
    useHighlightParam();
    useSearchResultsDecorator();
    useHeadingLinkCopy();
    return <>{children}</>;
}
