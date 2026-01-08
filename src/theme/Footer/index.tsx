import React, { JSX, useState } from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import ContactModal from '@site/src/components/ContactModal/ContactModal';

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  const { pathname, search } = useLocation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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
              <li><a href="https://arondor.atlassian.net/servicedesk/customer/portal" target="_blank" rel="noreferrer">Support</a></li>
              <li>
                <button
                  onClick={() => setIsContactModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'inherit',
                    font: 'inherit',
                    cursor: 'pointer',
                    textDecoration: 'none'
                  }}
                >
                  Contact Us
                </button>
              </li>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0H5C2.23858 0 0 2.23858 0 5V19C0 21.7614 2.23858 24 5 24H19C21.7614 24 24 21.7614 24 19V5C24 2.23858 21.7614 0 19 0ZM7 19H4V9H7V19ZM5.5 7.732C4.53498 7.732 3.75 6.94802 3.75 5.982C3.75 5.016 4.53498 4.232 5.5 4.232C6.46602 4.232 7.25 5.016 7.25 5.982C7.25 6.94802 6.46602 7.732 5.5 7.732ZM20 19H17V13.396C17 11.934 16.974 9.998 14.813 9.998C12.624 9.998 12.25 11.868 12.25 13.272V19H9.25V9H12.062V10.26H12.108C12.558 9.552 13.663 8.8 15.298 8.8C18.972 8.8 20 10.872 20 13.796V19Z" />
                </svg>
              </a>

              <a className="social-link" href="https://www.youtube.com/@Uxopian" target="_blank" rel="noreferrer" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="uxo-footer-bottom">
          <small>© {year} Uxopian Software. All rights reserved.</small>
        </div>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
}