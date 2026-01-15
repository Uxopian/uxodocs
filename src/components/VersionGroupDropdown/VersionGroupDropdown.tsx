import React, { useState } from 'react';
import styles from './VersionGroupDropdown.module.css';

interface VersionItem {
    label: string;
    href: string;
    isActive: boolean;
}

interface VersionGroup {
    year: string;
    versions: VersionItem[];
}

interface VersionGroupDropdownProps {
    versions: VersionItem[];
}

const VersionGroupDropdown: React.FC<VersionGroupDropdownProps> = ({ versions }) => {
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const { groups, others } = React.useMemo(() => {
        const groupsMap: Record<string, VersionItem[]> = {};
        const othersList: VersionItem[] = [];

        versions.forEach((version) => {
            const yearMatch = version.label.match(/v(\d{4})[\.\-]/);
            if (yearMatch) {
                const year = yearMatch[1];
                if (!groupsMap[year]) {
                    groupsMap[year] = [];
                }
                groupsMap[year].push(version);
            } else {
                othersList.push(version);
            }
        });

        const sortedGroups: VersionGroup[] = Object.keys(groupsMap)
            .sort()
            .reverse()
            .map((year) => ({
                year,
                versions: groupsMap[year],
            }));

        return { groups: sortedGroups, others: othersList };
    }, [versions]);

    const toggleGroup = (year: string) => {
        setExpandedGroups((prev) => {
            const next = new Set(prev);
            if (next.has(year)) {
                next.delete(year);
            } else {
                next.add(year);
            }
            return next;
        });
    };

    return (
        <div className={styles.versionDropdown}>
            {groups.map((group) => {
                const isExpanded = expandedGroups.has(group.year);

                return (
                    <div key={group.year} className={styles.versionGroup}>
                        <button
                            className={styles.groupHeader}
                            onClick={() => toggleGroup(group.year)}
                            type="button"
                        >
                            <span>v{group.year}.x.x</span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
                            >
                                <path
                                    d="M4.5 3l3 3-3 3"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                />
                            </svg>
                        </button>
                        {isExpanded && (
                            <div className={styles.submenu}>
                                {group.versions.map((version, index) => (
                                    <a
                                        key={index}
                                        href={version.href}
                                        className={`${styles.submenuItem} ${version.isActive ? styles.submenuItemActive : ''}`}
                                    >
                                        {version.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
            {others.map((version, index) => (
                <a
                    key={index}
                    href={version.href}
                    className={`${styles.regularItem} ${version.isActive ? styles.regularItemActive : ''}`}
                >
                    {version.label}
                </a>
            ))}
        </div>
    );
};

export default VersionGroupDropdown;
