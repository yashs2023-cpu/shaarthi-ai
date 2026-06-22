import React from 'react';

const MONTHLY = [
  { month: 'Jan', rev: 185000, exp: 120000 },
  { month: 'Feb', rev: 200000, exp: 130000 },
  { month: 'Mar', rev: 220000, exp: 135000 },
  { month: 'Apr', rev: 210000, exp: 140000 },
  { month: 'May', rev: 235000, exp: 145000 },
  { month: 'Jun', rev: 245000, exp: 150000 },
];

const MAX = Math.max(...MONTHLY.map(m => m.rev));

const EXPENSES = [
  { category: 'Raw Material', amount: '₹60,000', pct: 40, color: '#6C63FF' },
  { category: 'Salaries',     amount: '₹45,000', pct: 30, color: '#10B981' },
  { category: 'Rent',         amount: '₹15,000', pct: 10, color: '#F59E0B' },
  { category: 'Utilities',    amount: '₹12,000', pct: 8,  color: '#EF4444' },
  { category: 'Marketing',    amount: '₹10,000', pct: 7,  color: '#0EA5E9' },
  { category: 'Misc',         amount: '₹8,000',  pct: 5,  color: '#FF9933' },
];

export default function BusinessInsights() {
  return (
    <div style={styles.page}>
      <div>
        <h1 style={styles.title}>Business Insights 📊</h1>
        <p style={styles.subtitle}>Data-driven analysis of your business performance</p>
      </div>

      {/* Revenue chart */}
      <div className="saarthi-card">
        <h3 style={styles.cardTitle}>Monthly Revenue vs Expenses</h3>
        <div style={styles.chart}>
          {MONTHLY.map(m => (
            <div key={m.month} style={styles.barGroup}>
              <div style={styles.bars}>
                <div
                  style={{ ...styles.bar, height: `${(m.rev / MAX) * 140}px`, background: 'var(--business-primary)' }}
                  title={`Revenue: ₹${m.rev.toLocaleString()}`}
                />
                <div
                  style={{ ...styles.bar, height: `${(m.exp / MAX) * 140}px`, background: 'var(--gold)' }}
                  title={`Expenses: ₹${m.exp.toLocaleString()}`}
                />
              </div>
              <span style={styles.barLabel}>{m.month}</span>
            </div>
          ))}
        </div>
        <div style={styles.legend}>
          <span style={styles.legendItem}><span style={{ ...styles.legendDot, background: 'var(--business-primary)' }} /> Revenue</span>
          <span style={styles.legendItem}><span style={{ ...styles.legendDot, background: 'var(--gold)' }} /> Expenses</span>
        </div>
      </div>

      {/* Expense breakdown */}
      <div className="saarthi-card">
        <h3 style={styles.cardTitle}>Expense Breakdown</h3>
        <div style={styles.expenseList}>
          {EXPENSES.map(e => (
            <div key={e.category} style={styles.expenseRow}>
              <span style={styles.expCat}>{e.category}</span>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${e.pct}%`, background: e.color }} />
              </div>
              <span style={styles.expPct}>{e.pct}%</span>
              <span style={styles.expAmt}>{e.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Key insights */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F0F4F8, #E2E8F0)' }}>
        <h3 style={styles.cardTitle}>🤖 AI Key Insights</h3>
        <div style={styles.insightList}>
          {[
            { icon: '📈', text: 'Revenue grew 15% this month. Top driver: repeat customer orders.' },
            { icon: '⚠️', text: 'Profit margin down 2% — raw material costs rose 8% vs last month.' },
            { icon: '💡', text: 'Bulk purchase discount opportunity: order 20% more raw material to save ₹12,000.' },
            { icon: '🎯', text: 'Focus on customer retention — acquiring a new customer costs 5x more than retaining one.' },
          ].map((ins, i) => (
            <div key={i} style={styles.insightItem}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{ins.icon}</span>
              <span style={{ fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.5 }}>{ins.text}</span>
            </div>
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
  cardTitle: { fontSize: 16, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 16 },
  chart: {
    display: 'flex', gap: 16, alignItems: 'flex-end',
    height: 180, justifyContent: 'space-around', marginBottom: 12,
  },
  barGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1 },
  bars: { display: 'flex', gap: 3, alignItems: 'flex-end' },
  bar: { width: 16, borderRadius: '4px 4px 0 0', transition: 'height 0.5s ease', minHeight: 4 },
  barLabel: { fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 },
  legend: { display: 'flex', gap: 16, justifyContent: 'center' },
  legendItem: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--gray-600)' },
  legendDot: { width: 10, height: 10, borderRadius: '50%', flexShrink: 0 },
  expenseList: { display: 'flex', flexDirection: 'column', gap: 10 },
  expenseRow: { display: 'flex', alignItems: 'center', gap: 10 },
  expCat: { fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', width: 110, flexShrink: 0 },
  progressBar: { flex: 1, height: 8, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4, transition: 'width 0.5s ease' },
  expPct: { fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', width: 30, textAlign: 'right' },
  expAmt: { fontSize: 12, fontWeight: 700, color: 'var(--navy-deep)', width: 70, textAlign: 'right' },
  insightList: { display: 'flex', flexDirection: 'column', gap: 10 },
  insightItem: {
    display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '10px 12px', background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--r-md)',
  },
};
