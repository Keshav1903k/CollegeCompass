import React from 'react';
import { CheckCircle, Info, AlertTriangle, XCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ToastMessage } from '../context/AppContext';
import './Toast.css';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useApp();

  const getIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} />;
      case 'info':
        return <Info size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      case 'error':
        return <XCircle size={18} />;
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="assertive">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {getIcon(toast.type)}
          </span>
          <div className="toast-message">{toast.message}</div>
          <button
            onClick={() => removeToast(toast.id)}
            className="toast-close"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
export default Toast;
