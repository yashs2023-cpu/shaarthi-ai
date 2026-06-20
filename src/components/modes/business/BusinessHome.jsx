import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const STATS = [
  { label: 'Revenue (Month)',    value: '₹2,45,000', change: '+15%',  up: true,  icon: '💰' },
  { label: 'Profit Margin',      value: '32%',        change: '-2%',   up: false, icon: '📈' },
  { label: 'Active Customers',   value: '48',         change: '+6',    up: true,  icon: '👥' },
  { label: 'YoY Growth',         value: '23%',        change: '+5%',   up: true,  icon: '🚀' },
];

const QUICK = [
  { icon: '🤖', label: 'AI Advisor',   path: '/business/ai',        color: '#1B365D', bg: '#F0F4F8' },
  { icon: '📊', label: 'Insights',     path: '/business/insights',  color: '#10B981', bg: '#ECFDF5' },
  { icon: '👥', label: 'Customers',    path: '/business/customers', color: '#6C63FF', bg: '#F5F3FF' },
  { icon: '🏛️', label: 'GST Guide',   path: '/business/gst',       color: '#F59E0B', bg: '#FFFBEB' },
  { icon: '🛡️', label: 'Scam Shield', path: '/scam-shield',        color: '#EF4444', bg: '#FEF2F2' },
];

export default function BusinessHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Banner */}
      <div style={styles.banner} className="anim-up">
        <div>
          <p style={{ fontSize: 13, opacity: 0.7, marginBottom: 4 }}>Business Dashboard</p>
          <h1 style={styles.bannerTitle}>
            Namaste, <span style={{ color: 'var(--gold-light)' }}>{user?.name || 'Entrepreneur'}</span>!
          </h1>
          <p style={{ fontSize: 14, opacity: 0.75 }}>
            Let's grow your business with AI-powered insights
          </p>
        </div>
        <div style={{ fontSize: 72 }}>💼</div>
      </div>

      {/* Stats */}
      <div style={styles.statsGrid}>
        {STATS.map(s => (
          <div key={s.label} className="saarthi-card" style={styles.statCard}>
            <div style={styles.statIcon}>{s.icon}</div>
            <div style={styles.statLabel}>{s.label}</div>
            <div style={styles.statValue}>{s.value}</div>
            <div style={{ ...styles.statChange, color: s.up ? 'var(--success)' : 'var(--danger)' }}>
              {s.up ? '▲' : '▼'} {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 style={styles.sectionTitle}>Quick Access</h2>
        <div style={styles.quickGrid}>
          {QUICK.map(a => (
            <button
              key={a.label}
              style={{ ...styles.quickBtn, background: a.bg, borderColor: a.color + '30' }}
              onClick={() => navigate(a.path)}
            >
              <span style={{ fontSize: 28, color: a.color }}>{a.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: a.color }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* AI Tip */}
      <div style={styles.aiTip}>
        <div style={styles.aiTipIcon}>💡</div>
        <div>
          <div style={styles.aiTipTitle}>AI Business Tip of the Day</div>
          <div style={styles.aiTipText}>
            Your profit margin dipped 2% this month. Consider reviewing your raw material costs
            — bulk purchasing from a single vendor may reduce expenses by 8-12%. Talk to your AI Advisor for a detailed analysis.
          </div>
        </div>
        <button
          className="btn btn-sm"
          style={{ background: 'var(--business-primary)', color: '#fff', borderRadius: 'var(--r-full)', flexShrink: 0 }}
          onClick={() => navigate('/business/ai')}
        >
          Ask AI →
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  banner: {
    background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%)',
    borderRadius: 'var(--r-2xl)', padding: '28px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    color: '#fff', boxShadow: 'var(--shadow-xl)',
  },
  bannerTitle: { fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: 6 },
  statsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16,
  },
  statCard: { textAlign: 'center' },
  statIcon: { fontSize: 28, marginBottom: 8 },
  statLabel: { fontSize: 12, color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' },
  statValue: { fontSize: 28, fontWeight: 800, color: 'var(--navy-deep)', margin: '6px 0' },
  statChange: { fontSize: 13, fontWeight: 700 },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 14 },
  quickGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12,
  },
  quickBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    padding: '18px 12px', borderRadius: 'var(--r-lg)',
    border: '1.5px solid transparent', cursor: 'pointer', transition: 'var(--t-normal)',
  },
  aiTip: {
    background: 'linear-gradient(135deg, #F0F4F8, #E2E8F0)',
    border: '1.5px solid rgba(27,54,93,0.15)',
    borderRadius: 'var(--r-xl)', padding: '20px 24px',
    display: 'flex', gap: 14, alignItems: 'flex-start',
  },
  aiTipIcon: { fontSize: 28, flexShrink: 0 },
  aiTipTitle: { fontSize: 14, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 6 },
  aiTipText: { fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.6, flex: 1 },
};
