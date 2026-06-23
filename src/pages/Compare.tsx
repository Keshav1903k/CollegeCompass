import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitCompare, Search, Trash2, Star, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockColleges } from '../data/colleges';
import './Compare.css';

export const Compare: React.FC = () => {
  const { compareList, toggleCompareCollege, clearCompareList } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch full details of compared colleges
  const comparedColleges = useMemo(() => {
    return mockColleges.filter((c) => compareList.includes(c.id));
  }, [compareList]);

  // Filter colleges for search dropdown (excluding already compared ones)
  const availableOptions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return mockColleges.filter(
      (c) => 
        !compareList.includes(c.id) &&
        (c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
         c.streams.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [searchQuery, compareList]);

  // Calculate the "Best Value" based on average placement package to annual fees ratio
  // Only makes sense when comparing 2 or 3 colleges
  const bestValueCollegeId = useMemo(() => {
    if (comparedColleges.length < 2) return null;
    
    let highestRatio = -1;
    let bestId = null;

    comparedColleges.forEach((c) => {
      // Avoid division by zero/near zero (e.g. AIIMS fees is very low, making ratio extremely high, which is technically correct!)
      const annualFees = c.fees || 1; // Fallback
      const ratio = c.placementAverage / annualFees;
      if (ratio > highestRatio) {
        highestRatio = ratio;
        bestId = c.id;
      }
    });

    return bestId;
  }, [comparedColleges]);

  const handleAddCollege = (id: string) => {
    toggleCompareCollege(id);
    setSearchQuery('');
    setDropdownOpen(false);
  };

  return (
    <div className="compare-page container animate-fade-in">
      <div className="compare-header">
        <span className="section-tag">Comparison Matrix</span>
        <h2 className="section-title" style={{ fontSize: '36px' }}>Compare Colleges</h2>
        <p className="section-desc">
          Evaluate colleges side-by-side on placements, annual fees, ratings, and course parameters.
        </p>
      </div>

      {/* Selector Dropdown Bar */}
      <div className="selector-bar">
        <div className="selector-dropdown-wrapper">
          <Search className="search-icon-absolute" size={18} />
          <input
            type="text"
            placeholder={
              compareList.length >= 3 
                ? "Max limit reached (3 colleges)" 
                : "Search and add college to compare..."
            }
            className="compare-search-input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDropdownOpen(true);
            }}
            disabled={compareList.length >= 3}
            onFocus={() => setDropdownOpen(true)}
          />
          
          {dropdownOpen && availableOptions.length > 0 && (
            <div className="dropdown-results-list">
              {availableOptions.map((c) => (
                <button
                  key={c.id}
                  className="dropdown-result-item"
                  onClick={() => handleAddCollege(c.id)}
                >
                  <div className="dropdown-item-logo">
                    <img src={c.logo} alt={c.name} />
                  </div>
                  <div className="dropdown-item-info">
                    <span className="dropdown-item-name">{c.name.split('(')[0]}</span>
                    <span className="dropdown-item-meta">{c.location} • {c.streams.join(', ')}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {dropdownOpen && searchQuery.trim() && availableOptions.length === 0 && (
            <div className="dropdown-results-list" style={{ padding: '16px', textAlign: 'center', fontSize: '13px', color: 'var(--neutral-400)' }}>
              No matches found
            </div>
          )}
        </div>
        
        {compareList.length > 0 && (
          <button 
            onClick={clearCompareList}
            className="btn btn-ghost" 
            style={{ marginLeft: '12px', fontSize: '13px', color: 'var(--danger)' }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Comparison Grid Matrix */}
      {comparedColleges.length > 0 ? (
        <div className="compare-matrix-container">
          <div 
            className="compare-matrix" 
            style={{ 
              gridTemplateColumns: `220px repeat(${comparedColleges.length}, 1fr)` 
            }}
          >
            {/* Label column */}
            <div className="compare-col compare-label-col">
              <div className="compare-row compare-row-header compare-row-header-label">
                Evaluating Parameters
              </div>
              <div className="compare-row">Location</div>
              <div className="compare-row">Rating</div>
              <div className="compare-row">Average Fees</div>
              <div className="compare-row">Avg placement package</div>
              <div className="compare-row">Highest placement package</div>
              <div className="compare-row">Established Year</div>
              <div className="compare-row">Facilities</div>
            </div>

            {/* Compared Colleges columns */}
            {comparedColleges.map((college) => {
              const isBestValue = college.id === bestValueCollegeId;
              
              return (
                <div 
                  key={college.id} 
                  className={`compare-col ${isBestValue ? 'best-value-highlight' : ''}`}
                >
                  {/* Header Row */}
                  <div className="compare-row compare-row-header">
                    {isBestValue && (
                      <span className="best-value-badge">
                        <Sparkles size={10} />
                        Best Value
                      </span>
                    )}
                    <button 
                      className="remove-col-btn"
                      onClick={() => toggleCompareCollege(college.id)}
                      title="Remove column"
                    >
                      <Trash2 size={16} />
                    </button>
                    
                    <div className="compare-header-logo">
                      <img src={college.logo} alt={college.name} />
                    </div>
                    <h3 className="compare-header-name">{college.name}</h3>
                    
                    <button
                      onClick={() => navigate(`/college/${college.id}`)}
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      View Details
                    </button>
                  </div>

                  {/* Location Row */}
                  <div className="compare-row" data-label="Location">
                    <MapPin size={14} style={{ marginRight: '6px', color: 'var(--neutral-400)' }} />
                    {college.location}, {college.state}
                  </div>

                  {/* Rating Row */}
                  <div className="compare-row" data-label="Rating">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                      <Star size={14} fill="var(--warning)" color="var(--warning)" />
                      <span>{college.rating} / 5.0</span>
                    </div>
                  </div>

                  {/* Fees Row */}
                  <div className="compare-row" data-label="Average Fees" style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {college.fees > 2000
                      ? `₹${(college.fees / 100000).toFixed(2)} Lakhs/yr`
                      : `₹${college.fees.toLocaleString()}/yr`
                    }
                  </div>

                  {/* Avg Placement Row */}
                  <div className="compare-row" data-label="Avg Placement" style={{ fontWeight: 700, color: 'var(--success)' }}>
                    {college.placementAverage} LPA
                  </div>

                  {/* Highest Placement Row */}
                  <div className="compare-row" data-label="Highest Placement" style={{ fontWeight: 600 }}>
                    {college.placementHighest} LPA
                  </div>

                  {/* Established Year Row */}
                  <div className="compare-row" data-label="Established">
                    Est. {college.established} ({new Date().getFullYear() - college.established} yrs ago)
                  </div>

                  {/* Facilities Row */}
                  <div className="compare-row" data-label="Facilities">
                    <div className="compare-tags-list">
                      {college.facilities.slice(0, 4).map((f, i) => (
                        <span key={i} className="compare-tag-bubble">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="compare-empty-state animate-slide-up">
          <div className="empty-state-icon">
            <GitCompare size={32} />
          </div>
          <h3 className="empty-state-title">Compare Panel is Empty</h3>
          <p className="empty-state-desc">
            You haven't selected any colleges to evaluate. Find colleges in the listings and toggle compare or type a college name in the search field above to compare them side-by-side.
          </p>
          <button onClick={() => navigate('/colleges')} className="btn btn-primary">
            Explore Colleges
          </button>
        </div>
      )}
    </div>
  );
};
export default Compare;
