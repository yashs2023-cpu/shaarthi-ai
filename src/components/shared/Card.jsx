import React from 'react';

export function Card({ title, subtitle, icon, children, glass = false, hover = true, style, className = '', ...props }) {
  return (
    <div
      className={`${glass ? 'saarthi-card-glass' : 'saarthi-card'} ${hover ? '' : 'no-hover'} ${className}`}
      style={style}
      {...props}
    >
      {(title || icon || subtitle) && (
        <div style={styles.header}>
          {icon && <span style={styles.headerIcon}>{icon}</span>}
          <div>
            {title && <h3 style={styles.title}>{title}</h3>}
            {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  headerIcon: {
    fontSize: 24,
    flexShrink: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: 'var(--navy-deep)',
    margin: 0,
  },
  subtitle: {
    fontSize: 13,
    color: 'var(--gray-500)',
    margin: '2px 0 0 0',
  },
};

export default Card;
