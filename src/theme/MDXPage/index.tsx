import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { PageMetadata, HtmlClassNameProvider, ThemeClassNames } from "@docusaurus/theme-common";
import Layout from "@theme/Layout";
import MDXContent from "@theme/MDXContent";
import TOC from "@theme/TOC";
import ContentVisibility from "@theme/ContentVisibility";
import EditMetaRow from "@theme/EditMetaRow";
import Fast2DownloadButton from "@site/src/components/Fast2DownloadButton";
import styles from "./styles.module.css";

const FAST2_RELEASE_PATH = "/release-note/fast2/";
const ANCHOR_ATTR = "data-fast2-download-anchor";

interface MDXPageProps {
    content: any;
}

export default function MDXPage(props: MDXPageProps) {
    const { content: MDXPageContent } = props;
    const { metadata, assets } = MDXPageContent;
    const { title, editUrl, description, frontMatter, lastUpdatedBy, lastUpdatedAt, permalink } =
        metadata;
    const { keywords, wrapperClassName, hide_table_of_contents: hideTableOfContents } = frontMatter;
    const image = assets.image ?? frontMatter.image;
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

    const isFast2Release =
        typeof permalink === "string" && permalink.startsWith(FAST2_RELEASE_PATH);
    const showDownloadButton =
        isFast2Release && frontMatter?.latest === true && typeof frontMatter?.version === "string";

    const articleRef = useRef<HTMLElement>(null);
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!showDownloadButton) return;
        const article = articleRef.current;
        if (!article) return;

        const firstHr = article.querySelector("hr");
        const placeholder = document.createElement("div");
        placeholder.setAttribute(ANCHOR_ATTR, "");

        if (firstHr && firstHr.parentNode) {
            firstHr.parentNode.insertBefore(placeholder, firstHr);
        } else {
            article.insertBefore(placeholder, article.firstChild);
        }
        setPortalNode(placeholder);

        return () => {
            placeholder.remove();
            setPortalNode(null);
        };
    }, [showDownloadButton, permalink]);

    return (
        <HtmlClassNameProvider
            className={clsx(
                wrapperClassName ?? ThemeClassNames.wrapper.mdxPages,
                ThemeClassNames.page.mdxPage
            )}
        >
            <Layout>
                <PageMetadata
                    title={title}
                    description={description}
                    keywords={keywords}
                    image={image}
                />
                <main className="container container--fluid margin-vert--lg">
                    <div className={clsx("row", styles.mdxPageWrapper)}>
                        <div className={clsx("col", !hideTableOfContents && "col--8")}>
                            <ContentVisibility metadata={metadata} />
                            <article ref={articleRef}>
                                <MDXContent>
                                    <MDXPageContent />
                                </MDXContent>
                                {showDownloadButton &&
                                    portalNode &&
                                    createPortal(
                                        <Fast2DownloadButton version={frontMatter.version} />,
                                        portalNode
                                    )}
                            </article>
                            {canDisplayEditMetaRow && (
                                <EditMetaRow
                                    className={clsx(
                                        "margin-top--sm",
                                        ThemeClassNames.pages.pageFooterEditMetaRow
                                    )}
                                    editUrl={editUrl}
                                    lastUpdatedAt={lastUpdatedAt}
                                    lastUpdatedBy={lastUpdatedBy}
                                />
                            )}
                        </div>
                        {!hideTableOfContents && MDXPageContent.toc.length > 0 && (
                            <div className="col col--2">
                                <TOC
                                    toc={MDXPageContent.toc}
                                    minHeadingLevel={frontMatter.toc_min_heading_level}
                                    maxHeadingLevel={frontMatter.toc_max_heading_level}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </Layout>
        </HtmlClassNameProvider>
    );
}
