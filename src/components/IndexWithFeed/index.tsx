import React, { useState } from "react";
import UXopianFeed from "@site/src/components/FlowerDocsCards/UXopianFeed";
import styles from "./styles.module.css";

type Props = {
    children: React.ReactNode;
};

export default function IndexWithFeed({ children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>{children}</div>

            <div className={styles.drawerWrap} aria-hidden={!open}>
                <button
                    aria-expanded={open}
                    aria-controls="uxopian-feed-drawer"
                    className={styles.drawerToggle}
                    onClick={() => setOpen((s) => !s)}
                    title={open ? "Close articles" : "Open latest articles"}
                >
                    {open ? "×" : "Articles"}
                </button>

                <aside
                    id="uxopian-feed-drawer"
                    className={`${styles.drawer} ${open ? styles.open : ""}`}
                    aria-label="UXopian blog preview"
                >
                    <UXopianFeed />
                </aside>
            </div>
        </div>
    );
}
