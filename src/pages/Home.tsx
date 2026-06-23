import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Compass, GitCompare, Star, MapPin } from 'lucide-react';
import { mockColleges } from '../data/colleges';
import { useApp } from '../context/AppContext';
import './Home.css';

interface FAQ {
  question: string;
  answer: string;
}

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { toggleCompareCollege, isInCompareList } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Take top 3 rated colleges for Featured section
  const featuredColleges = [...mockColleges]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // Take a few recent reviews from colleges
  const reviewsPreview = mockColleges
    .flatMap((c) => c.reviews.map((r) => ({ ...r, collegeName: c.name })))
    .slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/colleges');
    }
  };

  const handleStreamClick = (stream: string) => {
    navigate(`/colleges?stream=${encodeURIComponent(stream)}`);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      question: "How does the Admission Predictor tool work?",
      answer: "The Predictor tool takes your rank or score in national exams like JEE Mains, CAT, NEET, or CLAT and evaluates it against previous years' cutoff ranks of various colleges. It returns a match score and admission probability (High, Medium, or Low) dynamically."
    },
    {
      question: "Is there any charge for applying to colleges through CampusCompass?",
      answer: "No, CampusCompass is a completely free, student-first platform. We provide tools to help you discover, compare, and save colleges without any charges."
    },
    {
      question: "How often is the college placement and fees data updated?",
      answer: "All placement logs, highest packages, and average annual fees are verified and updated on an annual basis in coordination with official college release reports."
    },
    {
      question: "Can I compare colleges across different streams?",
      answer: "Yes, you can select and compare up to 3 colleges simultaneously in our Compare Tool. It highlights key values like placements-to-fees ratios side-by-side."
    }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Background decorations for modern premium aesthetic */}
      <div className="bg-decorations">
        <div className="decor-circle decor-1 animate-float"></div>
        <div className="decor-circle decor-2" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <span className="section-tag animate-slide-up">Discover your path</span>
          <h1 className="hero-headline animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Find the Right College with <span>Confidence</span>
          </h1>
          <p className="hero-subtitle animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Search, compare, and shortlist top-rated universities tailored to your career aspirations.
          </p>

          <form onSubmit={handleSearchSubmit} className="search-container animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="search-input-wrapper">
              <Search className="search-icon-color" size={20} />
              <input
                type="text"
                placeholder="Search college name, location, or course (e.g. Computer Science)..."
                className="search-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Search Now
            </button>
          </form>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Editor's Choice</span>
            <h2 className="section-title">Featured Institutions</h2>
            <p className="section-desc">Explore some of the country's top-performing colleges ranked high on academics and placements.</p>
          </div>

          <div className="featured-grid stagger-container">
            {featuredColleges.map((college) => (
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
                      <span className="stat-label">Avg Fees</span>
                      <span className="stat-val">₹{(college.fees / 100000).toFixed(2)}L/yr</span>
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
                      title="Compare College"
                    >
                      <GitCompare size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Top Streams Section */}
      <section className="home-section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Categorized Search</span>
            <h2 className="section-title">Explore Top Streams</h2>
            <p className="section-desc">Filter colleges by standard fields of study to narrow down your selection.</p>
          </div>

          <div className="streams-grid">
            {[
              { name: "Engineering", count: "3 Colleges", icon: "/icons/medical.png", className: "engineering" },
              { name: "Management", count: "3 Colleges", icon: "/icons/engineering.png", className: "management" },
              { name: "Medical", count: "2 Colleges", icon: "/icons/management.png", className: "medical" },
              { name: "Law", count: "2 Colleges", icon: "/icons/law.png", className: "law" }
            ].map((stream) => (
              <div 
                key={stream.name} 
                className={`stream-card ${stream.className}`}
                onClick={() => handleStreamClick(stream.name)}
              >
                <div className="stream-icon-wrapper">
                  <img src={stream.icon} alt={stream.name} className="stream-icon" />
                </div>
                <div>
                  <div className="stream-name">{stream.name}</div>
                  <div className="stream-count">{stream.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Split CTA Section */}
      <section className="home-section">
        <div className="container">
          <div className="cta-split-container">
            <div className="cta-box cta-box-primary">
              <div>
                <h3 className="cta-title">Not Sure Which College is Best?</h3>
                <p className="cta-desc">
                  Select multiple institutions to examine side-by-side differences in course structures, fees, ratings, and placement reports.
                </p>
              </div>
              <button onClick={() => navigate('/compare')} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <GitCompare size={16} />
                Open Compare Tool
              </button>
            </div>

            <div className="cta-box cta-box-secondary">
              <div>
                <h3 className="cta-title">Predict Admission Chances</h3>
                <p className="cta-desc">
                  Enter your rank or marks from competitive exams like CAT, JEE Mains, or NEET, and instantly discover which campuses fall in your eligible bracket.
                </p>
              </div>
              <button onClick={() => navigate('/predictor')} className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                <Compass size={16} />
                Try Predictor Tool
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews Preview Section */}
      <section className="home-section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Student Voices</span>
            <h2 className="section-title">Verified Reviews</h2>
            <p className="section-desc">Read opinions from actual students currently enrolled in top institutions.</p>
          </div>

          <div className="reviews-grid">
            {reviewsPreview.map((review) => (
              <div key={review.id} className="review-preview-card">
                <div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        fill={idx < Math.round(review.rating) ? 'var(--warning)' : 'none'}
                        color={idx < Math.round(review.rating) ? 'var(--warning)' : 'var(--neutral-300)'}
                      />
                    ))}
                  </div>
                  <p className="review-quote">"{review.comment}"</p>
                </div>
                <div className="review-user-info">
                  <span className="review-author">{review.userName}</span>
                  <span className="review-college-tag">{review.collegeName.split('(')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Clarifications</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">Got questions? We've compiled quick answers to common platform and admission processes queries.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`faq-item ${openFaqIndex === idx ? 'open' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(idx)}>
                  <span>{faq.question}</span>
                  <ChevronDown className="faq-icon" size={18} />
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
