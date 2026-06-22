import React from 'react';
import { useToast } from '../../../hooks/useToast';

const GST_SLABS = [
  { rate: '0%',   items: 'Essential food items, fresh vegetables, milk, eggs', color: '#10B981' },
  { rate: '5%',   items: 'Packaged food, tea, coffee, cooking oil, sugar',     color: '#0EA5E9' },
  { rate: '12%',  items: 'Processed food, computers, medicines, mobile phones', color: '#6C63FF' },
  { rate: '18%',  items: 'Soaps, shampoos, electronics, AC, refrigerators',    color: '#F59E0B' },
  { rate: '28%',  items: 'Luxury items, cigarettes, cars, aerated beverages',  color: '#EF4444' },
];

const DEADLINES = [
  { form: 'GSTR-1',  deadline: '11th of next month', desc: 'Outward supply details' },
  { form: 'GSTR-3B', deadline: '20th of next month', desc: 'Monthly summary return' },
  { form: 'GSTR-9',  deadline: '31st December',      desc: 'Annual return' },
];

export default function BusinessGST() {
  const { showToast } = useToast();

  return (
    <div style={styles.page}>
      <div>
        <h1 style={styles.title}>GST Guide 🏛️</h1>
        <p style={styles.subtitle}>Everything you need to know about GST compliance made simple</p>
      </div>

      {/* GST Calculator */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F0F4F8, #E2E8F0)' }}>
        <h3 style={styles.cardTitle}>🧮 GST Calculator</h3>
        <div style={styles.calcForm}>
          <div style={styles.field}>
            <label style={styles.label}>Invoice Amount (₹)</label>
            <input className="saarthi-input" type="number" placeholder="Enter base amount" />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>GST Rate</label>
            <select className="saarthi-input">
              {['5%', '12%', '18%', '28%'].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <button
            className="btn btn-navy"
            style={{ alignSelf: 'flex-end', borderRadius: 'var(--r-full)' }}
            onClick={() => showToast('GST calculated! CGST 9% + SGST 9% = 18% total 📊', 'info')}
          >
            Calculate →
          </button>
        </div>
      </div>

      {/* GST Slabs */}
      <div className="saarthi-card">
        <h3 style={styles.cardTitle}>GST Rate Slabs</h3>
        <div style={styles.slabList}>
          {GST_SLABS.map(s => (
            <div key={s.rate} style={{ ...styles.slabItem, borderLeft: `4px solid ${s.color}` }}>
              <div style={{ ...styles.slabRate, color: s.color }}>{s.rate}</div>
              <div style={styles.slabItems}>{s.items}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filing deadlines */}
      <div className="saarthi-card">
        <h3 style={styles.cardTitle}>📅 Filing Deadlines</h3>
        <div style={styles.deadlineList}>
          {DEADLINES.map(d => (
            <div key={d.form} style={styles.deadlineItem}>
              <div style={styles.formBadge}>{d.form}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.deadlineDesc}>{d.desc}</div>
              </div>
              <div style={styles.deadlineDue}>📅 {d.deadline}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F0F9FF, #E0F2FE)' }}>
        <h3 style={styles.cardTitle}>💡 GST Compliance Tips</h3>
        <div style={styles.tipList}>
          {[
            '📱 Maintain digital records of all invoices (7-year requirement)',
            '🔄 Reconcile GSTR-2A with purchase register monthly',
            '⏰ Late filing attracts ₹50/day penalty (₹20 for NIL returns)',
            '✅ Input Tax Credit: Match with supplier filings before claiming',
            '🏦 Keep separate bank account for GST collections',
          ].map(t => (
            <div key={t} style={styles.tip}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 20 },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
  cardTitle: { fontSize: 16, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 14 },
  calcForm: { display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' },
  field: { display: 'flex', flexDirection: 'column', gap: 5, flex: 1, minWidth: 150 },
  label: { fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' },
  slabList: { display: 'flex', flexDirection: 'column', gap: 8 },
  slabItem: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '10px 14px', background: 'var(--gray-50)', borderRadius: 'var(--r-md)',
  },
  slabRate: { fontSize: 20, fontWeight: 800, width: 48, flexShrink: 0 },
  slabItems: { fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.5 },
  deadlineList: { display: 'flex', flexDirection: 'column', gap: 10 },
  deadlineItem: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 14px', background: 'var(--gray-50)', borderRadius: 'var(--r-md)',
    flexWrap: 'wrap',
  },
  formBadge: {
    background: 'var(--navy)', color: '#fff',
    padding: '4px 12px', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 700, flexShrink: 0,
  },
  deadlineDesc: { fontSize: 13, color: 'var(--gray-600)' },
  deadlineDue: { fontSize: 12, fontWeight: 700, color: 'var(--warning)', marginLeft: 'auto' },
  tipList: { display: 'flex', flexDirection: 'column', gap: 8 },
  tip: { fontSize: 13.5, color: 'var(--gray-700)', lineHeight: 1.5 },
};
