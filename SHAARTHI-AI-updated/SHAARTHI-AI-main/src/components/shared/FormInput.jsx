import React from 'react';

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  hint,
  required = false,
  icon,
  style,
  ...props
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label style={styles.label}>
          {label}
          {required && <span style={styles.required}> *</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={styles.iconWrapper}>{icon}</span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className="saarthi-input"
          style={{
            paddingLeft: icon ? 40 : undefined,
            borderColor: error ? 'var(--danger)' : undefined,
          }}
          {...props}
        />
      </div>
      {error && <span style={styles.error}>{error}</span>}
      {hint && !error && <span style={styles.hint}>{hint}</span>}
    </div>
  );
}

const styles = {
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--gray-700)',
    userSelect: 'none',
  },
  required: {
    color: 'var(--danger)',
  },
  iconWrapper: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: 16,
    color: 'var(--gray-400)',
    pointerEvents: 'none',
  },
  error: {
    fontSize: 12,
    color: 'var(--danger)',
  },
  hint: {
    fontSize: 12,
    color: 'var(--gray-400)',
  },
};

export default FormInput;
