import React from 'react';

export function ModeCard({ mode, isSelected, onClick, isLocked }) {
  const { key, label, color } = mode;

  return (
    <div
      style={{
        ...styles.card,
        background: isSelected ? color : '#f8f8f8',
        borderColor: isSelected ? color : '#ddd',
      }}
      onClick={onClick}
    >
      <div style={styles.header}>
        <h3 style={{ ...styles.title, color: isSelected ? '#fff' : color }}>{label}</h3>
        {isLocked && <span style={styles.lock}>🔒</span>}
      </div>
      <p style={{ ...styles.description, color: isSelected ? '#fff' : '#666' }}>
        Tap to select
      </p>
    </div>
  );
}

const styles = {
  card: {
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
  },
  lock: {
    fontSize: '16px',
  },
  description: {
    fontSize: '13px',
    margin: 0,
  },
};
