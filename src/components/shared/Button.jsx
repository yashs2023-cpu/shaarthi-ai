import React from 'react';

/**
 * Button variants: primary | gold | navy | outline | ghost | danger
 * Sizes: sm | md (default) | lg
 */
export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon,
  style,
  ...props
}) {
  const variantClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variantClass} ${sizeClass}`.trim()}
      style={{
        width: fullWidth ? '100%' : undefined,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {icon && <span style={{ fontSize: '1.1em', lineHeight: 1 }}>{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
