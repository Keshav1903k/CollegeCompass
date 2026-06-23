import React, { useState, useMemo } from 'react';
import { MessageSquare, Plus, ArrowUpCircle, ArrowDownCircle, Search, HelpCircle, ChevronRight, ArrowLeft, Send, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../styles/Discussions.css';

export const Discussions: React.FC = () => {
  const { questions, addQuestion, addReply, voteQuestion, user, addToast } = useApp();

  // Search & Sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');

  // Expanded Thread State
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // Ask Question Modal state
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Answer Form state
  const [newAnswerText, setNewAnswerText] = useState('');

  // Find the currently expanded question
  const activeQuestion = useMemo(() => {
    return questions.find((q) => q.id === selectedQuestionId) || null;
  }, [questions, selectedQuestionId]);

  // Filter and Sort questions list
  const processedQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        const query = searchQuery.toLowerCase().trim();
        return (
          !query ||
          q.title.toLowerCase().includes(query) ||
          q.description.toLowerCase().includes(query) ||
          q.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        if (sortBy === 'recent') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return b.votes - a.votes;
      });
  }, [questions, searchQuery, sortBy]);

  // Handle Ask Question Submit
  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      addToast("Please enter a question title and description.", "warning");
      return;
    }

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addQuestion(newTitle, newDesc, tagsArray);
    
    // Clear & Close
    setNewTitle('');
    setNewTags('');
    setNewDesc('');
    setAskModalOpen(false);
  };

  // Handle Reply Submit
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnswerText.trim()) return;

    if (selectedQuestionId) {
      addReply(selectedQuestionId, newAnswerText.trim());
      setNewAnswerText('');
    }
  };

  return (
    <div className="discussions-page container animate-fade-in">
      {activeQuestion ? (
        /* Expanded Thread Panel View */
        <div className="thread-expanded-view">
          <button 
            onClick={() => setSelectedQuestionId(null)}
            className="btn btn-secondary" 
            style={{ alignSelf: 'flex-start', gap: '6px' }}
          >
            <ArrowLeft size={16} />
            Back to Discussions
          </button>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
            {/* Votes panel */}
            <div className="vote-panel">
              <button 
                className={`vote-btn ${activeQuestion.userVoted === 'up' ? 'voted-up' : ''}`}
                onClick={() => voteQuestion(activeQuestion.id, 'up')}
                title="Upvote"
              >
                <ArrowUpCircle size={22} />
              </button>
              <span className="vote-count">{activeQuestion.votes}</span>
              <button 
                className={`vote-btn ${activeQuestion.userVoted === 'down' ? 'voted-down' : ''}`}
                onClick={() => voteQuestion(activeQuestion.id, 'down')}
                title="Downvote"
              >
                <ArrowDownCircle size={22} />
              </button>
            </div>

            {/* Core Info */}
            <div style={{ flex: 1 }}>
              <h2 className="question-card-title" style={{ fontSize: '24px', marginBottom: '12px' }}>
                {activeQuestion.title}
              </h2>
              <div className="question-tags-row">
                {activeQuestion.tags.map((tag) => (
                  <span key={tag} className="badge badge-primary">{tag}</span>
                ))}
              </div>
              <p className="pane-text" style={{ marginTop: '16px', color: 'var(--neutral-700)' }}>
                {activeQuestion.description}
              </p>
              
              <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--neutral-400)', marginTop: '20px', fontWeight: 500 }}>
                <span>Asked by</span>
                <span className="question-author-span">{activeQuestion.author}</span>
                <span>•</span>
                <span>{activeQuestion.date}</span>
              </div>
            </div>
          </div>

          {/* Replies Section */}
          <div className="thread-replies-list">
            <h3 className="pane-title" style={{ fontSize: '18px' }}>
              Answers ({activeQuestion.replies.length})
            </h3>
            
            {activeQuestion.replies.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {activeQuestion.replies.map((reply) => (
                  <div key={reply.id} className="reply-bubble">
                    <div className="reply-header-info">
                      <span style={{ color: 'var(--neutral-700)', fontWeight: 700 }}>{reply.author}</span>
                      <span>{reply.date}</span>
                    </div>
                    <div className="reply-content-text">{reply.content}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--neutral-400)', fontStyle: 'italic', padding: '12px 0' }}>
                No answers posted yet. Help this student by writing your answer below!
              </p>
            )}
          </div>

          {/* Add Answer Form */}
          <form onSubmit={handleReplySubmit} className="answer-form">
            <h3 className="pane-title" style={{ fontSize: '16px', marginBottom: '4px' }}>Provide Your Answer</h3>
            <div>
              <textarea
                rows={4}
                className="form-input"
                placeholder={
                  user 
                    ? "Explain clearly, cite facts or experiences..." 
                    : "Post anonymously or sign in to post as a verified account..."
                }
                value={newAnswerText}
                onChange={(e) => setNewAnswerText(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              <Send size={14} />
              Post Answer
            </button>
          </form>
        </div>
      ) : (
        /* Q&A Discussions listing view */
        <>
          <div className="forum-toolbar">
            <div className="forum-search-box">
              <Search size={18} className="search-icon-color" />
              <input
                type="text"
                placeholder="Search forum, tags, topics..."
                className="forum-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="forum-actions-group">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="votes">Top Voted</option>
                <option value="recent">Most Recent</option>
              </select>

              <button 
                onClick={() => setAskModalOpen(true)}
                className="btn btn-primary" 
                style={{ gap: '6px' }}
              >
                <Plus size={16} />
                Ask a Question
              </button>
            </div>
          </div>

          {/* List of Questions */}
          {processedQuestions.length > 0 ? (
            <div className="forum-list-container">
              {processedQuestions.map((q) => (
                <div key={q.id} className="question-card">
                  {/* Left Votes */}
                  <div className="vote-panel">
                    <button 
                      className={`vote-btn ${q.userVoted === 'up' ? 'voted-up' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        voteQuestion(q.id, 'up');
                      }}
                      title="Upvote"
                    >
                      <ArrowUpCircle size={20} />
                    </button>
                    <span className="vote-count">{q.votes}</span>
                    <button 
                      className={`vote-btn ${q.userVoted === 'down' ? 'voted-down' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        voteQuestion(q.id, 'down');
                      }}
                      title="Downvote"
                    >
                      <ArrowDownCircle size={20} />
                    </button>
                  </div>

                  {/* Core Question Info */}
                  <div className="question-info">
                    <button 
                      onClick={() => setSelectedQuestionId(q.id)}
                      className="question-card-title"
                      style={{ textAlign: 'left' }}
                    >
                      {q.title}
                    </button>
                    <p className="question-card-desc">{q.description}</p>
                    <div className="question-tags-row">
                      {q.tags.map((tag) => (
                        <span key={tag} className="badge badge-neutral">{tag}</span>
                      ))}
                    </div>

                    <div className="question-meta-footer">
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span>Posted by</span>
                        <span className="question-author-span">{q.author}</span>
                        <span>•</span>
                        <span>{q.date}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedQuestionId(q.id)}
                        className="replies-count-tag"
                      >
                        <MessageSquare size={14} />
                        {q.replies.length} replies
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Forum Empty State */
            <div className="empty-state">
              <div className="empty-state-icon">
                <HelpCircle size={32} />
              </div>
              <h3 className="empty-state-title">No Discussions Found</h3>
              <p className="empty-state-desc">
                We couldn't find any threads matching your search criteria. Post a new question to start a thread!
              </p>
              <button onClick={() => setAskModalOpen(true)} className="btn btn-primary" style={{ gap: '6px' }}>
                <Plus size={16} />
                Ask the Community
              </button>
            </div>
          )}
        </>
      )}

      {/* Ask Question Popup Modal */}
      {askModalOpen && (
        <div className="modal-overlay" onClick={() => setAskModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Ask the Student Forum</h3>
              <button onClick={() => setAskModalOpen(false)} style={{ color: 'var(--neutral-400)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAskSubmit}>
              <div className="modal-body">
                <div>
                  <label className="form-label">Question Title</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Is hostels AC facilities provided at IIT Bombay?"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Tags (comma separated)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Engineering, IIT Bombay, Hostels"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Details / Context</label>
                  <textarea
                    rows={4}
                    className="form-input modal-textarea"
                    placeholder="Provide relevant details about your question..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setAskModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Discussions;
