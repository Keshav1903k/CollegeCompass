import React, { createContext, useContext, useState, useEffect } from 'react';

// Interfaces
export interface User {
  name: string;
  email: string;
}

export interface ForumReply {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface ForumQuestion {
  id: string;
  title: string;
  description: string;
  tags: string[];
  votes: number;
  userVoted?: 'up' | 'down';
  replies: ForumReply[];
  author: string;
  date: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Auth
  user: User | null;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  
  // Saved Colleges
  savedColleges: string[];
  toggleSaveCollege: (id: string) => void;
  isSaved: (id: string) => boolean;

  // Compare List
  compareList: string[];
  toggleCompareCollege: (id: string) => void;
  clearCompareList: () => void;
  isInCompareList: (id: string) => boolean;

  // Discussions
  questions: ForumQuestion[];
  addQuestion: (title: string, description: string, tags: string[]) => void;
  addReply: (questionId: string, content: string) => void;
  voteQuestion: (questionId: string, direction: 'up' | 'down') => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Discussion Questions
const initialQuestions: ForumQuestion[] = [
  {
    id: "q1",
    title: "Is BITS Pilani CS worth it over IIT Bombay Mechanical?",
    description: "I have secured a rank that gives me Mechanical at IIT Bombay, but my BITSAT score can fetch me Computer Science at BITS Pilani. I am highly interested in software engineering, but the IIT tag is tempting. What should I choose?",
    tags: ["Engineering", "BITS Pilani", "IIT Bombay", "Career Guidance"],
    votes: 18,
    author: "Rohan K.",
    date: "2026-06-15",
    replies: [
      {
        id: "r1_q1",
        author: "Siddharth Verma (Alumnus, IIT-B)",
        content: "If you are 100% sure about software engineering, choose BITS Pilani CS. The curriculum is top-notch, and top firms recruit extensively. However, if you want general exposure, entrepreneurship, or higher studies, IIT Bombay brand name and alumni network are unmatched.",
        date: "2026-06-16"
      },
      {
        id: "r2_q1",
        author: "Preeti Das (BITS '22)",
        content: "I faced a similar choice and chose Pilani CS. No attendance policy gave me time to code. The placements are on par with top 5 IITs. Plus, IT companies rarely allow non-CS students from IITs to sit for core software developer roles.",
        date: "2026-06-17"
      }
    ]
  },
  {
    id: "q2",
    title: "How is the clinical rotation exposure for MBBS at AIIMS Delhi?",
    description: "Can seniors share their experience regarding the patient variety, OPD load, and overall clinical teaching in MBBS rotations? Is the workload overwhelming?",
    tags: ["Medical", "AIIMS Delhi", "MBBS"],
    votes: 24,
    author: "Sneha J.",
    date: "2026-06-18",
    replies: [
      {
        id: "r1_q2",
        author: "Dr. Aman Deep",
        content: "The clinical exposure at AIIMS Delhi is simply the best in India. You will see cases in OPD that textbooks only mention in footnotes. Workload is demanding but teaches you resilience. Seniors and residents are very supportive.",
        date: "2026-06-19"
      }
    ]
  },
  {
    id: "q3",
    title: "What is the realistic CAT percentile needed for IIM Ahmedabad for a general engineer male?",
    description: "I have a 9/9/8 academic profile (10th/12th/B.Tech). Since GEM (General Engineer Male) candidates have high cutoffs, what is a safe CAT percentile to get a call for the interview?",
    tags: ["Management", "IIM Ahmedabad", "CAT Prep"],
    votes: 14,
    author: "Karthik R.",
    date: "2026-06-20",
    replies: [
      {
        id: "r1_q3",
        author: "Amit Patel (IIM-A '25)",
        content: "With a 9/9/8 profile, you have a solid academic base. However, for a GEM candidate, anything below 99.85 percentile makes a call difficult. Aim for 99.9+ percentile to be absolutely safe.",
        date: "2026-06-21"
      }
    ]
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('cc_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [savedColleges, setSavedColleges] = useState<string[]>(() => {
    const stored = localStorage.getItem('cc_saved');
    return stored ? JSON.parse(stored) : [];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const stored = localStorage.getItem('cc_compare');
    return stored ? JSON.parse(stored) : [];
  });

  const [questions, setQuestions] = useState<ForumQuestion[]>(() => {
    const stored = localStorage.getItem('cc_questions');
    return stored ? JSON.parse(stored) : initialQuestions;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('cc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cc_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cc_saved', JSON.stringify(savedColleges));
  }, [savedColleges]);

  useEffect(() => {
    localStorage.setItem('cc_compare', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('cc_questions', JSON.stringify(questions));
  }, [questions]);

  // Toast Helpers
  const addToast = (message: string, type: ToastMessage['type']) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth Actions
  const login = (email: string, name: string) => {
    setUser({ email, name });
    addToast(`Welcome back, ${name}!`, 'success');
  };

  const signup = (email: string, name: string) => {
    setUser({ email, name });
    addToast(`Account created! Welcome, ${name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    addToast("Logged out successfully.", 'info');
  };

  // Saved College Actions
  const toggleSaveCollege = (id: string) => {
    if (!user) {
      addToast("Please login to save colleges.", 'warning');
      return;
    }
    
    setSavedColleges((prev) => {
      const isExist = prev.includes(id);
      if (isExist) {
        addToast("Removed from saved colleges.", 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast("Added to saved colleges!", 'success');
        return [...prev, id];
      }
    });
  };

  const isSaved = (id: string) => savedColleges.includes(id);

  // Compare Actions
  const toggleCompareCollege = (id: string) => {
    setCompareList((prev) => {
      const isExist = prev.includes(id);
      if (isExist) {
        addToast("Removed from comparison list.", 'info');
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          addToast("You can compare up to 3 colleges at once.", 'error');
          return prev;
        }
        addToast("Added to comparison list!", 'success');
        return [...prev, id];
      }
    });
  };

  const clearCompareList = () => {
    setCompareList([]);
    addToast("Comparison list cleared.", 'info');
  };

  const isInCompareList = (id: string) => compareList.includes(id);

  // Discussion Actions
  const addQuestion = (title: string, description: string, tags: string[]) => {
    const newQuestion: ForumQuestion = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      description,
      tags: tags.map(t => t.trim()).filter(Boolean),
      votes: 0,
      replies: [],
      author: user ? user.name : "Anonymous Student",
      date: new Date().toISOString().split('T')[0]
    };

    setQuestions((prev) => [newQuestion, ...prev]);
    addToast("Your question has been posted!", 'success');
  };

  const addReply = (questionId: string, content: string) => {
    const newReply: ForumReply = {
      id: Math.random().toString(36).substring(2, 9),
      author: user ? user.name : "Anonymous Contributor",
      content,
      date: new Date().toISOString().split('T')[0]
    };

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return { ...q, replies: [...q.replies, newReply] };
        }
        return q;
      })
    );
    addToast("Your reply has been posted!", 'success');
  };

  const voteQuestion = (questionId: string, direction: 'up' | 'down') => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          let voteDiff = 0;
          let newUserVoted: 'up' | 'down' | undefined = direction;

          if (q.userVoted === direction) {
            // Undo vote
            voteDiff = direction === 'up' ? -1 : 1;
            newUserVoted = undefined;
          } else if (q.userVoted) {
            // Change direction (from up to down, or down to up)
            voteDiff = direction === 'up' ? 2 : -2;
          } else {
            // First time voting
            voteDiff = direction === 'up' ? 1 : -1;
          }

          return {
            ...q,
            votes: q.votes + voteDiff,
            userVoted: newUserVoted
          };
        }
        return q;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        savedColleges,
        toggleSaveCollege,
        isSaved,
        compareList,
        toggleCompareCollege,
        clearCompareList,
        isInCompareList,
        questions,
        addQuestion,
        addReply,
        voteQuestion,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
