import React, { useState } from 'react';
import { Compass, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { addToast } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    addToast("Subscribed successfully! Thank you for joining our newsletter.", "success");
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">
                <Compass size={24} strokeWidth={2.5} />
              </span>
              <span>CampusCompass</span>
            </div>
            <p>
              Helping students discover, compare, and navigate their path to the right college with confidence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="/colleges" className="footer-link">Colleges</a></li>
              <li><a href="/compare" className="footer-link">Compare Tool</a></li>
              <li><a href="/predictor" className="footer-link">Predictor</a></li>
              <li><a href="/discussions" className="footer-link">Discussions</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="footer-title">Resources</h4>
            <ul className="footer-links">
              <li><a href="/faq" className="footer-link">FAQs</a></li>
              <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
              <li><a href="/terms" className="footer-link">Terms of Service</a></li>
              <li><a href="/contact" className="footer-link">Contact Support</a></li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="footer-newsletter">
            <h4 className="footer-title">Stay Updated</h4>
            <p>Subscribe to receive cutoff alerts, college updates, and admission tips.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px 14px' }}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} CampusCompass. All rights reserved.
          </div>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="social-icon" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="social-icon" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
