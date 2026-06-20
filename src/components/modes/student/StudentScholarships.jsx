import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

const SCHOLARSHIPS = [
  {
    id: 1, name: 'National Merit Scholarship', amount: '₹1,00,000/year',
    eligibility: '90%+ in 10th standard', deadline: '2025-07-15',
    type: 'merit', category: 'Government',
    description: 'For top-performing students across India based on academic merit.',
    steps: ['Register at scholarships.gov.in', 'Upload mark sheets', 'Submit income certificate', 'Wait for verification'],
  },
  {
    id: 2, name: 'PM Scholarship for SC/ST', amount: '₹20,000/year',
    eligibility: 'SC/ST students, 60%+ marks', deadline: 'Ongoing',
    type: 'government', category: 'Government',
    description: 'Central government scholarship for SC/ST students in professional courses.',
    steps: ['Visit NSP portal', 'Select state & scheme', 'Fill application form', 'Upload documents'],
  },
  {
    id: 3, name: 'State Scholarship for Girls', amount: '₹50,000/year',
    eligibility: 'Girl students, 75%+ marks', deadline: '2025-07-30',
    type: 'government', category: 'State',
    description: 'Empowering girl students by providing financial support for higher education.',
    steps: ['Contact state education dept', 'Submit income proof', 'Attach bonafide certificate', 'Academic record verification'],
  },
  {
    id: 4, name: 'Tata Trust Scholarship', amount: '₹2,00,000/year',
    eligibility: 'Annual income < ₹3L, merit based', deadline: '2025-08-31',
    type: 'private', category: 'Private',
    description: 'Comprehensive scholarship from Tata Trusts for deserving students in need.',
    steps: ['Apply at tatatrusts.org', 'Personal interview', 'Document verification', 'Award announcement'],
  },
];

const INTERNSHIPS = [
  {
    company: 'Google', role: 'Software Engineering Intern',
    stipend: '₹50,000/month', duration: '3 months', deadline: '2025-07-20',
    logo: '🟢', skills: ['Python', 'Algorithms', 'Problem Solving'],
  },
  {
    company: 'Microsoft', role: 'Data Analytics Intern',
    stipend: '₹40,000/month', duration: '6 weeks', deadline: '2025-07-25',
    logo: '🔵', skills: ['Excel', 'SQL', 'Power BI'],
  },
  {
    company: 'ISRO', role: 'Research Intern',
    stipend: '₹15,000/month', duration: '2 months', deadline: '2025-08-05',
    logo: '🚀', skills: ['Physics', 'Mathematics', 'Research'],
  },
];

