import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import UXopianFeed from "../FlowerDocsCards/UXopianFeed";

export default function UxopianAICards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <h1 className={styles.mainTitle}>
                            🚀 Welcome to <strong>uxopian-ai</strong>
                        </h1>

                        <p className={styles.intro}>
                            <strong>uxopian-ai</strong> is a complete, standalone framework designed
                            to accelerate and simplify the integration of powerful AI features into
                            any enterprise application.
                        </p>

                        <p className={styles.highlight}>
                            Built on a solid foundation of <strong>Java 21 LTS</strong> and{" "}
                            <strong>Spring 3.5</strong>, it goes far beyond a simple library by
                            providing a full suite of tools — from backend services to frontend
                            components — to create sophisticated, reliable, and scalable AI
                            solutions.
                        </p>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>
                            ✨ The uxopian-ai Advantage: <em>More Than Just a Library</em>
                        </h2>

                        <p className={styles.sectionContent}>
                            While <strong>uxopian-ai</strong> uses the excellent{" "}
                            <strong>Langchain4j</strong> library as its core for LLM interactions,
                            it builds a complete enterprise-ready ecosystem around it. Here's the
                            added value:
                        </p>

                        <ul className={styles.featureList}>
                            <li>
                                ✅ <strong>Standalone Service, Not Just Code</strong> — A
                                pre-packaged, deployable service that saves you months of
                                development and infrastructure setup.
                            </li>
                            <li>
                                ✅ <strong>Ready-to-Use UI Components</strong> — Instantly integrate
                                AI with web-components (IIFE compiled, scoped CSS), plus
                                plug-and-play integration scripts.
                            </li>
                            <li>
                                ✅ <strong>Advanced Orchestration Engine</strong> — The unique{" "}
                                <strong>Goal</strong> system enables dynamic prompt selection based
                                on context — no need to build this from scratch.
                            </li>
                            <li>
                                ✅ <strong>Complete Conversation Management</strong> — Persistent
                                conversations with cost tracking, response regeneration, and user
                                feedback support.
                            </li>
                            <li>
                                ✅ <strong>Data-Driven Insights</strong> — A comprehensive admin
                                panel to monitor ROI, token usage, and adoption trends.
                            </li>
                        </ul>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>🔍 Key Features at a Glance</h2>

                        <h3 className={styles.subSectionTitle}>
                            ⚙️ Effortless & Scalable Integration
                        </h3>
                        <ul className={styles.featureList}>
                            <li>
                                <strong>Standalone Service</strong>: Deployable via Docker or as a
                                Java 21 application.
                            </li>
                            <li>
                                <strong>Multi-Tenant Architecture</strong>: Designed for internal
                                deployments with clear logical separation and distinct tenant
                                management.
                            </li>
                            <li>
                                <strong>Web-Component UI</strong>: Lightweight, embeddable
                                components for any web app.
                            </li>
                            <li>
                                <strong>Rich REST API</strong>: Fully documented (Swagger) for
                                seamless integration.
                            </li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>
                            📊 Powerful Admin & Analytics
                        </h3>
                        <ul className={styles.featureList}>
                            <li>
                                <strong>Granular Token Monitoring</strong>: Visualize input and
                                output token consumption globally, by specific users, or per
                                conversation.
                            </li>
                            <li>
                                <strong>ROI & Efficiency Tracking</strong>: View the number of
                                times a prompt is used and estimate the total time saved.
                            </li>
                            <li>
                                <strong>Usage Trends</strong>: Analyze activity over time, monitor
                                LLM model distribution, and track advanced feature adoption.
                            </li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>🧠 Intelligent Orchestration</h3>
                        <ul className={styles.featureList}>
                            <li>
                                <strong>Goal System</strong>: Define context-aware workflows using
                                filters and priorities.
                            </li>
                            <li>
                                <strong>Templating Engine</strong>: Dynamic data injection, custom
                                Java services, and conditional logic with Thymeleaf.
                            </li>
                            <li>
                                <strong>Template Helpers</strong>: Add your own Java functions to
                                enrich prompts.
                            </li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>🤖 Robust LLM Interaction</h3>
                        <ul className={styles.featureList}>
                            <li>
                                <strong>Broad Support</strong>: Compatible with many LLM providers
                                out-of-the-box.
                            </li>
                            <li>
                                <strong>Custom Connectors</strong>: Add private or fine-tuned models
                                easily.
                            </li>
                            <li>
                                <strong>Advanced Features</strong>: Native support for{" "}
                                <strong>function calling</strong>, multi-modal requests (text +
                                image), and streaming/non-streaming responses.
                            </li>
                            <li>
                                <strong>MCP Server Client</strong>: Acts as a client for Model
                                Context Protocol (MCP) servers.
                            </li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>
                            💬 Complete Conversation Management
                        </h3>
                        <ul className={styles.featureList}>
                            <li>
                                <strong>Persistent History</strong>: Conversations and messages are
                                stored with full context.
                            </li>
                            <li>
                                <strong>Feedback Loop</strong>: Gather specific user feedback
                                (Good/Bad/Neutral) on responses to improve prompt quality.
                            </li>
                            <li>
                                <strong>Rich UX</strong>: Regenerate, copy, and manage conversation
                                content easily.
                            </li>
                        </ul>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>📖 Reading Paths</h2>
                        <p className={styles.sectionContent}>
                            Choose the path that matches your role:
                        </p>

                        <h3 className={styles.subSectionTitle}>New to uxopian-ai?</h3>
                        <ol className={styles.featureList}>
                            <li>
                                <Link to="/docs/uxopian-ai/getting_started/quickstart">
                                    <strong>Quick Start</strong>
                                </Link>{" "}
                                — Your first AI exchange in 5 minutes.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/understanding/concepts">
                                    <strong>Core Concepts</strong>
                                </Link>{" "}
                                — Understand Prompts, Goals, and Conversations.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/understanding/architecture">
                                    <strong>Architecture Overview</strong>
                                </Link>{" "}
                                — See how the components fit together.
                            </li>
                        </ol>

                        <h3 className={styles.subSectionTitle}>Operator / DevOps?</h3>
                        <ol className={styles.featureList}>
                            <li>
                                <Link to="/docs/uxopian-ai/getting_started/installation_guide">
                                    <strong>Deploy with Docker</strong>
                                </Link>{" "}
                                — Set up the full stack.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/reference/config_files">
                                    <strong>Configuration Files</strong>
                                </Link>{" "}
                                — YAML reference for all config files.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/reference/env_variables">
                                    <strong>Environment Variables</strong>
                                </Link>{" "}
                                — Quick reference for Docker deployments.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/how_to/backup_recovery">
                                    <strong>Backup and Recovery</strong>
                                </Link>{" "}
                                — Protect your data.
                            </li>
                        </ol>

                        <h3 className={styles.subSectionTitle}>Integrator?</h3>
                        <ol className={styles.featureList}>
                            <li>
                                <Link to="/docs/uxopian-ai/understanding/architecture">
                                    <strong>Architecture Overview</strong>
                                </Link>{" "}
                                — Understand the BFF pattern.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/how_to/integrate_web_page">
                                    <strong>Embedding in a Web Page</strong>
                                </Link>{" "}
                                — Add AI to any web app.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/how_to/integrate_arender">
                                    <strong>Integrating with ARender</strong>
                                </Link>{" "}
                                — Add AI buttons in ARender.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/how_to/integrate_flowerdocs">
                                    <strong>Integrating with FlowerDocs</strong>
                                </Link>{" "}
                                — Add AI features in FlowerDocs.
                            </li>
                        </ol>

                        <h3 className={styles.subSectionTitle}>Java Developer?</h3>
                        <ol className={styles.featureList}>
                            <li>
                                <Link to="/docs/uxopian-ai/understanding/concepts">
                                    <strong>Core Concepts</strong>
                                </Link>{" "}
                                — Understand the domain model.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/understanding/templating">
                                    <strong>The Templating Engine</strong>
                                </Link>{" "}
                                — Master dynamic prompt authoring.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/extending/custom_helpers">
                                    <strong>Creating Custom Helpers</strong>
                                </Link>{" "}
                                — Inject your own data into prompts.
                            </li>
                            <li>
                                <Link to="/docs/uxopian-ai/extending/custom_tools">
                                    <strong>Creating Custom Tools</strong>
                                </Link>{" "}
                                — Give the LLM the ability to take actions.
                            </li>
                        </ol>
                    </div>

                    <aside className={styles.rightColumn} aria-label="UXopian blog preview">
                        <UXopianFeed />
                    </aside>
                </div>
            </div>
        </section>
    );
}
