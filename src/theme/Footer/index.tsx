import React, { JSX } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const { pathname, search } = useLocation(); 

  const getFooterClass = () => {
    const currentPath = pathname.toLowerCase() + search.toLowerCase();

    if (currentPath.includes('arender')) return 'footer-variant-arender';
    if (currentPath.includes('fast2')) return 'footer-variant-fast2';
    if (currentPath.includes('flowerdocs')) return 'footer-variant-flowerdocs';
    if (currentPath.includes('uxopian-ai')) return 'footer-variant-ai';
    
    return '';
  };

  return (
    <footer className={`uxo-footer ${getFooterClass()}`}>
      <div className="uxo-footer-glow" />

      <div className="uxo-footer-inner container">
        <div className="uxo-footer-grid">
          
          <div className="uxo-footer-column">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://uxopian.com/support" target="_blank" rel="noreferrer">Support</a></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="uxo-footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="https://uxopian.com" target="_blank" rel="noreferrer">About Us</a></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="uxo-footer-column">
            <h4>Connect</h4>
            <div className="uxo-footer-social">
              <a className="social-link" href="https://www.linkedin.com/company/uxopiansoftware/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5C1.9 5.5 1 4.6 1 3.5C1 2.4 1.9 1.5 3 1.5C4.1 1.5 4.98 2.4 4.98 3.5Z"/><path d="M6 8H1V23H6V8Z"/><path d="M11 8H6V23H11V15.5C11 12.42 16 12.08 16 15.5V23H21V14C21 8.5 14.5 8.2 11 11.2V8Z"/></svg>
              </a>

              <a className="social-link" href="https://www.youtube.com/@Uxopian" target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="uxo-footer-bottom">
          <small>© {year} Uxopian Software. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}