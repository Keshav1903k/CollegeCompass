import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bookmark, Lock, GitCompare, Eye, Trash2, Star, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockColleges } from '../data/colleges';
import '../styles/Auth.css';

export const Saved: React.FC = () => {
  const { user, savedColleges, toggleSaveCollege, compareList, toggleCompareCollege } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'colleges' | 'comparisons'>('colleges');

  // Filter full college objects for shortlisted items
  const shortlistedColleges = useMemo(() => {
    return mockColleges.filter((c) => savedColleges.includes(c.id));
  }, [savedColleges]);

  // Filter full college objects for active compare list
  const comparedColleges = useMemo(() => {
    return mockColleges.filter((c) => compareList.includes(c.id));
  }, [compareList]);

  // Guest Authorization Gate
  if (!user) {
    return (
      <div className="auth-page container animate-fade-in">
        <div className="auth-card" style={{ maxWidth: '500px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--neutral-400)', marginBottom: '16px' }}>
            <Lock size={40} />
          </div>
          <h2 style={{ fontSize: '22px' }}>Shortlist Dashboard Locked</h2>
          <p style={{ fontSize: '14.5px', color: 'var(--neutral-500)', lineHeight: 1.6 }}>
            Authentication is required to synchronize shortlists. Register or sign in to save colleges, write reviews, and compare selections.
          </p>
          <Link to="/login" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
            Log In or Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-dashboard container animate-fade-in">
      <div className="compare-header">
        <span className="section-tag">Workspace Hub</span>
        <h2 className="section-title" style={{ fontSize: '36px' }}>My Saved Items</h2>
        <p className="section-desc">
          Manage your saved institutions and active comparison lists inside your private dashboard.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="saved-tabs-row">
        <button
          className={`saved-tab-btn ${activeTab === 'colleges' ? 'active' : ''}`}
          onClick={() => setActiveTab('colleges')}
        >
          Saved Colleges ({shortlistedColleges.length})
        </button>
        <button
          className={`saved-tab-btn ${activeTab === 'comparisons' ? 'active' : ''}`}
          onClick={() => setActiveTab('comparisons')}
        >
          Saved Comparisons ({comparedColleges.length > 0 ? 1 : 0})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'colleges' && (
        shortlistedColleges.length > 0 ? (
          <div className="colleges-listing-grid stagger-container" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
            {shortlistedColleges.map((college) => (
              <article key={college.id} className="college-card card-hover">
                <div className="card-banner">
                  <img src={college.bannerImage} alt={college.name} />
                  <div className="card-logo">
                    <img src={college.logo} alt={college.name} />
                  </div>
                </div>
                <div className="card-content">
                  <div className="card-meta">
                    <span className="badge badge-primary">{college.ownership}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                      <Star size={14} fill="var(--warning)" color="var(--warning)" />
                      <span>{college.rating}</span>
                    </div>
                  </div>
                  <h3 className="card-title">{college.name}</h3>
                  <div className="card-location">
                    <MapPin size={14} />
                    <span>{college.location}, {college.state}</span>
                  </div>

                  <div className="card-stats">
                    <div className="stat-item">
                      <span className="stat-label">Avg Package</span>
                      <span className="stat-val">{college.placementAverage} LPA</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Annual Fees</span>
                      <span className="stat-val">₹{(college.fees / 100000).toFixed(2)}L</span>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      onClick={() => navigate(`/college/${college.id}`)}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '13px' }}
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toggleSaveCollege(college.id)}
                      className="btn btn-secondary"
                      style={{ padding: '8px 12px', color: 'var(--danger)' }}
                      title="Remove from Saved"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty Shortlist state */
          <div className="empty-state">
            <div className="empty-state-icon">
              <Bookmark size={32} />
            </div>
            <h3 className="empty-state-title">Your Shortlist is Empty</h3>
            <p className="empty-state-desc">
              Bookmark colleges as you explore to save them in your shortlist folder.
            </p>
            <button onClick={() => navigate('/colleges')} className="btn btn-primary">
              Explore Colleges
            </button>
          </div>
        )
      )}

      {activeTab === 'comparisons' && (
        comparedColleges.length > 0 ? (
          /* Active comparison list summary card */
          <div className="empty-state" style={{ maxWidth: '650px', textAlign: 'left', padding: '32px', display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div className="empty-state-icon" style={{ margin: 0, width: '48px', height: '48px' }}>
                <GitCompare size={20} />
              </div>
              <div>
                <h3 className="empty-state-title" style={{ fontSize: '18px' }}>Active Comparison List</h3>
                <p className="empty-state-desc" style={{ fontSize: '13px', margin: 0 }}>
                  You have selected {comparedColleges.length} colleges for comparison.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginBottom: '20px' }}>
              {comparedColleges.map((c) => (
                <div key={c.id} style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                      <img src={c.logo} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--neutral-800)' }}>
                      {c.name.split('(')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleCompareCollege(c.id)}
                    style={{ color: 'var(--neutral-400)' }}
                    title="Remove"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => navigate('/compare')} className="btn btn-primary" style={{ gap: '6px' }}>
                <Eye size={16} />
                Open Compare Panel
              </button>
              <button 
                onClick={() => {
                  toggleCompareCollege(comparedColleges[0].id); // clear by toggle, or clean function
                }}
                className="btn btn-secondary"
                style={{ display: 'none' }} // simple spacer placeholder
              ></button>
            </div>
          </div>
        ) : (
          /* Empty comparisons state */
          <div className="empty-state">
            <div className="empty-state-icon">
              <GitCompare size={32} />
            </div>
            <h3 className="empty-state-title">No Comparisons Saved</h3>
            <p className="empty-state-desc">
              Add multiple colleges to the comparison folder to review and save comparisons here.
            </p>
            <button onClick={() => navigate('/compare')} className="btn btn-primary">
              Open Compare Tool
            </button>
          </div>
        )
      )}
    </div>
  );
};
export default Saved;
