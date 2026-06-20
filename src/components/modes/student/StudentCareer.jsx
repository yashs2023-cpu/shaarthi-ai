import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

const CAREER_PATHS = [
  {
    title: 'Software Development',
    icon: '💻',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Git'],
    companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart', 'TCS'],
    salary: '₹5–40 LPA',
    growth: 'Very High',
    color: '#6C63FF',
  },
  {
    title: 'Data Science & AI',
    icon: '📊',
    skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'Statistics'],
    companies: ['IBM', 'Accenture', 'Razorpay', 'Ola', 'Paytm'],
    salary: '₹6–45 LPA',
    growth: 'Very High',
    color: '#0EA5E9',
  },
  {
    title: 'Civil Services (UPSC)',
    icon: '🏛️',
    skills: ['Current Affairs', 'Essay Writing', 'General Studies', 'Optional Subject'],
    companies: ['IAS', 'IPS', 'IFS', 'State Services'],
    salary: '₹56K–2.5L/month',
    growth: 'High',
    color: '#10B981',
  },
  {
    title: 'Digital Marketing',
    icon: '📱',
    skills: ['SEO', 'Google Ads', 'Content Writing', 'Social Media', 'Analytics'],
    companies: ['WPP', 'Dentsu', 'Startups', 'Freelance'],
    salary: '₹3–20 LPA',
    growth: 'High',
    color: '#F59E0B',
  },
  {
    title: 'Chartered Accountancy',
    icon: '📋',
    skills: ['Taxation', 'Auditing', 'Financial Reporting', 'GST', 'Law'],
    companies: ['Big 4 Firms', 'Banks', 'MNCs', 'Own Practice'],
    salary: '₹6–50 LPA',
    growth: 'High',
    color: '#FF9933',
  },
  {
    title: 'Medicine (MBBS)',
    icon: '🏥',
    skills: ['NEET Preparation', 'Biology', 'Chemistry', 'Clinical Skills'],
    companies: ['Government Hospitals', 'Private Practice', 'Research'],
    salary: '₹50K–5L/month',
    growth: 'Very High',
    color: '#EF4444',
  },
];

export default function StudentCareer() {
  const [interests, setInterests] = useState('');
  const [skills, setSkills] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const { showToast } = useToast();

  const handleFind = () => {
    if (!interests) {
      showToast('Please enter your interests', 'warning');
      return;
    }
    // Simple matching logic
    const lowerInterests = (interests + ' ' + skills).toLowerCase();
    const matched = CAREER_PATHS.find(c =>
      c.title.toLowerCase().includes(lowerInterests) ||
      lowerInterests.includes(c.title.toLowerCase().split(' ')[0])
    ) || CAREER_PATHS[Math.floor(Math.random() * CAREER_PATHS.length)];
    setRecommendation(matched);
    showToast('Career roadmap generated! 🚀', 'success');
  };

  return (
    <div style={styles.page}>
      <div>
        <h1 style={styles.title}>Career Guide 🚀</h1>
        <p style={styles.subtitle}>Find the perfect career path based on your interests and skills</p>
      </div>

      {/* Recommendation engine */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)', border: '1.5px solid rgba(108,99,255,0.15)' }}>
        <h3 style={styles.cardTitle}>🎯 Career Match Engine</h3>
        <div style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Your Interests</label>
            <input
              className="saarthi-input"
              placeholder="e.g., Technology, Finance, Healthcare, Arts"
              value={interests}
              onChange={e => setInterests(e.target.value)}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Current Skills (optional)</label>
            <input
              className="saarthi-input"
              placeholder="e.g., Python, Math, Writing"
              value={skills}
              onChange={e => setSkills(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={handleFind}>
            🔍 Find My Career
          </button>
        </div>

        {recommendation && (
          <div style={{ ...styles.recommendation, borderColor: recommendation.color + '40', background: recommendation.color + '08' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 32 }}>{recommendation.icon}</span>
              <div>
                <div style={{ ...styles.recTitle, color: recommendation.color }}>{recommendation.title}</div>
                <div style={styles.recSalary}>💰 {recommendation.salary}</div>
              </div>
              <span className="badge badge-success" style={{ marginLeft: 'auto' }}>Top Match</span>
            </div>
            <div style={styles.recSection}>
              <span style={styles.recLabel}>Skills to learn:</span>
              <div style={styles.tagRow}>
                {recommendation.skills.map(s => (
                  <span key={s} style={{ ...styles.tag, background: recommendation.color + '15', color: recommendation.color }}>{s}</span>
                ))}
              </div>
            </div>
            <div style={styles.recSection}>
              <span style={styles.recLabel}>Top companies hiring:</span>
              <div style={styles.tagRow}>
                {recommendation.companies.map(c => (
                  <span key={c} style={{ ...styles.tag, background: 'var(--gray-100)', color: 'var(--gray-700)' }}>{c}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* All career paths */}
      <div>
        <h2 style={styles.sectionTitle}>Explore All Career Paths</h2>
        <div style={styles.grid}>
          {CAREER_PATHS.map(c => (
            <div key={c.title} className="saarthi-card" style={{ borderTop: `3px solid ${c.color}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy-deep)' }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: c.color, fontWeight: 600 }}>Growth: {c.growth}</div>
                </div>
              </div>
              <div style={styles.salaryBadge}>💰 {c.salary}</div>
              <div style={styles.tagRow}>
                {c.skills.slice(0, 3).map(s => (
                  <span key={s} style={{ ...styles.tag, background: c.color + '12', color: c.color }}>{s}</span>
                ))}
              </div>
              <button
                className="btn btn-sm"
                style={{ marginTop: 12, background: c.color, color: '#fff', borderRadius: 'var(--r-full)', width: '100%' }}
                onClick={() => showToast(`Opening ${c.title} roadmap… 🗺️`, 'info')}
              >
                View Roadmap
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 14 },
  cardTitle: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 16 },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' },
  recommendation: {
    marginTop: 20, padding: 16, borderRadius: 'var(--r-lg)',
    border: '1.5px solid',
  },
  recTitle: { fontSize: 16, fontWeight: 700 },
  recSalary: { fontSize: 13, color: 'var(--gray-600)', marginTop: 2 },
  recSection: { marginTop: 10 },
  recLabel: { fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase' },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 },
  tag: { padding: '4px 10px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 600 },
  salaryBadge: { fontSize: 13, fontWeight: 700, color: 'var(--gray-700)', marginBottom: 8 },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16,
  },
};
