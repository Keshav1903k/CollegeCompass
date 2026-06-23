import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import '../styles/Auth.css';

export const Login: React.FC = () => {
  const { login, signup, user, addToast } = useApp();
  const navigate = useNavigate();

  // Mode: true for login, false for signup
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Form parameters
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/saved');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      addToast("Please fill in email and password fields.", "warning");
      return;
    }

    if (isLoginMode) {
      // Mock login validation
      const displayName = email.split('@')[0];
      login(email, displayName.charAt(0).toUpperCase() + displayName.slice(1));
      navigate('/saved');
    } else {
      if (!name.trim()) {
        addToast("Please enter your full name for registration.", "warning");
        return;
      }
      signup(email, name);
      navigate('/saved');
    }
  };

  return (
    <div className="auth-page container animate-fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--primary)', marginBottom: '16px' }}>
            <Compass size={40} strokeWidth={2.5} className="animate-float" />
          </div>
          <h2>{isLoginMode ? "Welcome Back" : "Create Account"}</h2>
          <p>
            {isLoginMode 
              ? "Access your shortlisted universities and comparisons." 
              : "Register to manage saved listings, write reviews, and ask questions."
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLoginMode && (
            <div>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Priyan Bose"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="e.g. name@example.com"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter secure password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>
            <LogIn size={16} />
            {isLoginMode ? "Sign In" : "Register"}
          </button>
        </form>

        <div className="auth-toggle-row">
          <span>
            {isLoginMode ? "New to CampusCompass?" : "Already have an account?"}
          </span>
          <button 
            onClick={() => setIsLoginMode(!isLoginMode)} 
            className="auth-toggle-btn"
          >
            {isLoginMode ? "Create an account" : "Sign in here"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
