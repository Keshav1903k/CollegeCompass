import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, MapPin, Building, Landmark, Compass, Award, ShieldAlert, ArrowLeft, Bookmark, BookmarkCheck, GitCompare, MessageSquare, Image, X } from 'lucide-react';
import { mockColleges } from '../data/colleges';
import type { Review } from '../data/colleges';
import { useApp } from '../context/AppContext';
import './Detail.css';

export const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    toggleSaveCollege, 
    isSaved, 
    toggleCompareCollege, 
    isInCompareList, 
    user,
    addToast 
  } = useApp();

  // Find college
  const college = mockColleges.find((c) => c.id === id);

  // States
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'placements' | 'reviews' | 'gallery'>('overview');
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState<Review[]>(college ? college.reviews : []);

  // Review Form States
  const [newReviewName, setNewReviewName] = useState(user ? user.name : '');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewCourse, setNewReviewCourse] = useState('');

  // Apply Form States
  const [applyName, setApplyName] = useState(user ? user.name : '');
  const [applyEmail, setApplyEmail] = useState(user ? user.email : '');
  const [applyPhone, setApplyPhone] = useState('');
  const [applyCourse, setApplyCourse] = useState(college?.courses[0]?.name || '');
  const [applyMessage, setApplyMessage] = useState('');

  if (!college) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div className="empty-state">
          <div className="empty-state-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <ShieldAlert size={32} />
          </div>
          <h2 className="empty-state-title">College Not Found</h2>
          <p className="empty-state-desc">
            The institution profile you are trying to access does not exist or has been removed from our listings.
          </p>
          <Link to="/colleges" className="btn btn-primary">
            <ArrowLeft size={16} />
            Back to Explore
          </Link>
        </div>
      </div>
    );
  }

  // Handle Application Submit
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(`Successfully applied to ${college.name} for ${applyCourse}! An admissions consultant will reach out shortly.`, 'success');
    setIsApplyOpen(false);
    // Clear apply form
    setApplyPhone('');
    setApplyMessage('');
  };

  // Handle Review Submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim() || !newReviewCourse.trim()) {
      addToast("Please fill out all fields in the review form.", "warning");
      return;
    }

    const newRev: Review = {
      id: Math.random().toString(36).substring(2, 9),
      userName: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment,
      date: new Date().toISOString().split('T')[0],
      course: newReviewCourse
    };

    setReviewsList((prev) => [newRev, ...prev]);
    addToast("Your review has been successfully posted!", "success");

    // Clear form
    setNewReviewComment('');
    setNewReviewCourse('');
    if (!user) setNewReviewName('');
  };

  // Calculate aggregated reviews stats
  const totalReviewsCount = reviewsList.length;
  const averageReviewRating = totalReviewsCount > 0 
    ? (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviewsCount).toFixed(1)
    : college.rating;

  // Breakdown of star counts
  const starCounts = [0, 0, 0, 0, 0]; // 1,2,3,4,5
  reviewsList.forEach(r => {
    const starIdx = Math.min(Math.max(1, Math.round(r.rating)), 5) - 1;
    starCounts[starIdx]++;
  });

  return (
    <div className="detail-page animate-fade-in">
      {/* College Hero Banner */}
      <section className="detail-hero">
        <img className="detail-hero-img" src={college.bannerImage} alt={college.name} />
        <div className="detail-hero-overlay"></div>
        <div className="detail-hero-content container">
          <div className="detail-header-flex">
            <div className="detail-logo-wrapper">
              <img src={college.logo} alt={college.name} />
            </div>
            <div className="detail-title-section">
              <div className="detail-meta-tags" style={{ marginBottom: '8px' }}>
                <span className="badge badge-primary">{college.ownership}</span>
                <span className="rating-badge">
                  <Star size={14} fill="currentColor" />
                  {averageReviewRating}
                </span>
                <span className="badge badge-neutral" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>
                  Est. {college.established}
                </span>
              </div>
              <h1>{college.name}</h1>
              <div className="detail-meta-tags">
                <span className="detail-meta-text">
                  <MapPin size={16} />
                  {college.location}, {college.state}
                </span>
                <span style={{ color: 'var(--neutral-400)' }}>•</span>
                <span className="detail-meta-text">
                  <Compass size={16} />
                  {college.streams.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="container detail-body-grid">
        {/* Left Column - Navigation and details */}
        <div>
          {/* Nav Tabs */}
          <nav className="detail-tabs-bar">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveTab('courses')}
            >
              Courses & Fees
            </button>
            <button
              className={`tab-btn ${activeTab === 'placements' ? 'active' : ''}`}
              onClick={() => setActiveTab('placements')}
            >
              Placements
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({totalReviewsCount})
            </button>
            <button
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Campus Gallery
            </button>
          </nav>

          {/* Tab Panes */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <h2 className="pane-title">
                <Building size={20} className="logo-icon" />
                About the College
              </h2>
              <p className="pane-text">
                {college.name} is a premier {college.ownership.toLowerCase()} institution established in {college.established} in the city of {college.location}, {college.state}. 
                Widely recognized for its high academic rigor and excellent placement records, the campus houses state-of-the-art facilities designed to foster technical growth and industry readiness.
              </p>
              
              <h3 className="pane-title" style={{ marginTop: '32px', fontSize: '18px' }}>Key Statistics</h3>
              <div className="stats-cards-grid">
                <div className="stat-metric-card">
                  <div className="metric-val">{college.placementAverage} LPA</div>
                  <div className="metric-label">Average Package</div>
                </div>
                <div className="stat-metric-card">
                  <div className="metric-val">{college.placementHighest} LPA</div>
                  <div className="metric-label">Highest Package</div>
                </div>
                <div className="stat-metric-card">
                  <div className="metric-val">
                    {college.fees > 2000 
                      ? `₹${(college.fees / 100000).toFixed(2)}L/yr`
                      : `₹${college.fees.toLocaleString()}`
                    }
                  </div>
                  <div className="metric-label">Avg annual fee</div>
                </div>
              </div>

              <h3 className="pane-title" style={{ marginTop: '32px', fontSize: '18px' }}>Available Facilities</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {college.facilities.map((fac, idx) => (
                  <span key={idx} className="badge badge-neutral" style={{ padding: '8px 14px', fontSize: '13px' }}>
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="tab-pane">
              <h2 className="pane-title">
                <Landmark size={20} className="logo-icon" />
                Courses, Fees & Eligibility
              </h2>
              <div className="courses-table-container">
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Course Name</th>
                      <th>Duration</th>
                      <th>Annual Fees</th>
                      <th>Eligibility</th>
                    </tr>
                  </thead>
                  <tbody>
                    {college.courses.map((course, idx) => (
                      <tr key={idx}>
                        <td style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{course.name}</td>
                        <td>{course.duration}</td>
                        <td style={{ color: 'var(--primary)', fontWeight: 600 }}>{course.fees}</td>
                        <td style={{ fontSize: '13px' }}>{course.eligibility}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div className="tab-pane">
              <h2 className="pane-title">
                <Award size={20} className="logo-icon" />
                Placement Records
              </h2>
              <p className="pane-text">
                The corporate placement cell organizes recruitment drives, industrial projects, and professional workshops to prep graduates for tier-1 companies.
              </p>
              
              <div className="stats-cards-grid" style={{ marginBottom: '32px' }}>
                <div className="stat-metric-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                  <div className="metric-val" style={{ color: 'var(--primary)' }}>{college.placementAverage} LPA</div>
                  <div className="metric-label">Average Annual CTC</div>
                </div>
                <div className="stat-metric-card" style={{ borderLeft: '4px solid var(--success)' }}>
                  <div className="metric-val" style={{ color: 'var(--success)' }}>{college.placementHighest} LPA</div>
                  <div className="metric-label">Highest Package Offered</div>
                </div>
                <div className="stat-metric-card" style={{ borderLeft: '4px solid var(--warning)' }}>
                  <div className="metric-val" style={{ color: 'var(--warning)' }}>100%</div>
                  <div className="metric-label">Placement Rate</div>
                </div>
              </div>

              <h3 className="pane-title" style={{ fontSize: '18px' }}>Top Recruiters</h3>
              <div className="recruiters-grid">
                {["Google", "Microsoft", "Amazon", "Goldman Sachs", "McKinsey", "Boston Consulting", "Tata Motors", "Reliance Ind."].map((rec, idx) => (
                  <div key={idx} className="recruiter-tag">
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane">
              <h2 className="pane-title">
                <MessageSquare size={20} className="logo-icon" />
                Student Reviews
              </h2>

              <div className="reviews-summary-box">
                <div>
                  <div className="rating-big-number">{averageReviewRating}</div>
                  <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '6px' }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        fill={idx < Math.round(Number(averageReviewRating)) ? 'var(--warning)' : 'none'}
                        color={idx < Math.round(Number(averageReviewRating)) ? 'var(--warning)' : 'var(--neutral-300)'}
                      />
                    ))}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--neutral-400)', marginTop: '8px', fontWeight: 600 }}>
                    Based on {totalReviewsCount} reviews
                  </div>
                </div>
                <div>
                  {starCounts.map((count, index) => {
                    const stars = index + 1;
                    const percent = totalReviewsCount > 0 ? (count / totalReviewsCount) * 100 : 0;
                    return (
                      <div key={index} className="rating-bar-row">
                        <span style={{ width: '40px', fontWeight: 600 }}>{stars} Star</span>
                        <div className="rating-bar-bg">
                          <div className="rating-bar-fill" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span style={{ width: '28px', color: 'var(--neutral-400)', textAlign: 'right' }}>{count}</span>
                      </div>
                    );
                  }).reverse()}
                </div>
              </div>

              <div className="reviews-list">
                {reviewsList.length > 0 ? (
                  reviewsList.map((rev) => (
                    <div key={rev.id} className="review-item">
                      <div className="review-header">
                        <div>
                          <span className="review-user-name">{rev.userName}</span>
                          <span style={{ fontSize: '12px', color: 'var(--neutral-400)', marginLeft: '10px' }}>{rev.date}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '2px' }}>
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={12}
                              fill={idx < rev.rating ? 'var(--warning)' : 'none'}
                              color={idx < rev.rating ? 'var(--warning)' : 'var(--neutral-300)'}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="badge badge-neutral" style={{ fontSize: '11px', padding: '2px 8px' }}>
                        {rev.course}
                      </div>
                      <p className="review-text">"{rev.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlign: 'center', color: 'var(--neutral-400)', padding: '24px 0' }}>No reviews yet. Be the first to write one!</p>
                )}
              </div>

              {/* Add review form */}
              <form onSubmit={handleReviewSubmit} className="review-form-section">
                <h3 className="pane-title" style={{ fontSize: '18px', marginBottom: '8px' }}>Write a Review</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Priyan Bose"
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Course / Stream</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. B.Tech CS"
                      value={newReviewCourse}
                      onChange={(e) => setNewReviewCourse(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Overall Rating</label>
                  <div className="star-rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`star-input-btn ${newReviewRating >= star ? 'filled' : ''}`}
                        onClick={() => setNewReviewRating(star)}
                      >
                        <Star size={24} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="form-label">Review Comment</label>
                  <textarea
                    rows={4}
                    className="form-input"
                    placeholder="Share your academic experience, hostel conditions, placement feedback..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  Post Review
                </button>
              </form>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="tab-pane">
              <h2 className="pane-title">
                <Image size={20} className="logo-icon" />
                Campus Infrastructure Gallery
              </h2>
              <div className="gallery-grid">
                {college.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="gallery-photo">
                    <img src={imgUrl} alt={`Infrastructure ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sticky Quick Action Sidebar */}
        <aside className="detail-sidebar-panel">
          <h3 className="sidebar-heading">Admission Desk</h3>
          
          <div className="sidebar-stats-list">
            <div className="sidebar-stat-row">
              <span>Established</span>
              <span>{college.established}</span>
            </div>
            <div className="sidebar-stat-row">
              <span>Ownership</span>
              <span>{college.ownership}</span>
            </div>
            <div className="sidebar-stat-row">
              <span>Streams</span>
              <span>{college.streams.join(', ')}</span>
            </div>
            <div className="sidebar-stat-row">
              <span>Average Fee</span>
              <span>
                {college.fees > 2000
                  ? `₹${(college.fees / 100000).toFixed(2)} Lakhs/yr`
                  : `₹${college.fees.toLocaleString()}/yr`
                }
              </span>
            </div>
            <div className="sidebar-stat-row">
              <span>Eligible Exams</span>
              <span>{Object.keys(college.cutoffs).join(', ') || 'Direct Entrance'}</span>
            </div>
          </div>

          <button 
            onClick={() => setIsApplyOpen(true)}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '12px' }}
          >
            Apply Now
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              onClick={() => toggleSaveCollege(college.id)}
              className={`btn ${isSaved(college.id) ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '13px', padding: '10px 8px' }}
            >
              {isSaved(college.id) ? (
                <>
                  <BookmarkCheck size={16} />
                  Shortlisted
                </>
              ) : (
                <>
                  <Bookmark size={16} />
                  Shortlist
                </>
              )}
            </button>

            <button
              onClick={() => toggleCompareCollege(college.id)}
              className={`btn ${isInCompareList(college.id) ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '13px', padding: '10px 8px' }}
            >
              <GitCompare size={16} />
              {isInCompareList(college.id) ? 'Added' : 'Compare'}
            </button>
          </div>
        </aside>
      </div>

      {/* Application Popup Modal */}
      {isApplyOpen && (
        <div className="modal-overlay" onClick={() => setIsApplyOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Apply to {college.name.split('(')[0]}</h3>
              <button onClick={() => setIsApplyOpen(false)} style={{ color: 'var(--neutral-400)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleApplySubmit}>
              <div className="modal-body">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="e.g. +91 9876543210"
                    value={applyPhone}
                    onChange={(e) => setApplyPhone(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Select Course of Interest</label>
                  <select
                    className="form-input"
                    value={applyCourse}
                    onChange={(e) => setApplyCourse(e.target.value)}
                    required
                  >
                    {college.courses.map((c, idx) => (
                      <option key={idx} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Why are you interested? (Optional)</label>
                  <textarea
                    rows={3}
                    className="form-input"
                    placeholder="Tell the admissions panel a bit about yourself..."
                    value={applyMessage}
                    onChange={(e) => setApplyMessage(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsApplyOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
