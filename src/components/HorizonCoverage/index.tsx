import React, {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export type ProfileId = 'view' | 'download' | 'annotate' | 'embed' | 'customize' | 'rights' | 'advanced';
export type HorizonStatus = 'Available' | 'Preview' | 'Now' | 'Next' | 'Later' | 'Not in Horizon';
export type Verdict = 'Covered' | 'Covered with limits' | 'Not ready yet' | 'New';

export interface CoverageRow {
  id: string;
  area: string;
  feature: string;
  profile: ProfileId;
  classic: 'Available' | 'n/a';
  horizon: HorizonStatus;
  version?: string;
  note?: string;
}

export interface CoverageProfile {
  id: ProfileId;
  title: string;
  /** Version that introduced this use case in Horizon, shown as an extra badge. */
  newIn?: string;
  summary: string;
}

export interface CoverageData {
  asOf: string;
  profiles: CoverageProfile[];
  rows: CoverageRow[];
}

const STATUSES: HorizonStatus[] = ['Available', 'Preview', 'Now', 'Next', 'Later', 'Not in Horizon'];

/** Short meaning of each status, shown as a tooltip on the filter buttons. */
const MEANING: Record<HorizonStatus, string> = {
  Available: 'Released in Horizon, in the version shown.',
  Preview: 'Released but off by default. Its behavior can still change.',
  Now: 'In development for the coming releases.',
  Next: 'Designed, development starts after the Now items.',
  Later: 'Planned, not scheduled yet.',
  'Not in Horizon': 'Not available in Horizon and not planned.',
};

const CHECK = 'M5 8.3l2 2 4-4.4';
const DASH = 'M5.2 8h5.6';
const HALF = 'M8 1.5a6.5 6.5 0 0 0 0 13z';
const DOT = 'M6.4 8a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0 -3.2 0';
const DOTS = 'M5.2 8h.01M8 8h.01M10.8 8h.01';

/** Tone (colour, set in CSS from data-tone) and glyph path of each status and verdict. */
const LOOK: Record<HorizonStatus | Verdict, [tone: string, path: string]> = {
  Available: ['ok', CHECK],
  Preview: ['preview', HALF],
  Now: ['planned', DOT],
  Next: ['planned', 'M8 4.6V8l2.3 1.5'],
  Later: ['planned', DOTS],
  'Not in Horizon': ['none', DASH],
  Covered: ['ok', CHECK],
  'Covered with limits': ['preview', HALF],
  New: ['planned', 'M8 5v6M5 8h6'],
  'Not ready yet': ['neutral', DASH],
};

/** Status glyph, a cue beyond colour. The label next to it carries the meaning. */
function Glyph({look}: {look: HorizonStatus | Verdict}): React.JSX.Element {
  const d = LOOK[look][1];
  return (
    <svg className={styles.glyph} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <circle cx="8" cy="8" r="6.5" />
      <path d={d} style={d === HALF || d === DOT ? {fill: 'currentColor', stroke: 'none'} : d === DOTS ? {strokeWidth: 2.2, strokeLinecap: 'round'} : undefined} />
    </svg>
  );
}

function countByStatus(rows: CoverageRow[]): Record<HorizonStatus, number> {
  const c: Record<HorizonStatus, number> = {Available: 0, Preview: 0, Now: 0, Next: 0, Later: 0, 'Not in Horizon': 0};
  rows.forEach((r) => (c[r.horizon] += 1));
  return c;
}

/** Level 1: one card per use case, with its verdict. The whole card links to the filtered table. */
export function CoverageProfiles({data, detailPath}: {data: CoverageData; detailPath: string}): React.JSX.Element {
  return (
    <ul className={`${styles.scope} ${styles.cards}`}>
      {data.profiles.map((p) => {
        const rows = data.rows.filter((r) => r.profile === p.id);
        const c = countByStatus(rows);
        const roadmap = c.Now + c.Next + c.Later;
        // Features Horizon will not have are left out of the total, so the bar can reach 100 %.
        // They stay visible in the breakdown line below.
        const total = rows.length - c['Not in Horizon'];
        const extra = [
          c.Preview && `${c.Preview} in preview`,
          roadmap && `${roadmap} on the roadmap`,
          c['Not in Horizon'] && `${c['Not in Horizon']} not planned for Horizon`,
        ].filter(Boolean);
        // Computed, not written by hand, so every card follows the same rule.
        const verdict: Verdict = c.Available === 0 ? 'Not ready yet' : c.Available === total ? 'Covered' : 'Covered with limits';
        return (
          <li key={p.id} className={styles.card}>
            <span className={styles.chips}>
              <span className={styles.chip} data-tone={LOOK[verdict][0]}>
                <Glyph look={verdict} />
                {verdict}
              </span>
              {p.newIn && (
                <span className={styles.chip} data-tone={LOOK.New[0]}>
                  <Glyph look="New" />
                  New in {p.newIn}
                </span>
              )}
            </span>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <div className={styles.foot}>
              <span className={styles.count}>
                <span>
                  <strong>{c.Available}</strong> of <strong>{total}</strong> available
                </span>
                <span className={styles.meter} aria-hidden="true">
                  <span style={{width: `${total ? (c.Available / total) * 100 : 0}%`}} />
                </span>
              </span>
              {extra.length > 0 && <span className={styles.muted}>{extra.join(' · ')}</span>}
              <Link className={styles.cardLink} to={`${detailPath}?profile=${p.id}`}>
                See the detail<span className={styles.srOnly}> of {p.title}</span> <span aria-hidden="true">→</span>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const NO_FILTER = {profile: 'all', status: 'all', q: ''};

/** Level 2: every feature and its status in Horizon, searchable and filterable. */
export function CoverageTable({data}: {data: CoverageData}): React.JSX.Element {
  const [f, setF] = useState(NO_FILTER);
  const set = (patch: Partial<typeof NO_FILTER>): void => setF((prev) => ({...prev, ...patch}));
  useEffect(() => {
    const s = new URLSearchParams(window.location.search);
    setF({profile: s.get('profile') ?? 'all', status: s.get('status') ?? 'all', q: s.get('q') ?? ''});
  }, []);

  // Rows matching search + use case, before the status filter: drives the button counts.
  const q = f.q.trim();
  const scoped = useMemo(() => {
    const needle = q.toLowerCase();
    return data.rows.filter(
      (r) => (f.profile === 'all' || r.profile === f.profile) && `${r.area} ${r.feature} ${r.note ?? ''}`.toLowerCase().includes(needle),
    );
  }, [data.rows, f.profile, q]);
  const counts = countByStatus(scoped);
  const rows = scoped.filter((r) => f.status === 'all' || r.horizon === f.status);
  const groups = new Map<string, CoverageRow[]>();
  rows.forEach((r) => groups.set(r.area, [...(groups.get(r.area) ?? []), r]));
  const filtered = f.profile !== 'all' || f.status !== 'all' || q !== '';
  const profileTitle = data.profiles.find((p) => p.id === f.profile)?.title;
  const emptyHint = [q ? `matches “${q}”` : 'matches these filters', profileTitle && `in ${profileTitle}`, f.status !== 'all' && `with the status ${f.status}`];

  return (
    <div className={`${styles.scope} ${styles.table}`}>
      <div className={styles.tools}>
        <label className={styles.field}>
          Search
          <span className={styles.searchWrap}>
            <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <circle cx="7" cy="7" r="4.75" />
              <path d="M10.5 10.5L14 14" />
            </svg>
            <input type="search" placeholder="Polygon, print, redact…" value={f.q} onChange={(e) => set({q: e.target.value})} />
          </span>
        </label>
        <label className={`${styles.field} ${styles.selectField}`}>
          Use case
          <span className={styles.selectWrap}>
            <select value={f.profile} onChange={(e) => set({profile: e.target.value})}>
              <option value="all">All use cases</option>
              {data.profiles.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </span>
        </label>
      </div>

      <div className={styles.filters} role="group" aria-label="Filter by Horizon status">
        {['all', ...STATUSES].map((s) => {
          const n = s === 'all' ? scoped.length : counts[s as HorizonStatus];
          const look = s === 'all' ? undefined : (s as HorizonStatus);
          return (
            <button
              key={s}
              type="button"
              data-tone={look && LOOK[look][0]}
              aria-pressed={f.status === s}
              disabled={n === 0 && f.status !== s}
              title={look && MEANING[look]}
              onClick={() => set({status: s})}>
              {look && <Glyph look={look} />}
              {look ?? 'All statuses'}
              <span className={styles.muted}>{n}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.resultBar}>
        <span aria-live="polite">
          Showing <strong>{rows.length}</strong> of {data.rows.length} features · status as of ARender {data.asOf}
        </span>
        {filtered && rows.length > 0 && (
          <button type="button" className={styles.reset} onClick={() => setF(NO_FILTER)}>
            Clear filters
          </button>
        )}
      </div>

      {rows.length > 0 ? (
        <div className={styles.scroll}>
          <table className={styles.grid}>
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Horizon</th>
                <th scope="col">Since</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(groups, ([area, inArea]) => (
                <React.Fragment key={area}>
                  <tr className={styles.area}>
                    <th scope="colgroup" colSpan={3}>
                      {area} <span className={styles.muted}>{inArea.length}</span>
                    </th>
                  </tr>
                  {inArea.map((r) => (
                    <tr key={r.id} id={r.id} className={styles.row}>
                      <td>
                        <span className={styles.feature}>{r.feature}</span>
                        {r.classic === 'n/a' && <span className={styles.tag}>Not in Classic</span>}
                        {r.note && <span className={styles.note}>{r.note}</span>}
                      </td>
                      <td className={styles.status} data-tone={LOOK[r.horizon][0]}>
                        <Glyph look={r.horizon} />
                        {r.horizon}
                      </td>
                      <td className={styles.muted}>
                        {r.version ?? (<><span aria-hidden="true">—</span><span className={styles.srOnly}>No version yet</span></>)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.empty}>
          <p><strong>No feature found</strong></p>
          <p className={styles.muted}>No feature {emptyHint.filter(Boolean).join(' ')}.</p>
          <button type="button" onClick={() => setF(NO_FILTER)}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
