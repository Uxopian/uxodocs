import React from "react";
import styles from "./styles.module.css";

interface LastUpdatedProps {
    date?: string | number;
}

function formatDate(dateInput: string | number): string {
    const d = typeof dateInput === "number" ? new Date(dateInput) : new Date(dateInput);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}

export default function LastUpdated({ date }: LastUpdatedProps): JSX.Element | null {
    if (!date) {
        return null;
    }

    return (
        <div className={styles.lastUpdated}>
            <span>Last update: {formatDate(date)}</span>
        </div>
    );
}
