import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

const MEDICINES = [
  { id: 1, name: 'Blood Pressure Medicine', dosage: '1 tablet', time: '8:00 AM', taken: true,  reason: 'Hypertension' },
  { id: 2, name: 'Heart Capsule',           dosage: '1 capsule', time: '1:00 PM', taken: true,  reason: 'Heart health' },
  { id: 3, name: 'Calcium Supplement',      dosage: '1 tablet', time: '8:00 PM', taken: false, reason: 'Bone strength' },
  { id: 4, name: 'Vitamin D Tablet',        dosage: '1 tablet', time: 'Sunday', taken: false, reason: 'Immunity' },
];

export default function SeniorHealth() {
  const [medicines, setMedicines] = useState(MEDICINES);
  const { showToast } = useToast();

  const markTaken = (id) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, taken: true } : m));
    showToast('Medicine marked as taken! ✅', 'success');
  };

  const pending = medicines.filter(m => !m.taken);
  const done = medicines.filter(m => m.taken);

  return (
    <div style={styles.page} className="senior-mode">
      <div>
        <h1 style={styles.title}>Health & Medicines 💊</h1>
        <p style={styles.subtitle}>Apni dawaiyan yaad rakhein — sehat sab se badi daulat hai</p>
      </div>

      {pending.length > 0 && (
        <div style={styles.pendingBanner}>
          ⏰ {pending.length} medicine{pending.length > 1 ? 's' : ''} leni baaki hai aaj
        </div>
      )}

      <div>
        <h2 style={styles.sectionTitle}>Aaj ki Dawaiyan</h2>
        <div style={styles.medicineList}>
          {medicines.map(m => (
            <div key={m.id} style={{ ...styles.medicineCard, opacity: m.taken ? 0.7 : 1 }}>
              <div style={{ ...styles.medStatus, background: m.taken ? '#ECFDF5' : '#FFFBEB', border: `2px solid ${m.taken ? '#10B981' : '#F59E0B'}` }}>
                <span style={{ fontSize: 24 }}>{m.taken ? '✅' : '⏳'}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={styles.medName}>{m.name}</div>
                <div style={styles.medDetails}>
                  💊 {m.dosage} · ⏰ {m.time} · {m.reason}
                </div>
              </div>
              {!m.taken && (
                <button
                  style={styles.takenBtn}
                  onClick={() => markTaken(m.id)}
                >
                  ✓ Li
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Health tips */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F0F9FF, #BAE6FD)', border: '1.5px solid rgba(14,165,233,0.2)' }}>
        <h3 style={styles.sectionTitle}>💡 Sehat Tips</h3>
        <div style={styles.tipList}>
          {[
            '💧 Roz 8 gilaas paani piyein',
            '🚶 Roz 20-30 minute walking karein',
            '🛌 Raat ko 7-8 ghante zaroor soyein',
            '🥗 Hara saag aur phal khayein',
            '🧘 Subah 10 minute meditation karein',
          ].map(t => (
            <div key={t} style={styles.tip}>{t}</div>
          ))}
        </div>
      </div>

      {/* Add reminder */}
      <div className="saarthi-card">
        <h3 style={styles.sectionTitle}>➕ Nayi Dawai Add Karein</h3>
        <div style={styles.form}>
          {[
            ['Dawai ka naam', 'e.g., Metformin 500mg'],
            ['Dose', 'e.g., 1 tablet'],
            ['Time', 'e.g., 9:00 AM'],
          ].map(([label, ph]) => (
            <div key={label}>
              <label style={styles.label}>{label}</label>
              <input className="saarthi-input" style={{ fontSize: 16 }} placeholder={ph} />
            </div>
          ))}
          <button
            className="btn btn-primary"
            style={{ width: '100%', fontSize: 16, padding: 14 }}
            onClick={() => showToast('Medicine reminder set! 🔔', 'success')}
          >
            🔔 Reminder Set Karein
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  title: { fontSize: 26, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 15, color: 'var(--gray-500)' },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 14 },
  pendingBanner: {
    background: '#FFFBEB', border: '2px solid rgba(245,158,11,0.3)',
    borderRadius: 'var(--r-xl)', padding: '14px 20px',
    fontSize: 16, fontWeight: 700, color: '#92400E',
  },
  medicineList: { display: 'flex', flexDirection: 'column', gap: 12 },
  medicineCard: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: '#fff', padding: '16px 20px',
    borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--gray-100)',
    transition: 'var(--t-normal)',
  },
  medStatus: {
    width: 56, height: 56, borderRadius: 14,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  medName: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 4 },
  medDetails: { fontSize: 14, color: 'var(--gray-500)' },
  takenBtn: {
    background: 'linear-gradient(135deg, var(--success), #059669)',
    color: '#fff', border: 'none', borderRadius: 'var(--r-full)',
    padding: '10px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
    flexShrink: 0,
  },
  tipList: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 },
  tip: { fontSize: 15, color: 'var(--gray-700)' },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  label: { display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--gray-700)', marginBottom: 5 },
};
