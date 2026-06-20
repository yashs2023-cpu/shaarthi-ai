import React from 'react';
import { useToast } from '../../contexts/ToastContext';

const ICONS = {
  success: '✅',
  error:   '❌',
  warning: '⚠️',
  info:    'ℹ️',
};

const COLORS = {
  success: { bg: '#065F46', border: '#10B981' },
  error:   { bg: '#7F1D1D', border: '#EF4444' },
  warning: { bg: '#78350F', border: '#F59E0B' },
  info:    { bg: '#1E3A5F', border: '#3B82F6' },
};

export default function Toast() {
  const { toasts, removeToast } = useToast();

  return (
    <div style={styles.container} role="region" aria-label="Notifications" aria-live="polite">
      {toasts.map(toast => {
        const colors = COLORS[toast.type] || COLORS.info;
        const icon = ICONS[toast.type] || ICONS.info;
        return (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              background: colors.bg,
              borderLeft: `4px solid ${colors.border}`,
            }}
            className="anim-up"
          >
            <span style={styles.icon}>{icon}</span>
            <span style={styles.message}>{toast.message}</span>
            <button
              style={styles.close}
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: 24,
    right: 24,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    zIndex: 400,
    maxWidth: 360,
    width: '100%',
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '14px 16px',
    borderRadius: 'var(--r-md)',
    color: '#fff',
    boxShadow: 'var(--shadow-lg)',
    backdropFilter: 'blur(8px)',
  },
  icon: { fontSize: 18, flexShrink: 0 },
  message: { fontSize: 14, flex: 1, lineHeight: 1.4 },
  close: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.7)',
    fontSize: 20,
    cursor: 'pointer',
    padding: '0 4px',
    flexShrink: 0,
    lineHeight: 1,
  },
};
