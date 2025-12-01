import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

type Article = {
  title: string;
  link: string;
  excerpt?: string;
  image?: string;
  category?: string;
  author?: string;
  date?: string;
};

export default function UXopianFeed() {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const proxy = 'https://api.allorigins.win/get?url=';
    const target = encodeURIComponent('https://www.uxopian.com/blog');
    
    fetch(`${proxy}${target}`)
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then((data) => {
        if (!data?.contents) {
          setError(true);
          setLoading(false);
          return;
        }
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        const items: Article[] = [];
        const seenTitles = new Set<string>();
        
        const articleEls = Array.from(doc.querySelectorAll('article, .post, [class*="post-card"], [class*="blog-card"], .blog-index_post')) as HTMLElement[];
        
        articleEls.forEach((el) => {
          const linkEl = el.querySelector('a[href*="/blog/"], a.blog-index_post-link') as HTMLAnchorElement | null;
          const titleEl = el.querySelector('h1, h2, h3, h4, .entry-title, [class*="title"]');
          
          let imgEl = el.querySelector('img') as HTMLImageElement | null;
          if (!imgEl) {
            imgEl = el.querySelector('.blog-index_post-image img, [class*="image"] img') as HTMLImageElement | null;
          }
          
          const excerptEl = el.querySelector('p:not([class*="meta"]), .excerpt, [class*="description"], [class*="content"] p');
          
          if (linkEl && titleEl) {
            const title = (titleEl.textContent || '').trim();
            
            if (title.length > 10 && !seenTitles.has(title)) {
              seenTitles.add(title);
              
              let imgUrl = imgEl?.src || imgEl?.getAttribute('data-src') || imgEl?.getAttribute('data-lazy-src') || imgEl?.getAttribute('data-srcset');
              
              if (!imgUrl) {
                const bgImgEl = el.querySelector('[style*="background-image"]') as HTMLElement;
                if (bgImgEl) {
                  const style = bgImgEl.getAttribute('style') || '';
                  const match = style.match(/url\(['"]?([^'"]+)['"]?\)/);
                  if (match) imgUrl = match[1];
                }
              }
              
              if (imgUrl) {
                if (!imgUrl.startsWith('http')) {
                  imgUrl = new URL(imgUrl, 'https://www.uxopian.com').href;
                }
                imgUrl = imgUrl.split('?')[0];
              }
              
              const link = linkEl.href.startsWith('http') ? linkEl.href : `https://www.uxopian.com${linkEl.href}`;
              
              items.push({
                title,
                link,
                excerpt: excerptEl ? (excerptEl.textContent || '').trim().substring(0, 160) : undefined,
                image: imgUrl,
                category: el.querySelector('[class*="category"], [class*="tag"]')?.textContent?.trim(),
                author: el.querySelector('[class*="author"], .blog-index_post-author')?.textContent?.trim(),
                date: el.querySelector('time, [class*="date"], .blog-index_post-date')?.textContent?.trim(),
              });
            }
          }
        });
        
        if (items.length > 0) {
          setArticles(items);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Don't render anything if there's an error or still loading with no data
  if (error) {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.uxopianFeed}>
        <div className={styles.feedHeader}>Last articles</div>
        <div className={styles.feedList} style={{padding: '1rem', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem'}}>
          Loading...
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className={styles.uxopianFeed}>
      <div className={styles.feedHeader}>Last articles</div>
      <div className={styles.feedList}>
        {articles.map((a, i) => (
          <a key={i} className={styles.feedItem} href={a.link} target="_blank" rel="noopener noreferrer">
            <div className={styles.feedImageThumb}>
              {a.image ? (
                <img src={a.image} alt="" loading="lazy" />
              ) : (
                <div className={styles.feedThumbPlaceholder}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>
            <div className={styles.feedContent}>
              <h3 className={styles.feedTitle}>{a.title}</h3>
              {a.excerpt && <p className={styles.feedExcerpt}>{a.excerpt}</p>}
              {(a.author || a.date) && (
                <div className={styles.feedMeta}>
                  {a.author && <span className={styles.feedAuthor}>{a.author}</span>}
                  {a.date && <span className={styles.feedDate}>{a.date}</span>}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
