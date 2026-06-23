import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, LogIn, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, savedColleges, logout } = useApp();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-container container">
        {/* Logo */}
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <span className="logo-icon">
            <Compass size={28} strokeWidth={2.5} />
          </span>
          <span>CampusCompass</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/colleges" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Explore Colleges
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Compare
          </NavLink>
          <NavLink to="/predictor" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Predictor
          </NavLink>
          <NavLink to="/discussions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Discussions
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Saved
            {savedColleges.length > 0 && (
              <span className="nav-badge">{savedColleges.length}</span>
            )}
          </NavLink>
        </nav>

        {/* User Auth Section */}
        <div className="auth-section">
          {user ? (
            <div className="user-tag">
              <div className="user-avatar">
                {user.name.charAt(0)}
              </div>
              <span>{user.name}</span>
              <button 
                onClick={handleLogout} 
                className="btn btn-ghost" 
                style={{ padding: '6px 12px' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <LogIn size={14} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Burger Menu Button */}
        <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="mobile-drawer">
          <NavLink 
            to="/" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Home</span>
          </NavLink>
          <NavLink 
            to="/colleges" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Explore Colleges</span>
          </NavLink>
          <NavLink 
            to="/compare" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Compare</span>
          </NavLink>
          <NavLink 
            to="/predictor" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Predictor</span>
          </NavLink>
          <NavLink 
            to="/discussions" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Discussions</span>
          </NavLink>
          <NavLink 
            to="/saved" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <span>Saved Colleges</span>
            {savedColleges.length > 0 && (
              <span className="badge badge-primary">{savedColleges.length}</span>
            )}
          </NavLink>

          {/* Mobile Auth Drawer Controls */}
          <div className="mobile-auth-section">
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="user-tag" style={{ padding: '0 8px' }}>
                  <div className="user-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <span>{user.name} ({user.email})</span>
                </div>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ width: '100%' }}>
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMobileMenu}>
                <LogIn size={16} />
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
