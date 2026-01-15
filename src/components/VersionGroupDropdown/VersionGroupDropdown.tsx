import React from 'react';
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

  return (
    <div className={styles.versionDropdown}>
      {groups.map((group) => (
        <div key={group.year} className={styles.versionGroup}>
          <div className={styles.groupHeader}>
            <span>v{group.year}.x</span>
          </div>
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
        </div>
      ))}
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
