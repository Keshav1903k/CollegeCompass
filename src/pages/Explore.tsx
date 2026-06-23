import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Star, MapPin, Bookmark, BookmarkCheck, GitCompare, Grid, RefreshCw, X } from 'lucide-react';
import { mockColleges } from '../data/colleges';
import { useApp } from '../context/AppContext';
import { useDebounce } from '../hooks/useDebounce';
import './Explore.css';

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toggleSaveCollege, isSaved, toggleCompareCollege, isInCompareList } = useApp();

  // URL State bindings
  const initialSearch = searchParams.get('search') || '';
  const initialStreamUrl = searchParams.get('stream') || '';

  // Local Filter States
  const [searchInput, setSearchInput] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchInput, 300);

  const [selectedStreams, setSelectedStreams] = useState<string[]>(
    initialStreamUrl ? [initialStreamUrl] : []
  );
  
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedOwnership, setSelectedOwnership] = useState<string[]>([]);
  const [maxFees, setMaxFees] = useState<number>(1300000);
  const [minPlacement, setMinPlacement] = useState<number>(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('rating-desc');

  // Interactive Skeletons Simulator
  const [loading, setLoading] = useState(true);
  
  // Mobile filter overlay state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Reset pagination if filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedStreams, selectedLocations, selectedOwnership, maxFees, minPlacement, minRating, sortBy]);

  // Sync URL search params
  useEffect(() => {
    const params: Record<string, string> = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (selectedStreams.length === 1) params.stream = selectedStreams[0];
    setSearchParams(params);
  }, [debouncedSearch, selectedStreams, setSearchParams]);

  // Simulate API loading on mount & filter changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [debouncedSearch, selectedStreams, selectedLocations, selectedOwnership, maxFees, minPlacement, minRating, sortBy]);

  // Available Locations dynamically derived from mock data
  const locations = useMemo(() => {
    return Array.from(new Set(mockColleges.map((c) => c.location))).sort();
  }, []);

  // Filtering & Sorting Logic
  const filteredColleges = useMemo(() => {
    return mockColleges
      .filter((college) => {
        // Text search match (Name, Location, State, or Course names)
        const query = debouncedSearch.toLowerCase().trim();
        const matchesText = !query || 
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.state.toLowerCase().includes(query) ||
          college.courses.some(c => c.name.toLowerCase().includes(query)) ||
          college.facilities.some(f => f.toLowerCase().includes(query));

        // Stream match
        const matchesStream = selectedStreams.length === 0 || 
          college.streams.some(s => selectedStreams.includes(s));

        // Location match
        const matchesLocation = selectedLocations.length === 0 || 
          selectedLocations.includes(college.location);

        // Ownership match
        const matchesOwnership = selectedOwnership.length === 0 || 
          selectedOwnership.includes(college.ownership);

        // Fees match
        const matchesFees = college.fees <= maxFees;

        // Placements match
        const matchesPlacement = college.placementAverage >= minPlacement;

        // Rating match
        const matchesRating = college.rating >= minRating;

        return matchesText && matchesStream && matchesLocation && matchesOwnership && matchesFees && matchesPlacement && matchesRating;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'fees-asc':
            return a.fees - b.fees;
          case 'fees-desc':
            return b.fees - a.fees;
          case 'placement-desc':
            return b.placementAverage - a.placementAverage;
          case 'placement-highest':
            return b.placementHighest - a.placementHighest;
          case 'rating-desc':
          default:
            return b.rating - a.rating;
        }
      });
  }, [debouncedSearch, selectedStreams, selectedLocations, selectedOwnership, maxFees, minPlacement, minRating, sortBy]);

  // Pagination slice
  const paginatedColleges = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredColleges.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredColleges, currentPage]);

  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);

  const clearAllFilters = () => {
    setSearchInput('');
    setSelectedStreams([]);
    setSelectedLocations([]);
    setSelectedOwnership([]);
    setMaxFees(1300000);
    setMinPlacement(0);
    setMinRating(0);
    setSortBy('rating-desc');
  };

  const handleStreamCheckbox = (stream: string) => {
    setSelectedStreams((prev) =>
      prev.includes(stream) ? prev.filter((s) => s !== stream) : [...prev, stream]
    );
  };

  const handleLocationCheckbox = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
  };

  const handleOwnershipCheckbox = (owner: string) => {
    setSelectedOwnership((prev) =>
      prev.includes(owner) ? prev.filter((o) => o !== owner) : [...prev, owner]
    );
  };

  return (
    <div className="explore-page container animate-fade-in">
      <div className="explore-container">
        {/* Sidebar Filters */}
        <aside className={`filter-sidebar ${mobileFilterOpen ? 'mobile-visible' : ''}`}>
          <div className="filter-header">
            <span className="filter-title-text">Filters</span>
            {mobileFilterOpen && (
              <button onClick={() => setMobileFilterOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
                <X size={18} />
              </button>
            )}
            <button onClick={clearAllFilters} className="clear-btn">
              Clear All
            </button>
          </div>

          {/* Stream Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">Stream</h4>
            <div className="checkbox-group">
              {['Engineering', 'Management', 'Medical', 'Law'].map((stream) => (
                <label key={stream} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedStreams.includes(stream)}
                    onChange={() => handleStreamCheckbox(stream)}
                  />
                  <span>{stream}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">Location</h4>
            <div className="checkbox-group">
              {locations.map((loc) => (
                <label key={loc} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedLocations.includes(loc)}
                    onChange={() => handleLocationCheckbox(loc)}
                  />
                  <span>{loc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ownership Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">Ownership</h4>
            <div className="checkbox-group">
              {['Public', 'Private'].map((owner) => (
                <label key={owner} className="checkbox-label">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={selectedOwnership.includes(owner)}
                    onChange={() => handleOwnershipCheckbox(owner)}
                  />
                  <span>{owner}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fees Slider */}
          <div className="filter-section">
            <h4 className="filter-section-title">Max Annual Fees</h4>
            <div className="range-inputs">
              <input
                type="range"
                min={2000}
                max={1300000}
                step={20000}
                className="range-slider"
                value={maxFees}
                onChange={(e) => setMaxFees(Number(e.target.value))}
              />
              <div className="range-values">
                <span>₹2,000</span>
                <span>₹{(maxFees / 100000).toFixed(2)}L/yr</span>
              </div>
            </div>
          </div>

          {/* Placements Slider */}
          <div className="filter-section">
            <h4 className="filter-section-title">Min Average Package</h4>
            <div className="range-inputs">
              <input
                type="range"
                min={0}
                max={35}
                step={2}
                className="range-slider"
                value={minPlacement}
                onChange={(e) => setMinPlacement(Number(e.target.value))}
              />
              <div className="range-values">
                <span>0 LPA</span>
                <span>{minPlacement} LPA+</span>
              </div>
            </div>
          </div>

          {/* Rating Buttons */}
          <div className="filter-section">
            <h4 className="filter-section-title">Minimum Rating</h4>
            <div className="rating-buttons-grid">
              {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
                <button
                  key={ratingVal}
                  className={`rating-filter-btn ${minRating === ratingVal ? 'active' : ''}`}
                  onClick={() => setMinRating(ratingVal)}
                >
                  {ratingVal === 0 ? 'All' : `${ratingVal}★`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Listing Column */}
        <main className="listing-column">
          {/* Search bar + Sort bar */}
          <div className="explore-toolbar">
            <div className="toolbar-search">
              <Search className="search-icon-color" size={18} />
              <input
                type="text"
                placeholder="Search by college name, course, city..."
                className="toolbar-search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button onClick={() => setSearchInput('')} style={{ color: 'var(--neutral-400)' }}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="toolbar-meta">
              <div className="results-count">
                Showing <span>{filteredColleges.length}</span> colleges
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Mobile Filters Toggle */}
                <button
                  className="btn btn-secondary mobile-filter-toggle"
                  onClick={() => setMobileFilterOpen(true)}
                  style={{ gap: '6px', padding: '8px 12px', fontSize: '13px' }}
                >
                  <SlidersHorizontal size={14} />
                  Filters
                </button>

                <div className="sort-select-wrapper">
                  <span>Sort by:</span>
                  <select
                    className="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="rating-desc">Rating: High to Low</option>
                    <option value="fees-asc">Fees: Low to High</option>
                    <option value="fees-desc">Fees: High to Low</option>
                    <option value="placement-desc">Average Placement: High to Low</option>
                    <option value="placement-highest">Highest Placement: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Listing Grid */}
          {loading ? (
            <div className="colleges-listing-grid">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="skeleton-card">
                  <div className="skeleton-banner shimmer-loading"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-title shimmer-loading"></div>
                    <div className="skeleton-line shimmer-loading"></div>
                    <div className="skeleton-stats shimmer-loading"></div>
                    <div className="skeleton-actions shimmer-loading"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginatedColleges.length > 0 ? (
            <>
              <div className="colleges-listing-grid stagger-container">
                {paginatedColleges.map((college) => (
                  <article key={college.id} className="college-card card-hover">
                    <div className="card-banner">
                      <img src={college.bannerImage} alt={college.name} />
                      <div className="card-logo">
                        <img src={college.logo} alt={college.name} />
                      </div>
                    </div>
                    <div className="card-content">
                      <div className="card-meta">
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span className="badge badge-primary">{college.ownership}</span>
                          <span className="badge badge-neutral">{college.streams[0]}</span>
                        </div>
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
                          <span className="stat-label">Avg Placement</span>
                          <span className="stat-val">{college.placementAverage} LPA</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-label">Avg Fees</span>
                          <span className="stat-val">
                            {college.fees > 2000 
                              ? `₹${(college.fees / 100000).toFixed(2)}L/yr`
                              : `₹${college.fees.toLocaleString()}/yr`
                            }
                          </span>
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
                          onClick={() => toggleCompareCollege(college.id)}
                          className={`btn ${isInCompareList(college.id) ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '8px 12px' }}
                          title="Add to Compare"
                        >
                          <GitCompare size={16} />
                        </button>
                        <button
                          onClick={() => toggleSaveCollege(college.id)}
                          className={`btn ${isSaved(college.id) ? 'btn-primary' : 'btn-secondary'}`}
                          style={{ padding: '8px 12px' }}
                          title={isSaved(college.id) ? "Saved" : "Save College"}
                        >
                          {isSaved(college.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <button
                    className="page-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                  >
                    «
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      className={`page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                      onClick={() => setCurrentPage(idx + 1)}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    className="page-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                  >
                    »
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="empty-state animate-slide-up">
              <div className="empty-state-icon">
                <Grid size={32} />
              </div>
              <h3 className="empty-state-title">No Colleges Found</h3>
              <p className="empty-state-desc">
                No institutions match your chosen filters. Try clearing some search tags or adjustments to the sliders.
              </p>
              <button onClick={clearAllFilters} className="btn btn-primary" style={{ gap: '6px' }}>
                <RefreshCw size={14} />
                Reset Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default Explore;
