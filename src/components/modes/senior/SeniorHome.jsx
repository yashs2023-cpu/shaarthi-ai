import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const QUICK_ACTIONS = [
  { icon: '🆘', label: 'Emergency SOS', path: '/senior/sos',      color: '#EF4444', bg: '#FEF2F2', large: true },
  { icon: '🤖', label: 'AI Assistant',  path: '/senior/ai',       color: '#0EA5E9', bg: '#F0F9FF' },
  { icon: '💊', label: 'Medicines',     path: '/senior/health',   color: '#10B981', bg: '#ECFDF5' },
  { icon: '🏛️', label: 'My Benefits',  path: '/senior/benefits', color: '#6C63FF', bg: '#F5F3FF' },
  { icon: '🛡️', label: 'Scam Shield',  path: '/scam-shield',     color: '#F59E0B', bg: '#FFFBEB' },
];

const MEDICINES = [
  { name: 'Blood Pressure Medicine', time: '8:00 AM',  done: true  },
  { name: 'Heart Capsule',           time: '1:00 PM',  done: true  },
  { name: 'Calcium Supplement',      time: '8:00 PM',  done: false },
];

export default function SeniorHome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={styles.page} className="senior-mode">
      {/* Welcome banner */}
      <div style={styles.banner} className="anim-up">
        <div>
          <h1 style={styles.bannerTitle}>
            🙏 Namaste, {user?.name || 'Dada Saathi'}!
          </h1>
          <p style={styles.bannerDesc}>
            Aap safe hain. Main aapke saath hoon, din mein, raat mein.
          </p>
        </div>
        <div style={styles.bannerEmoji}>👴</div>
      </div>

      {/* SOS BUTTON — very prominent */}
      <button
        style={styles.sosBtn}
        onClick={() => navigate('/senior/sos')}
        aria-label="Emergency SOS"
      >
        🆘  Emergency Help
      </button>

      {/* Quick actions grid */}
      <div>
        <h2 style={styles.sectionTitle}>Quick Access</h2>
        <div style={styles.quickGrid}>
          {QUICK_ACTIONS.filter(a => a.label !== 'Emergency SOS').map(a => (
            <button
              key={a.label}
              style={{ ...styles.quickBtn, background: a.bg, borderColor: a.color + '30' }}
              onClick={() => navigate(a.path)}
            >
              <span style={{ fontSize: 36, color: a.color }}>{a.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: a.color }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Medicine reminders today */}
      <div>
        <h2 style={styles.sectionTitle}>Today's Medicines 💊</h2>
        <div style={styles.medicineList}>
          {MEDICINES.map(m => (
            <div key={m.name} style={{ ...styles.medicineItem, opacity: m.done ? 0.6 : 1 }}>
              <div style={{ ...styles.medicineDot, background: m.done ? 'var(--success)' : 'var(--warning)' }} />
              <div style={{ flex: 1 }}>
                <div style={styles.medicineName}>{m.name}</div>
                <div style={styles.medicineTime}>⏰ {m.time}</div>
              </div>
              <span style={{ fontSize: 22 }}>{m.done ? '✅' : '⏳'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety tip */}
      <div style={styles.safetyTip}>
        <span style={{ fontSize: 28 }}>🛡️</span>
        <div>
          <div style={styles.safetyTipTitle}>Daily Safety Reminder</div>
          <div style={styles.safetyTipText}>
            कोई भी बैंक, सरकारी अधिकारी या पुलिस कभी OTP, पासवर्ड या ATM PIN नहीं मांगती।
            अगर कोई मांगे — तुरंत फोन काटें! 📵
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 28 },
  banner: {
    background: 'linear-gradient(135deg, #0EA5E9, #0369A1)',
    borderRadius: 'var(--r-2xl)', padding: '28px 32px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    color: '#fff', boxShadow: '0 8px 32px rgba(14,165,233,0.3)',
  },
  bannerTitle: { fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', fontWeight: 800, color: '#fff', marginBottom: 8 },
  bannerDesc: { fontSize: 16, opacity: 0.9, lineHeight: 1.6 },
  bannerEmoji: { fontSize: 80 },

  sosBtn: {
    width: '100%',
    padding: '22px',
    background: 'linear-gradient(135deg, #EF4444, #B91C1C)',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--r-xl)',
    fontSize: 22,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 8px 32px rgba(239,68,68,0.4)',
    letterSpacing: '0.02em',
    transition: 'var(--t-normal)',
  },

  sectionTitle: { fontSize: 20, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 16 },

  quickGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14,
  },
  quickBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
    padding: '22px 16px', borderRadius: 'var(--r-xl)',
    border: '2px solid transparent', cursor: 'pointer', transition: 'var(--t-normal)',
  },

  medicineList: { display: 'flex', flexDirection: 'column', gap: 12 },
  medicineItem: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: '#fff', padding: '16px 20px',
    borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-100)',
  },
  medicineDot: {
    width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
  },
  medicineName: { fontSize: 16, fontWeight: 600, color: 'var(--navy-deep)' },
  medicineTime: { fontSize: 14, color: 'var(--gray-500)', marginTop: 3 },

  safetyTip: {
    background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
    border: '2px solid rgba(245,158,11,0.25)',
    borderRadius: 'var(--r-xl)', padding: '20px 24px',
    display: 'flex', gap: 16, alignItems: 'flex-start',
  },
  safetyTipTitle: { fontSize: 16, fontWeight: 700, color: '#92400E', marginBottom: 6 },
  safetyTipText: { fontSize: 14, color: '#78350F', lineHeight: 1.7 },
};