export default function StudentScholarships() {
  const [tab, setTab] = useState('scholarships');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
  const { showToast } = useToast();

  const filtered = filter === 'all'
    ? SCHOLARSHIPS
    : SCHOLARSHIPS.filter(s => s.type === filter);

  return (
    <div style={styles.page}>
      <div>
        <h1 style={styles.title}>Scholarships & Internships 🏅</h1>
        <p style={styles.subtitle}>Discover funding and real-world experience opportunities</p>
      </div>

      <div style={styles.tabRow}>
        {[['scholarships', '🏅 Scholarships'], ['internships', '💼 Internships']].map(([key, label]) => (
          <button
            key={key}
            style={{
              ...styles.tab,
              background: tab === key ? 'var(--student-primary)' : '#fff',
              color: tab === key ? '#fff' : 'var(--gray-600)',
              borderColor: tab === key ? 'var(--student-primary)' : 'var(--gray-200)',
            }}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'scholarships' && (
        <>
          <div style={styles.filterRow}>
            {[['all', 'All'], ['government', 'Government'], ['private', 'Private'], ['merit', 'Merit']].map(([key, label]) => (
              <button
                key={key}
                style={{
                  ...styles.filterBtn,
                  background: filter === key ? 'var(--student-primary)' : '#fff',
                  color: filter === key ? '#fff' : 'var(--gray-600)',
                  borderColor: filter === key ? 'var(--student-primary)' : 'var(--gray-200)',
                }}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={styles.list}>
            {filtered.map(s => (
              <div key={s.id} className="saarthi-card">
                <div style={styles.schHeader} onClick={() => setExpanded(expanded === s.id ? null : s.id)}>
                  <div>
                    <h3 style={styles.schName}>{s.name}</h3>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                      <span className="badge badge-success">{s.amount}</span>
                      <span className="badge badge-info">{s.category}</span>
                      <span className="badge badge-warning">📅 {s.deadline}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: 'var(--gray-400)' }}>
                    {expanded === s.id ? '▲' : '▼'}
                  </span>
                </div>

                {expanded === s.id && (
                  <div style={styles.schDetails} className="anim-up">
                    <p style={styles.schDesc}>{s.description}</p>
                    <div style={styles.eligBox}>
                      <strong>Eligibility:</strong> {s.eligibility}
                    </div>
                    <h4 style={styles.stepsTitle}>How to Apply:</h4>
                    <ol style={styles.stepsList}>
                      {s.steps.map((step, i) => (
                        <li key={i} style={styles.step}>
                          <span style={styles.stepNum}>{i + 1}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                    <button
                      className="btn btn-sm"
                      style={{ background: 'var(--student-primary)', color: '#fff', borderRadius: 'var(--r-full)', marginTop: 12 }}
                      onClick={() => showToast('Opening application portal… 📋', 'info')}
                    >
                      📝 Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'internships' && (
        <div style={styles.list}>
          {INTERNSHIPS.map((intern, i) => (
            <div key={i} className="saarthi-card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={styles.companyLogo}>{intern.logo}</div>
              <div style={{ flex: 1 }}>
                <h3 style={styles.internCompany}>{intern.company}</h3>
                <p style={styles.internRole}>{intern.role}</p>
                <div style={styles.internMeta}>
                  <span className="badge badge-success">💰 {intern.stipend}</span>
                  <span className="badge badge-info">⏱️ {intern.duration}</span>
                  <span className="badge badge-warning">📅 {intern.deadline}</span>
                </div>
                <div style={styles.skillRow}>
                  {intern.skills.map(s => (
                    <span key={s} style={styles.skillTag}>{s}</span>
                  ))}
                </div>
              </div>
              <button
                className="btn btn-sm"
                style={{ background: 'var(--student-primary)', color: '#fff', borderRadius: 'var(--r-full)', flexShrink: 0 }}
                onClick={() => showToast(`Applying to ${intern.company}… 📩`, 'success')}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 20 },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
  tabRow: { display: 'flex', gap: 10 },
  tab: {
    padding: '9px 22px', borderRadius: 'var(--r-full)',
    border: '1.5px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
  },
  filterRow: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  filterBtn: {
    padding: '7px 16px', borderRadius: 'var(--r-full)',
    border: '1.5px solid', cursor: 'pointer', fontSize: 12, fontWeight: 600,
  },
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  schHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', cursor: 'pointer' },
  schName: { fontSize: 15, fontWeight: 700, color: 'var(--navy-deep)' },
  schDetails: { marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--gray-100)' },
  schDesc: { fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 10 },
  eligBox: {
    background: 'var(--gray-50)', borderRadius: 'var(--r-md)', padding: '10px 14px',
    fontSize: 13, color: 'var(--gray-700)', marginBottom: 12,
  },
  stepsTitle: { fontSize: 13, fontWeight: 700, color: 'var(--gray-600)', marginBottom: 8 },
  stepsList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 },
  step: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray-700)' },
  stepNum: {
    width: 22, height: 22, borderRadius: '50%',
    background: 'var(--student-primary)', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, flexShrink: 0,
  },
  companyLogo: {
    width: 52, height: 52, borderRadius: 12,
    background: 'var(--gray-100)', fontSize: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  internCompany: { fontSize: 16, fontWeight: 700, color: 'var(--navy-deep)' },
  internRole: { fontSize: 13, color: 'var(--gray-600)', margin: '3px 0 8px' },
  internMeta: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  skillRow: { display: 'flex', gap: 6, flexWrap: 'wrap' },
  skillTag: {
    background: 'rgba(108,99,255,0.1)', color: 'var(--student-primary)',
    padding: '3px 10px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 600,
  },
};
