import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import UXopianFeed from '../FlowerDocsCards/UXopianFeed';

export default function UxopianAICards() {
    return (
        <section className={styles.documentationSection}>
            <div className="container">
                <div className={styles.layoutWrapper}>
                    <div className={styles.leftColumn}>
                        <h1 className={styles.mainTitle}>🚀 Welcome to <strong>uxopian-ai</strong></h1>
                        
                        <p className={styles.intro}>
                            <strong>uxopian-ai</strong> is a complete, standalone framework designed to accelerate and simplify the integration of powerful AI features into any enterprise application.
                        </p>

                        <p className={styles.highlight}>
                            Built on a solid foundation of <strong>Java 21 LTS</strong> and <strong>Spring 3.5</strong>, it goes far beyond a simple library by providing a full suite of tools — from backend services to frontend components — to create sophisticated, reliable, and scalable AI solutions.
                        </p>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>✨ The uxopian-ai Advantage: <em>More Than Just a Library</em></h2>
                        
                        <p className={styles.sectionContent}>
                            While <strong>uxopian-ai</strong> uses the excellent <strong>Langchain4j</strong> library as its core for LLM interactions, it builds a complete enterprise-ready ecosystem around it. Here's the added value:
                        </p>

                        <ul className={styles.featureList}>
                            <li>✅ <strong>Standalone Service, Not Just Code</strong> — A pre-packaged, deployable service that saves you months of development and infrastructure setup.</li>
                            <li>✅ <strong>Ready-to-Use UI Components</strong> — Instantly integrate AI with web-components (IIFE compiled, scoped CSS), plus plug-and-play integration scripts.</li>
                            <li>✅ <strong>Advanced Orchestration Engine</strong> — The unique <strong>Goal</strong> system enables dynamic prompt selection based on context — no need to build this from scratch.</li>
                            <li>✅ <strong>Complete Conversation Management</strong> — Persistent conversations with cost tracking, response regeneration, and user feedback support.</li>
                            <li>✅ <strong>Simplified Extensibility</strong> — Easily add custom LLM connectors or template helpers through a clean, plugin-style architecture.</li>
                        </ul>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>🔍 Key Features at a Glance</h2>

                        <h3 className={styles.subSectionTitle}>⚙️ Effortless Integration</h3>
                        <ul className={styles.featureList}>
                            <li><strong>Standalone Service</strong>: Deployable via Docker or as a Java 21 application.</li>
                            <li><strong>Web-Component UI</strong>: Lightweight, embeddable components for any web app.</li>
                            <li><strong>Rich REST API</strong>: Fully documented (Swagger) for seamless integration.</li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>🧠 Intelligent Orchestration</h3>
                        <ul className={styles.featureList}>
                            <li><strong>Goal System</strong>: Define context-aware workflows using filters and priorities.</li>
                            <li><strong>Templating Engine</strong>: Dynamic data injection, custom Java services, and conditional logic with Thymeleaf.</li>
                            <li><strong>Template Helpers</strong>: Add your own Java functions to enrich prompts.</li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>🤖 Robust LLM Interaction</h3>
                        <ul className={styles.featureList}>
                            <li><strong>Broad Support</strong>: Compatible with many LLM providers out-of-the-box.</li>
                            <li><strong>Custom Connectors</strong>: Add private or fine-tuned models easily.</li>
                            <li><strong>Advanced Features</strong>: Native support for <strong>function calling</strong>, multi-modal requests (text + image), and streaming/non-streaming responses.</li>
                            <li><strong>MCP Server Client</strong>: Acts as a client for Multi-Content Platform (MCP) servers.</li>
                        </ul>

                        <h3 className={styles.subSectionTitle}>💬 Complete Conversation Management</h3>
                        <ul className={styles.featureList}>
                            <li><strong>Persistent History</strong>: Conversations and messages are stored with full context.</li>
                            <li><strong>Cost & Feedback Tracking</strong>: Monitor token usage and gather user feedback.</li>
                            <li><strong>Rich UX</strong>: Regenerate, copy, and manage conversation content easily.</li>
                        </ul>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>👥 Who Is This For?</h2>
                        <p className={styles.sectionContent}>
                            This documentation is tailored for <strong>integrators and developers</strong> looking to deploy, configure, and extend the <strong>uxopian-ai</strong> framework to deliver cutting-edge AI features faster.
                        </p>

                        <hr className={styles.divider} />

                        <h2 className={styles.sectionTitle}>🚀 Getting Started</h2>
                        <p className={styles.sectionContent}>
                            Ready to dive in? Check out the <Link to="/docs/uxopian-ai/getting-started/installation-guide"><strong>Installation Guide</strong></Link> to set up your first instance of <strong>uxopian-ai</strong>.
                        </p>
                    </div>

                    <aside className={styles.rightColumn} aria-label="UXopian blog preview">
                        <UXopianFeed />
                    </aside>
                </div>
            </div>
        </section>
    );
}
