import React from 'react';
import { useToast } from '../../../hooks/useToast';

const BENEFITS = [
  {
    icon: '🏛️', name: 'Indira Gandhi National Old Age Pension',
    amount: '₹500–1000/month', eligibility: '60+ years, BPL family',
    howTo: 'Apply at nearest gram panchayat or ward office',
  },
  {
    icon: '🏥', name: 'Ayushman Bharat Health Scheme',
    amount: '₹5 Lakh free treatment', eligibility: 'All BPL/APL families',
    howTo: 'Get PMJAY card from nearest ASHA worker',
  },
  {
    icon: '🚌', name: 'Free Bus Travel for Seniors',
    amount: '50% concession / Free', eligibility: '60+ years, senior ID card',
    howTo: 'Apply for senior citizen ID at municipal office',
  },
  {
    icon: '📱', name: 'Free Mobile for Seniors (State schemes)',
    amount: 'Free smartphone', eligibility: '60+ years, below poverty line',
    howTo: 'Contact district social welfare officer',
  },
  {
    icon: '💰', name: 'Senior Citizen Savings Scheme (SCSS)',
    amount: '8.2% interest rate', eligibility: '60+ years with savings',
    howTo: 'Open account at Post Office or authorized bank',
  },
];

export default function SeniorBenefits() {
  const { showToast } = useToast();
  return (
    <div style={styles.page} className="senior-mode">
      <div>
        <h1 style={styles.title}>Aapke Benefits 🏛️</h1>
        <p style={styles.subtitle}>
          Yeh sari suvidhaayein sirf aapke liye hain — inhe zaroor lein
        </p>
      </div>

      <div style={styles.benefitsList}>
        {BENEFITS.map(b => (
          <div key={b.name} className="saarthi-card" style={styles.benefitCard}>
            <div style={styles.benefitHeader}>
              <span style={styles.benefitIcon}>{b.icon}</span>
              <div>
                <div style={styles.benefitName}>{b.name}</div>
                <div style={styles.benefitAmount}>{b.amount}</div>
              </div>
            </div>
            <div style={styles.benefitInfo}>
              <div><strong style={styles.infoLabel}>✓ Eligible:</strong> {b.eligibility}</div>
              <div><strong style={styles.infoLabel}>📋 Kaise Apply:</strong> {b.howTo}</div>
            </div>
            <button
              className="btn btn-primary"
              style={{ width: '100%', fontSize: 16, padding: 14, marginTop: 4 }}
              onClick={() => showToast(`${b.name} ke liye apply ho raha hai… 📋`, 'info')}
            >
              Apply Karen
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  title: { fontSize: 26, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.6 },
  benefitsList: { display: 'flex', flexDirection: 'column', gap: 14 },
  benefitCard: {},
  benefitHeader: { display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 },
  benefitIcon: { fontSize: 34, flexShrink: 0 },
  benefitName: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', lineHeight: 1.3 },
  benefitAmount: { fontSize: 15, fontWeight: 700, color: 'var(--senior-primary)', marginTop: 3 },
  benefitInfo: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14, fontSize: 14, color: 'var(--gray-700)', lineHeight: 1.6 },
  infoLabel: { color: 'var(--gray-500)', marginRight: 4 },
};
