import React from "react";
import Layout from "@theme/Layout";
import FlowerDocsCards from "@site/src/components/FlowerDocsCards";

export default function FlowerDocsHomepage() {
    return (
        <Layout
            title="FlowerDocs Documentation"
            description="Documentation complète pour FlowerDocs"
        >
            <main>
                <FlowerDocsCards />
            </main>
        </Layout>
    );
}
