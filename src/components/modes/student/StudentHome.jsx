import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const QUICK = [
  { icon: '🤖', label: 'AI Mentor',    path: '/student/ai',          color: '#6C63FF', bg: '#F5F3FF' },
  { icon: '🚀', label: 'Career Guide', path: '/student/career',       color: '#FF9933', bg: '#FFF8E7' },
  { icon: '📚', label: 'Study Plan',   path: '/student/study',        color: '#10B981', bg: '#ECFDF5' },
  { icon: '🏅', label: 'Scholarships', path: '/student/scholarships', color: '#F59E0B', bg: '#FFFBEB' },
  { icon: '🛡️', label: 'Scam Shield', path: '/scam-shield',          color: '#EF4444', bg: '#FEF2F2' },
];

const STREAK_DATA = [
  { day: 'Mon', done: true  },
  { day: 'Tue', done: true  },
  { day: 'Wed', done: true  },
  { day: 'Thu', done: false },
  { day: 'Fri', done: false },
  { day: 'Sat', done: false },
  { day: 'Sun', done: false },
];

export default function StudentHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Welcome */}
      <div style={styles.banner} className="anim-up">
        <div>
          <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>Let's learn today 📚</p>
          <h1 style={styles.bannerTitle}>
            Hey, <span style={{ color: 'var(--gold-light)' }}>{user?.name || 'Student'}</span>!
          </h1>
          <p style={{ fontSize: 14, opacity: 0.85 }}>
            Your AI mentor is ready — ask anything, anytime.
          </p>
        </div>
        <div style={{ fontSize: 72 }}>🎓</div>
      </div>

      {/* Study streak */}
      <div className="saarthi-card">
        <div style={styles.streakHeader}>
          <div>
            <h3 style={styles.streakTitle}>📅 Study Streak</h3>
            <p style={styles.streakSub}>3 days in a row! Keep it up 🔥</p>
          </div>
          <div style={styles.streakCount}>3🔥</div>
        </div>
        <div style={styles.streakDays}>
          {STREAK_DATA.map(d => (
            <div key={d.day} style={styles.streakDay}>
              <div style={{
                ...styles.streakDot,
                background: d.done ? 'var(--student-primary)' : 'var(--gray-200)',
              }} />
              <span style={{ fontSize: 11, color: 'var(--gray-500)' }}>{d.day}</span>
            </div>
          ))}
        </div>
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

      {/* Today's tips */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)', border: '1.5px solid rgba(108,99,255,0.2)' }}>
        <h3 style={{ ...styles.sectionTitle, marginBottom: 12 }}>💡 Today's Study Tips</h3>
        <div style={styles.tipsList}>
          {[
            '⏱️ Use Pomodoro — 25 min focus, 5 min break',
            '📝 Teach what you learned to remember better',
            '😴 8 hours sleep improves memory retention by 40%',
            '🎯 Set specific goals: not "study math" but "complete chapter 5"',
          ].map(t => (
            <div key={t} style={styles.tip}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  banner: {
    background: 'linear-gradient(135deg, var(--student-primary), var(--student-accent))',
    borderRadius: 'var(--r-2xl)', padding: '28px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    color: '#fff', boxShadow: '0 8px 32px rgba(108,99,255,0.35)',
  },
  bannerTitle: { fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: 6 },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 14 },
  quickGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 12,
  },
  quickBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    padding: '18px 12px', borderRadius: 'var(--r-lg)',
    border: '1.5px solid transparent', cursor: 'pointer', transition: 'var(--t-normal)',
  },
  streakHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  streakTitle: { fontSize: 16, fontWeight: 700, color: 'var(--navy-deep)' },
  streakSub: { fontSize: 13, color: 'var(--gray-500)', marginTop: 2 },
  streakCount: { fontSize: 24, fontWeight: 800, color: 'var(--student-primary)' },
  streakDays: { display: 'flex', gap: 12, justifyContent: 'center' },
  streakDay: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 },
  streakDot: { width: 32, height: 32, borderRadius: '50%' },
  tipsList: { display: 'flex', flexDirection: 'column', gap: 8 },
  tip: { fontSize: 13.5, color: 'var(--gray-700)', lineHeight: 1.5 },
};
