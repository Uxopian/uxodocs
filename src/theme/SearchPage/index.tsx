import React, { useCallback, useEffect, useMemo, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { usePluralForm } from "@docusaurus/theme-common";
import clsx from "clsx";
// @ts-ignore
import useSearchQuery from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/hooks/useSearchQuery";
// @ts-ignore
import { fetchIndexesByWorker, searchByWorker } from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/searchByWorker";
// @ts-ignore
import { SearchDocumentType } from "@easyops-cn/docusaurus-search-local/dist/client/shared/interfaces";
// @ts-ignore
import { highlight } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlight";
// @ts-ignore
import { highlightStemmed } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/highlightStemmed";
// @ts-ignore
import { getStemmedPositions } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/getStemmedPositions";
// @ts-ignore
import LoadingRing from "@easyops-cn/docusaurus-search-local/dist/client/client/theme/LoadingRing/LoadingRing";
// @ts-ignore
import { concatDocumentPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/concatDocumentPath";
// @ts-ignore
import { Mark, searchContextByPaths, useAllContextsWithNoSearchContext } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/proxiedGenerated";
// @ts-ignore
import { normalizeContextByPath } from "@easyops-cn/docusaurus-search-local/dist/client/client/utils/normalizeContextByPath";
import styles from "./SearchPage.module.css";

// Product configuration
const PRODUCT_CONFIG: Record<string, { name: string; logo: string; bgColor: string }> = {
  'fast2': {
    name: 'Fast2',
    logo: '/img/fast2/Fast2_favicon_white.png',
    bgColor: '#2D7D9A',
  },
  'arender': {
    name: 'ARender',
    logo: '/img/arender/arender_logo_white.png',
    bgColor: '#3A6FD8',
  },
  'flowerdocs': {
    name: 'FlowerDocs',
    logo: '/img/flowerdocs/logo_flower_white.png',
    bgColor: '#8B5CF6',
  },
  'uxopian-ai': {
    name: 'Uxopian AI',
    logo: '/img/uxo_white.png',
    bgColor: '#D97706',
  },
};

function detectProduct(url: string, pathText: string): string | null {
  const combined = (url + ' ' + pathText).toLowerCase();
  
  if (combined.includes('/docs/arender') || combined.includes('arender')) return 'arender';
  if (combined.includes('/docs/fast2') || combined.includes('fast2')) return 'fast2';
  if (combined.includes('/docs/flowerdocs') || combined.includes('flowerdocs')) return 'flowerdocs';
  if (combined.includes('/docs/uxopian-ai') || combined.includes('uxopian')) return 'uxopian-ai';
  
  // Version-based detection
  if (combined.match(/v202[34]\.\d/)) return 'arender';
  if (combined.match(/v2025\.3/)) return 'flowerdocs';
  if (combined.match(/v2025\.[012456789x]/)) return 'fast2';
  if (combined.match(/v2026/)) return 'uxopian-ai';
  
  return null;
}

function formatPathWithProduct(pathText: string, productName: string): string {
  // Replace version at the start with product name
  const versionPattern = /^v\d{4}(?:\.\d+)*(?:\.x)?\s*[›>•·\-]?\s*/i;
  
  if (versionPattern.test(pathText)) {
    return pathText.replace(versionPattern, productName + ' › ');
  }
  
  // If doesn't start with product name, prepend it
  if (!pathText.startsWith(productName)) {
    return productName + ' › ' + pathText;
  }
  
  return pathText;
}

export default function SearchPage() {
  return (
    <Layout>
      <SearchPageContent />
    </Layout>
  );
}

function SearchPageContent() {
  const {
    siteConfig: { baseUrl },
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { selectMessage } = usePluralForm();
  const {
    searchValue,
    searchContext,
    searchVersion,
    updateSearchPath,
    updateSearchContext,
  } = useSearchQuery();
  const [searchQuery, setSearchQuery] = useState(searchValue);
  const [searchResults, setSearchResults] = useState<any[]>();
  const versionUrl = `${baseUrl}${searchVersion}`;

  const pageTitle = useMemo(
    () =>
      searchQuery
        ? translate(
            {
              id: "theme.SearchPage.existingResultsTitle",
              message: 'Search results for "{query}"',
              description: "The search page title for non-empty query",
            },
            { query: searchQuery }
          )
        : translate({
            id: "theme.SearchPage.emptyResultsTitle",
            message: "Search the documentation",
            description: "The search page title for empty query",
          }),
    [searchQuery]
  );

  useEffect(() => {
    updateSearchPath(searchQuery);
    if (searchQuery) {
      (async () => {
        const results = await searchByWorker(
          versionUrl,
          searchContext,
          searchQuery,
          100
        );
        setSearchResults(results);
      })();
    } else {
      setSearchResults(undefined);
    }
  }, [searchQuery, versionUrl, searchContext]);

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (searchValue && searchValue !== searchQuery) {
      setSearchQuery(searchValue);
    }
  }, [searchValue]);

  const [searchWorkerReady, setSearchWorkerReady] = useState(false);
  useEffect(() => {
    async function doFetchIndexes() {
      if (
        !Array.isArray(searchContextByPaths) ||
        searchContext ||
        useAllContextsWithNoSearchContext
      ) {
        await fetchIndexesByWorker(versionUrl, searchContext);
      }
      setSearchWorkerReady(true);
    }
    doFetchIndexes();
  }, [searchContext, versionUrl]);

  return (
    <React.Fragment>
      <Head>
        <meta property="robots" content="noindex, follow" />
        <title>{pageTitle}</title>
      </Head>

      <div className="container margin-vert--lg">
        <h1>{pageTitle}</h1>

        <div className="row">
          <div
            className={clsx("col", {
              [styles.searchQueryColumn]: Array.isArray(searchContextByPaths),
              "col--9": Array.isArray(searchContextByPaths),
              "col--12": !Array.isArray(searchContextByPaths),
            })}
          >
            <input
              type="search"
              name="q"
              className={styles.searchQueryInput}
              aria-label="Search"
              onChange={handleSearchInputChange}
              value={searchQuery}
              autoComplete="off"
              autoFocus
            />
          </div>
          {Array.isArray(searchContextByPaths) ? (
            <div
              className={clsx(
                "col",
                "col--3",
                "padding-left--none",
                styles.searchContextColumn
              )}
            >
              <select
                name="search-context"
                className={styles.searchContextInput}
                id="context-selector"
                value={searchContext}
                onChange={(e) => updateSearchContext(e.target.value)}
              >
                {useAllContextsWithNoSearchContext && (
                  <option value="">
                    {translate({
                      id: "theme.SearchPage.searchContext.everywhere",
                      message: "Everywhere",
                    })}
                  </option>
                )}
                {searchContextByPaths.map((context: any) => {
                  const { label, path } = normalizeContextByPath(
                    context,
                    currentLocale
                  );
                  return (
                    <option key={path} value={path}>
                      {label}
                    </option>
                  );
                })}
              </select>
            </div>
          ) : null}
        </div>

        {!searchWorkerReady && searchQuery && (
          <div>
            <LoadingRing />
          </div>
        )}

        {searchResults &&
          (searchResults.length > 0 ? (
            <p>
              {selectMessage(
                searchResults.length,
                translate(
                  {
                    id: "theme.SearchPage.documentsFound.plurals",
                    message: "1 document found|{count} documents found",
                    description:
                      'Pluralized label for "{count} documents found".',
                  },
                  { count: searchResults.length }
                )
              )}
            </p>
          ) : process.env.NODE_ENV === "production" ? (
            <p>
              {translate({
                id: "theme.SearchPage.noResultsText",
                message: "No documents were found",
                description: "The paragraph for empty search result",
              })}
            </p>
          ) : (
            <p>
              ⚠️ The search index is only available when you run docusaurus
              build!
            </p>
          ))}

        <section>
          {searchResults &&
            searchResults.map((item: any) => (
              <SearchResultItem
                key={item.document.i}
                searchResult={item}
                baseUrl={baseUrl}
              />
            ))}
        </section>
      </div>
    </React.Fragment>
  );
}

function SearchResultItem({
  searchResult: { document, type, page, tokens, metadata },
  baseUrl,
}: {
  searchResult: any;
  baseUrl: string;
}) {
  const isTitle = type === SearchDocumentType.Title;
  const isKeywords = type === SearchDocumentType.Keywords;
  const isDescription = type === SearchDocumentType.Description;
  const isDescriptionOrKeywords = isDescription || isKeywords;
  const isTitleRelated = isTitle || isDescriptionOrKeywords;
  const isContent = type === SearchDocumentType.Content;
  const pathItems = (isTitle ? document.b : page.b).slice();
  const articleTitle =
    isContent || isDescriptionOrKeywords ? document.s : document.t;

  if (!isTitleRelated) {
    pathItems.push(page.t);
  }

  let search = "";
  if (Mark && tokens.length > 0) {
    const params = new URLSearchParams();
    for (const token of tokens) {
      params.append("_highlight", token);
    }
    search = `?${params.toString()}`;
  }

  // Detect product from URL and path
  const pathText = concatDocumentPath(pathItems);
  const product = detectProduct(document.u || '', pathText);
  const config = product ? PRODUCT_CONFIG[product] : null;
  const logoUrl = config ? baseUrl.replace(/\/$/, '') + config.logo : null;
  
  // Format path with product name
  const formattedPath = config ? formatPathWithProduct(pathText, config.name) : pathText;

  return (
    <article className={styles.searchResultItem}>
      <div className={styles.searchResultItemContent}>
        {config && logoUrl && (
          <div
            className={styles.productLogo}
            style={{
              backgroundImage: `url('${logoUrl}')`,
              backgroundColor: config.bgColor,
            }}
          />
        )}
        <div className={styles.searchResultItemText}>
          <h2>
            <Link
              to={document.u + search + (document.h || "")}
              dangerouslySetInnerHTML={{
                __html:
                  isContent || isDescriptionOrKeywords
                    ? highlight(articleTitle, tokens)
                    : highlightStemmed(
                        articleTitle,
                        getStemmedPositions(metadata, "t"),
                        tokens,
                        100
                      ),
              }}
            />
          </h2>
          {pathItems.length > 0 && (
            <p className={styles.searchResultItemPath}>{formattedPath}</p>
          )}
          {(isContent || isDescription) && (
            <p
              className={styles.searchResultItemSummary}
              dangerouslySetInnerHTML={{
                __html: highlightStemmed(
                  document.t,
                  getStemmedPositions(metadata, "t"),
                  tokens,
                  100
                ),
              }}
            />
          )}
        </div>
      </div>
    </article>
  );
}
