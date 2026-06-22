import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

const CONTACTS = [
  { id: 1, name: 'Dr. Rajesh Sharma',   phone: '9876543210', type: 'Doctor',    emoji: '🏥', color: '#EF4444' },
  { id: 2, name: 'City Hospital',        phone: '108',        type: 'Emergency', emoji: '🚑', color: '#EF4444' },
  { id: 3, name: 'Ajay (Son)',           phone: '9876543212', type: 'Family',    emoji: '👨', color: '#0EA5E9' },
  { id: 4, name: 'Meera (Daughter)',     phone: '9876543213', type: 'Family',    emoji: '👩', color: '#0EA5E9' },
  { id: 5, name: 'Police',              phone: '100',        type: 'Emergency', emoji: '👮', color: '#6C63FF' },
  { id: 6, name: 'Fire Station',        phone: '101',        type: 'Emergency', emoji: '🚒', color: '#F59E0B' },
];

export default function SeniorSOS() {
  const { showToast } = useToast();
  const [called, setCalled] = useState(null);

  const handleCall = (contact) => {
    setCalled(contact.id);
    showToast(`📞 Calling ${contact.name} (${contact.phone})…`, 'info');
    setTimeout(() => setCalled(null), 3000);
  };

  return (
    <div style={styles.page} className="senior-mode">
      <div style={styles.header}>
        <h1 style={styles.title}>🆘 Emergency SOS</h1>
        <p style={styles.subtitle}>
          Ek button dabaiye — turant help aa jayegi
        </p>
      </div>

      <div style={styles.alert}>
        ⚠️ Agar aap danger mein hain to <strong>POLICE</strong> number dabaiye ya kisi ko call karein.
        Apna pata batana mat bhoolein.
      </div>

      <div style={styles.contactsGrid}>
        {CONTACTS.map(c => (
          <button
            key={c.id}
            style={{
              ...styles.contactBtn,
              background: c.color,
              transform: called === c.id ? 'scale(0.96)' : 'scale(1)',
              opacity: called === c.id ? 0.85 : 1,
            }}
            onClick={() => handleCall(c)}
            aria-label={`Call ${c.name}`}
          >
            <span style={styles.contactEmoji}>{c.emoji}</span>
            <span style={styles.contactName}>{c.name}</span>
            <span style={styles.contactPhone}>{c.phone}</span>
            <span style={styles.contactType}>{c.type}</span>
          </button>
        ))}
      </div>

      <div className="saarthi-card">
        <h3 style={styles.addTitle}>➕ Add New Emergency Contact</h3>
        <div style={styles.form}>
          <div style={styles.twoCol}>
            <div style={styles.field}>
              <label style={styles.label}>Name</label>
              <input className="saarthi-input" style={{ fontSize: 16 }} placeholder="Contact name" />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Phone Number</label>
              <input className="saarthi-input" type="tel" style={{ fontSize: 16 }} placeholder="Mobile number" />
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: '100%', fontSize: 16, padding: '14px' }}
            onClick={() => showToast('Contact added successfully! 📞', 'success')}
          >
            Save Contact
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  header: { textAlign: 'center' },
  title: { fontSize: 28, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 6 },
  subtitle: { fontSize: 16, color: 'var(--gray-500)' },
  alert: {
    background: '#FEF2F2', border: '2px solid rgba(239,68,68,0.3)',
    borderRadius: 'var(--r-xl)', padding: '16px 20px',
    fontSize: 15, color: '#7F1D1D', lineHeight: 1.6,
  },
  contactsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 14,
  },
  contactBtn: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    padding: '24px 16px', borderRadius: 'var(--r-2xl)',
    border: 'none', cursor: 'pointer', color: '#fff',
    transition: 'var(--t-normal)',
    boxShadow: 'var(--shadow-md)',
  },
  contactEmoji: { fontSize: 36 },
  contactName: { fontSize: 18, fontWeight: 700, textAlign: 'center', lineHeight: 1.2 },
  contactPhone: { fontSize: 16, opacity: 0.9 },
  contactType: { fontSize: 12, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em' },
  addTitle: { fontSize: 18, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 14 },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 6 },
  label: { fontSize: 15, fontWeight: 600, color: 'var(--gray-700)' },
};
