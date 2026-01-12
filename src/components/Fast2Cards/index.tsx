import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import UXopianFeed from "../FlowerDocsCards/UXopianFeed";

export default function Fast2Cards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <h1 className={styles.mainTitle}>
                            Welcome to Fast2 official documentation
                        </h1>

                        <p className={styles.intro}>
                            This comprehensive resource is designed to provide you with all the
                            information you need to effectively use and navigate our software.
                            Whether you're a new user or a seasoned professional, this documentation
                            will serve as your guide to understanding the features, functionalities,
                            and best practices of Fast2.
                        </p>

                        <h2 className={styles.sectionTitle}>Getting Started</h2>
                        <p className={styles.sectionContent}>
                            If you're new to Fast2, we recommend starting with the{" "}
                            <Link to="/docs/fast2/getting-started">Getting Started guide</Link>.
                            Here, you'll find step-by-step instructions on how to install and set up
                            the software, along with basic configuration and initial setup
                            processes. This section will help you quickly get up and running with
                            Fast2.
                        </p>

                        <h2 className={styles.sectionTitle}>Components</h2>
                        <p className={styles.sectionContent}>
                            The User Guides section contains detailed information on each aspect of
                            the software. From the core functionalities to advanced features, these
                            guides provide in-depth explanations, tutorials, and examples to help
                            you make the most of Fast2. Whether you're looking to perform specific
                            tasks, customize settings, or troubleshoot issues, the User Guides
                            section has you covered.
                        </p>

                        <h2 className={styles.sectionTitle}>Catalog</h2>
                        <p className={styles.sectionContent}>
                            The catalog section lists all the different tasks available, to help you
                            understand the basic and advanced configuration settings available.
                        </p>

                        <p className={styles.sectionContent}>
                            <strong>Advanced</strong> For developers and integrators, the API
                            Reference section provides detailed documentation on the available APIs,
                            libraries, and SDKs offered by Fast2. This resource will assist you in
                            integrating Fast2 with other systems, extending its capabilities, and
                            building custom applications.
                        </p>

                        <h2 className={styles.sectionTitle}>Cookbooks</h2>
                        <p className={styles.sectionContent}>
                            In this section, you'll unlock the power of data manipulation through
                            concise code snippets. Discover a wealth of practical examples and
                            operations to efficiently handle and transform your data. Whether you're
                            a novice or a seasoned programmer, our comprehensive collection of code
                            samples and step-by-step instructions will guide you in leveraging the
                            full potential of our software. Enhance your data manipulation skills
                            and unleash your creativity to achieve exceptional results in your
                            coding endeavors.
                        </p>

                        <p className={styles.sectionContent}>
                            We hope this documentation proves valuable in your journey with Fast2.
                            If you have any suggestions, feedback, or questions regarding the
                            documentation, please don't hesitate to reach out. Enjoy exploring Fast2
                            and unlocking its full potential!
                        </p>

                        <div className={styles.infoBox}>
                            <p>
                                For advanced questions or further assistance, please head out to the{" "}
                                <a
                                    href="https://arondor.atlassian.net/servicedesk/customer/portals"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Fast2 Support Customer Portal
                                </a>
                                .
                            </p>
                        </div>

                        <p className={styles.signature}>Fast2 Team ✌️</p>
                    </div>

                    <aside className={styles.rightColumn} aria-label="UXopian blog preview">
                        <UXopianFeed />
                    </aside>
                </div>
            </div>
        </section>
    );
}
