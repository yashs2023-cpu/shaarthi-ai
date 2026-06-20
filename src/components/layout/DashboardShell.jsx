import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useMode } from '../../contexts/ModeContext';
import VoiceButton from '../shared/VoiceButton';

export default function DashboardShell({ persona, navItems, children }) {
  const { user, logout } = useAuth();
  const { clearPersona } = useMode();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    clearPersona();
    logout();
    navigate('/');
  };

  const handleSwitchPersona = () => {
    clearPersona();
    navigate('/choose');
  };

  const accentColor = persona?.color || '#FF9933';

  return (
    <div style={styles.shell}>
      {/* ── Mobile overlay ── */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={styles.overlay} />
      )}

      {/* ── Sidebar ── */}
      <aside style={{
        ...styles.sidebar,
        background: `linear-gradient(180deg, ${persona?.colorDark || '#0F172A'} 0%, #0F172A 100%)`,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }}>
        {/* Logo */}
        <div style={styles.logoArea}>
          <div style={{ ...styles.personaAvatar, background: accentColor + '22', color: accentColor }}>
            {persona?.avatar || '🤖'}
          </div>
          <div>
            <div style={styles.appName}>Saarthi AI</div>
            <div style={{ ...styles.personaLabel, color: accentColor }}>
              {persona?.name || 'Dashboard'}
            </div>
          </div>
        </div>

        {/* User chip */}
        <div style={styles.userChip}>
          <div style={styles.userAvatar}>
            {(user?.name || 'U')[0].toUpperCase()}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={styles.userName}>{user?.name || 'User'}</div>
            <div style={styles.userEmail}>{user?.email}</div>
          </div>
        </div>

        {/* Nav items */}
        <nav style={styles.nav} aria-label="Dashboard navigation">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/' + (persona?.key || '')}
              style={({ isActive }) => ({
                ...styles.navItem,
                background: isActive ? accentColor + '22' : 'transparent',
                color: isActive ? accentColor : 'rgba(255,255,255,0.6)',
                borderLeft: isActive ? `3px solid ${accentColor}` : '3px solid transparent',
              })}
              onClick={() => setSidebarOpen(false)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom buttons */}
        <div style={styles.sidebarBottom}>
          <button style={styles.switchBtn} onClick={handleSwitchPersona}>
            🔄 Switch Persona
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <main style={styles.main}>
        {/* Mobile top bar */}
        <div style={styles.mobileBar}>
          <button style={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
            ☰
          </button>
          <span style={{ fontWeight: 700, color: '#1B365D', fontSize: 16 }}>
            {persona?.name || 'Saarthi'}
          </span>
          <VoiceButton size={36} persona={persona?.key} />
        </div>

        {/* Content */}
        <div style={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

const styles = {
  shell: {
    display: 'flex',
    minHeight: '100vh',
    background: '#F9FAFB',
    position: 'relative',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 99,
  },
  sidebar: {
    width: 260,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    height: '100vh',
    overflowY: 'auto',
    zIndex: 100,
    transition: 'transform 0.3s ease',
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '24px 20px 20px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  personaAvatar: {
    width: 44, height: 44, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 22, flexShrink: 0,
  },
  appName: {
    fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.2,
  },
  personaLabel: {
    fontSize: 11, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 2,
  },
  userChip: {
    display: 'flex', alignItems: 'center', gap: 10,
    margin: '12px 16px',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.08)',
  },
  userAvatar: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'rgba(255,153,51,0.25)', color: '#FF9933',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, fontWeight: 700, flexShrink: 0,
  },
  userName: {
    fontSize: 13, fontWeight: 600, color: '#fff',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  userEmail: {
    fontSize: 11, color: 'rgba(255,255,255,0.45)',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  nav: {
    flex: 1,
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    overflowY: 'auto',
  },
  navItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '10px 12px', borderRadius: 10,
    fontSize: 13.5, fontWeight: 500,
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  navIcon: { fontSize: 16, width: 20, textAlign: 'center', flexShrink: 0 },
  sidebarBottom: {
    padding: '12px 16px 20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', flexDirection: 'column', gap: 8,
  },
  switchBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.8)',
    padding: '10px 14px', borderRadius: 10,
    fontSize: 13, fontWeight: 600, cursor: 'pointer',
    textAlign: 'left', transition: 'all 0.2s',
  },
  logoutBtn: {
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.25)',
    color: '#FCA5A5',
    padding: '10px 14px', borderRadius: 10,
    fontSize: 13, fontWeight: 600, cursor: 'pointer',
    textAlign: 'left', transition: 'all 0.2s',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  mobileBar: {
    display: 'none',        // shown via @media in CSS
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    background: '#fff',
    borderBottom: '1px solid #E5E7EB',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },
  menuBtn: {
    background: 'none', border: 'none',
    fontSize: 22, cursor: 'pointer', color: '#374151', padding: 4,
  },
  content: {
    padding: '28px 32px',
    flex: 1,
  },
};
