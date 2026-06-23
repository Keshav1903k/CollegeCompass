import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, AlertCircle, RefreshCw, Bookmark, BookmarkCheck, Star, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockColleges } from '../data/colleges';
import type { College } from '../data/colleges';
import './Predictor.css';

interface PredictionResult {
  college: College;
  matchScore: number;
  chance: 'High' | 'Medium' | 'Low';
}

export const Predictor: React.FC = () => {
  const { toggleSaveCollege, isSaved, addToast } = useApp();
  const navigate = useNavigate();

  // Form States
  const [selectedExam, setSelectedExam] = useState<'JEE Mains' | 'CAT' | 'NEET' | 'CLAT'>('JEE Mains');
  const [rankInput, setRankInput] = useState('');
  
  // Page UI States
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult[] | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Predictor logic
  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const rank = parseInt(rankInput, 10);

    if (isNaN(rank) || rank <= 0) {
      addToast("Please enter a valid rank greater than 0.", "error");
      return;
    }

    setLoading(true);
    setSubmitted(true);

    // Simulate analysis loading (1.2 seconds)
    setTimeout(() => {
      const matched: PredictionResult[] = [];

      mockColleges.forEach((college) => {
        const cutoffRange = college.cutoffs[selectedExam];
        if (!cutoffRange) return; // College doesn't accept this exam

        const { minRank, maxRank } = cutoffRange;

        // Prediction calculations
        if (rank <= minRank) {
          // Extremely competitive rank (better than minRank)
          matched.push({
            college,
            matchScore: Math.floor(92 + Math.random() * 7), // 92-99%
            chance: 'High'
          });
        } else if (rank > minRank && rank <= maxRank) {
          // Inside matching range
          const rangeWidth = maxRank - minRank;
          const userOffset = rank - minRank;
          const ratio = 1 - (userOffset / rangeWidth); // 0 to 1
          const matchScore = Math.floor(55 + ratio * 35); // 55-90%

          matched.push({
            college,
            matchScore,
            chance: matchScore >= 75 ? 'High' : 'Medium'
          });
        } else if (rank > maxRank && rank <= maxRank * 1.6) {
          // Marginally outside the cutoff range
          const rangeWidth = maxRank * 0.6;
          const userOffset = rank - maxRank;
          const ratio = 1 - (userOffset / rangeWidth); // 0 to 1
          const matchScore = Math.floor(25 + ratio * 25); // 25-50%

          matched.push({
            college,
            matchScore,
            chance: 'Low'
          });
        }
      });

      // Sort matched colleges by match score descending
      matched.sort((a, b) => b.matchScore - a.matchScore);

      setResults(matched);
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setRankInput('');
    setResults(null);
    setSubmitted(false);
  };

  const getChanceBadgeClass = (chance: PredictionResult['chance']) => {
    switch (chance) {
      case 'High':
        return 'badge-success';
      case 'Medium':
        return 'badge-warning';
      case 'Low':
        return 'badge-danger';
    }
  };

  return (
    <div className="predictor-page container animate-fade-in">
      <div className="compare-header">
        <span className="section-tag">Admission Analytics</span>
        <h2 className="section-title" style={{ fontSize: '36px' }}>Admission Predictor</h2>
        <p className="section-desc">
          Predict your admission chances at top institutions based on cutoff analytics.
        </p>
      </div>

      <div className="predictor-grid">
        {/* Left Column - Input Card */}
        <div className="predictor-card">
          <h3 className="predictor-title">Prediction Parameters</h3>
          <p className="predictor-subtitle">
            Enter your competitive exam rankings to run matching diagnostics against our database.
          </p>

          <form onSubmit={handlePredict} className="predictor-form">
            <div>
              <label className="form-label">Entrance Exam</label>
              <select
                className="form-input"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value as any)}
                required
              >
                <option value="JEE Mains">JEE Mains (Engineering)</option>
                <option value="CAT">CAT (Management)</option>
                <option value="NEET">NEET (Medical)</option>
                <option value="CLAT">CLAT (Law)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Your Cutoff Rank</label>
              <input
                type="number"
                className="form-input"
                placeholder="e.g. 1500"
                value={rankInput}
                onChange={(e) => setRankInput(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                Run Diagnostics
              </button>
              {submitted && (
                <button type="button" onClick={handleReset} className="btn btn-secondary">
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column - Predictions Panel */}
        <div className="predictor-results-panel">
          {loading ? (
            /* Loading Simulator */
            <div className="prediction-loader">
              <div className="spinner"></div>
              <div className="prediction-loader-text">Analyzing cutoffs and computing ratios...</div>
            </div>
          ) : results !== null ? (
            results.length > 0 ? (
              /* Predictions List */
              <>
                <h3 className="results-heading">
                  <Sparkles size={20} style={{ color: 'var(--primary)' }} />
                  Eligible Campuses ({results.length})
                </h3>

                <div className="stagger-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {results.map(({ college, matchScore, chance }) => (
                    <div key={college.id} className="prediction-item-card">
                      <div className="prediction-college-info">
                        <div className="prediction-college-logo">
                          <img src={college.logo} alt={college.name} />
                        </div>
                        <div className="prediction-college-details">
                          <h4>{college.name.split('(')[0]}</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                            <span className="badge badge-neutral" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Star size={12} fill="var(--warning)" color="var(--warning)" />
                              {college.rating}
                            </span>
                            <span style={{ fontSize: '13px', color: 'var(--neutral-500)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={12} />
                              {college.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="prediction-metrics">
                        <div className="match-score-badge">
                          <div className="match-score-val">{matchScore}%</div>
                          <div className="match-score-lbl">Match Score</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                          <span className={`badge ${getChanceBadgeClass(chance)}`} style={{ padding: '6px 12px', fontSize: '12px' }}>
                            {chance} Chance
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => navigate(`/college/${college.id}`)}
                            className="btn btn-secondary"
                            style={{ padding: '8px 12px', fontSize: '13px' }}
                          >
                            Details
                          </button>
                          <button
                            onClick={() => toggleSaveCollege(college.id)}
                            className={`btn ${isSaved(college.id) ? 'btn-primary' : 'btn-secondary'}`}
                            style={{ padding: '8px 12px' }}
                            title="Shortlist"
                          >
                            {isSaved(college.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              /* No matching colleges Empty State */
              <div className="empty-state">
                <div className="empty-state-icon" style={{ background: 'var(--danger-light)', color: 'var(--danger)' }}>
                  <AlertCircle size={32} />
                </div>
                <h3 className="empty-state-title">No Eligible Campuses Found</h3>
                <p className="empty-state-desc">
                  Based on historical trends, your rank of <strong>{rankInput}</strong> in <strong>{selectedExam}</strong> is above the previous cutoffs of colleges in our database. Try another exam or enter a lower rank.
                </p>
                <button onClick={handleReset} className="btn btn-primary" style={{ gap: '6px' }}>
                  <RefreshCw size={14} />
                  Adjust Parameters
                </button>
              </div>
            )
          ) : (
            /* Guide Empty State (Before search) */
            <div className="empty-state" style={{ maxWidth: '100%', margin: '0' }}>
              <div className="empty-state-icon">
                <Compass size={32} />
              </div>
              <h3 className="empty-state-title">Enter Parameters to Start</h3>
              <p className="empty-state-desc">
                Fill in the cutoff details on the left panel to execute our matching diagnostics and calculate admission chance metrics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Predictor;
