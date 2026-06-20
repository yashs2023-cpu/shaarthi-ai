import React, { useState } from 'react';
import { FormInput } from '../shared/FormInput';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { useToast } from '../../hooks/useToast';

export default function StudentMode() {
  const [activeTab, setActiveTab] = useState('productivity');
  const { showToast } = useToast();

  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [pomodoroBreak, setPomodoroBreak] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const [scholarships] = useState([
    {
      id: 1,
      name: 'National Merit Scholarship',
      amount: '₹1,00,000/year',
      eligibility: '90%+ marks in 10th, entrance exam',
      deadline: '2024-07-15',
      description: 'For top performing students nationwide'
    },
    {
      id: 2,
      name: 'State Scholarship for Girls',
      amount: '₹50,000/year',
      eligibility: 'Girls, 75%+ marks',
      deadline: '2024-07-30',
      description: 'Government scholarship for girl students'
    },
    {
      id: 3,
      name: 'Merit-based College Grant',
      amount: '₹75,000/year',
      eligibility: 'Entrance exam top 100 rankers',
      deadline: '2024-08-10',
      description: 'Direct admission with scholarship'
    },
  ]);

  const [internships] = useState([
    { company: 'Google', role: 'Software Engineering Intern', duration: '3 months', stipend: '₹50,000/month', deadline: '2024-07-20' },
    { company: 'Microsoft', role: 'Data Analytics Intern', duration: '6 weeks', stipend: '₹40,000/month', deadline: '2024-07-25' },
    { company: 'Amazon', role: 'Business Analysis Intern', duration: '3 months', stipend: '₹45,000/month', deadline: '2024-08-05' },
  ]);

  const [budget] = useState({
    monthlyAllowance: '₹5,000',
    books: { amount: '₹1,200', percentage: 24 },
    food: { amount: '₹2,000', percentage: 40 },
    entertainment: { amount: '₹800', percentage: 16 },
    savings: { amount: '₹1,000', percentage: 20 },
  });

  const tabs = [
    { key: 'productivity', label: '⏱️ Productivity' },
    { key: 'notes', label: '📝 Notes' },
    { key: 'scholarships', label: '🎓 Scholarships' },
    { key: 'finance', label: '💰 Finance' },
    { key: 'career', label: '🚀 Career' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎓 Student Saarthi - Your Study Companion</h2>
      <p style={styles.subtitle}>Productivity tools, scholarships, and career guidance all in one place</p>

      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tabButton,
              background: activeTab === tab.key ? '#4F46E5' : '#f0f0f0',
              color: activeTab === tab.key ? '#fff' : '#000',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'productivity' && (
          <div>
            <h3>⏱️ Productivity Coach - Pomodoro Timer</h3>
            <Card style={{ marginBottom: '16px' }}>
              <div style={styles.pomodoroContainer}>
                <div style={styles.timerDisplay}>{pomodoroTime}:00</div>
                <p style={styles.timerLabel}>Study Time</p>
                <div style={styles.timerControls}>
                  <Button onClick={() => setIsRunning(!isRunning)} style={{ flex: 1 }}>
                    {isRunning ? '⏸️ Pause' : '▶️ Start'}
                  </Button>
                  <Button onClick={() => setPomodoroTime(25)} variant="outline" style={{ flex: 1 }}>
                    🔄 Reset
                  </Button>
                </div>
                <p style={styles.breakInfo}>Break: {pomodoroBreak} min after</p>
              </div>
            </Card>

            <Card title="📚 Study Tips for Better Focus">
              <div style={styles.tipsList}>
                <p>✅ Work for 25 minutes (1 Pomodoro)</p>
                <p>✅ Take 5-minute break between sessions</p>
                <p>✅ After 4 sessions, take 15-30 min break</p>
                <p>✅ Turn off phone notifications</p>
                <p>✅ Drink water and stay hydrated</p>
                <p>✅ Review notes daily for retention</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'notes' && (
          <div>
            <h3>📝 Notes Summarizer - AI-Generated Study Materials</h3>
            <Card title="Generate Study Notes" style={{ marginBottom: '16px' }}>
              <FormInput label="Chapter/Topic" placeholder="e.g., Photosynthesis" />
              <FormInput label="Subject" placeholder="Biology, Chemistry, History..." />
              <FormInput label="Grade/Level" placeholder="10th, 12th, BTech..." />
              <Button style={{ marginTop: '12px', width: '100%' }}>
                🤖 Generate AI Summary
              </Button>
            </Card>

            <Card title="Your Recent Notes">
              <p>📌 Chapter 5: Photosynthesis</p>
              <p>📌 Coordinate Geometry - Formulas</p>
              <p>📌 French Revolution Key Events</p>
            </Card>
          </div>
        )}

        {activeTab === 'scholarships' && (
          <div>
            <h3>🎓 Scholarship & Internship Finder</h3>

            <h4 style={styles.sectionSubtitle}>🎯 Available Scholarships</h4>
            <div style={styles.scholarshipsList}>
              {scholarships.map(sch => (
                <Card key={sch.id} style={styles.scholarshipCard}>
                  <h5 style={styles.scholarshipName}>{sch.name}</h5>
                  <div style={styles.scholarshipAmount}>{sch.amount}</div>
                  <p style={styles.scholarshipDesc}>{sch.description}</p>
                  <div style={styles.scholarshipDetails}>
                    <p>✓ {sch.eligibility}</p>
                    <p>📅 Deadline: {sch.deadline}</p>
                  </div>
                  <Button style={{ width: '100%', marginTop: '8px' }}>
                    📝 Apply Now
                  </Button>
                </Card>
              ))}
            </div>

            <h4 style={styles.sectionSubtitle}>💼 Internship Opportunities</h4>
            <div style={styles.internshipsList}>
              {internships.map((int, i) => (
                <Card key={i} style={styles.internshipCard}>
                  <h5 style={styles.internshipCompany}>{int.company}</h5>
                  <p style={styles.internshipRole}>{int.role}</p>
                  <div style={styles.internshipDetails}>
                    <p>⏰ Duration: {int.duration}</p>
                    <p>💰 Stipend: {int.stipend}</p>
                    <p>📅 Deadline: {int.deadline}</p>
                  </div>
                  <Button style={{ width: '100%', marginTop: '8px' }}>
                    📝 Apply
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'finance' && (
          <div>
            <h3>💰 Student Finance Assistant - Budget Tracking</h3>
            <Card title="Monthly Budget">
              <div style={styles.budgetContainer}>
                <div style={styles.budgetHeader}>
                  <h5>Monthly Allowance: {budget.monthlyAllowance}</h5>
                </div>

                {Object.entries(budget).filter(([k]) => k !== 'monthlyAllowance').map(([category, data]) => (
                  <div key={category} style={styles.budgetItem}>
                    <div style={styles.budgetLabel}>
                      <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      <span>{data.amount} ({data.percentage}%)</span>
                    </div>
                    <div style={styles.budgetBar}>
                      <div style={{...styles.budgetProgress, width: `${data.percentage}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="💡 Money Saving Tips for Students" style={{ marginTop: '16px' }}>
              <p>✓ Buy used textbooks online</p>
              <p>✓ Get student discounts on software</p>
              <p>✓ Use public transport passes</p>
              <p>✓ Share accommodation with roommates</p>
              <p>✓ Freelance for extra income</p>
            </Card>
          </div>
        )}

        {activeTab === 'career' && (
          <div>
            <h3>🚀 Career Navigator - Plan Your Future</h3>
            <Card title="Career Recommendation Engine">
              <FormInput label="Your Interests" placeholder="e.g., Technology, Finance, Design" />
              <FormInput label="Skills" placeholder="e.g., Python, Data Analysis, UI Design" />
              <Button style={{ marginTop: '12px', width: '100%' }}>
                🔍 Find Matching Careers
              </Button>
            </Card>

            <Card title="Popular Career Paths" style={{ marginTop: '16px' }}>
              <div style={styles.careerPaths}>
                <div style={styles.careerPath}>
                  <h5>💻 Software Development</h5>
                  <p>Learn: Java, Python, React, Node.js</p>
                  <p>Companies: Google, Microsoft, Amazon</p>
                </div>
                <div style={styles.careerPath}>
                  <h5>📊 Data Science</h5>
                  <p>Learn: Python, ML, Analytics</p>
                  <p>Companies: IBM, Accenture, TCS</p>
                </div>
                <div style={styles.careerPath}>
                  <h5>💼 Management Consulting</h5>
                  <p>Learn: Business, Analytics, Leadership</p>
                  <p>Companies: McKinsey, BCG, Deloitte</p>
                </div>
              </div>
            </Card>

            <Button style={{ marginTop: '16px', width: '100%' }}>
              📋 View Full Career Guide
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#4F46E5', marginBottom: '4px', margin: 0 },
  subtitle: { fontSize: '14px', color: '#666', marginBottom: '20px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tabButton: { padding: '12px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' },
  content: { background: '#fff', padding: '20px', borderRadius: '12px' },
  pomodoroContainer: { textAlign: 'center', padding: '20px' },
  timerDisplay: { fontSize: '64px', fontWeight: 'bold', color: '#4F46E5', margin: '20px 0' },
  timerLabel: { fontSize: '14px', color: '#666', margin: '0 0 16px 0' },
  timerControls: { display: 'flex', gap: '8px', marginBottom: '16px' },
  breakInfo: { fontSize: '12px', color: '#999' },
  tipsList: { display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' },
  sectionSubtitle: { fontSize: '16px', fontWeight: 'bold', color: '#4F46E5', margin: '16px 0 12px 0' },
  scholarshipsList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px', marginBottom: '24px' },
  scholarshipCard: {},
  scholarshipName: { fontSize: '16px', fontWeight: 'bold', color: '#4F46E5', margin: '0 0 6px 0' },
  scholarshipAmount: { fontSize: '18px', fontWeight: 'bold', color: '#4CAF50', margin: '6px 0' },
  scholarshipDesc: { fontSize: '13px', color: '#666', margin: '6px 0' },
  scholarshipDetails: { fontSize: '12px', color: '#999', margin: '8px 0' },
  internshipsList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' },
  internshipCard: {},
  internshipCompany: { fontSize: '16px', fontWeight: 'bold', color: '#4F46E5', margin: '0 0 4px 0' },
  internshipRole: { fontSize: '14px', color: '#1a1a3e', margin: '0 0 8px 0' },
  internshipDetails: { fontSize: '12px', color: '#666', margin: '8px 0' },
  budgetContainer: { display: 'flex', flexDirection: 'column', gap: '16px' },
  budgetHeader: { textAlign: 'center', marginBottom: '8px' },
  budgetItem: { display: 'flex', flexDirection: 'column', gap: '6px' },
  budgetLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '600' },
  budgetBar: { height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' },
  budgetProgress: { height: '100%', background: '#4F46E5', transition: 'width 0.3s' },
  careerPaths: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '12px' },
  careerPath: { padding: '12px', background: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' },
};
