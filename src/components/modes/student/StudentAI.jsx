import React from 'react';
import AIChat from '../../shared/AIChat';

const PROMPTS = [
  'Explain photosynthesis simply',
  'Best career after 12th Science?',
  'How to crack UPSC in 1 year?',
  'What skills should I learn for IT jobs?',
  'Help me write a college SOP',
];

export default function StudentAI() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.icon}>🤖</div>
        <div>
          <h1 style={styles.title}>AI Mentor</h1>
          <p style={styles.subtitle}>Your personal study buddy — asks questions, explains concepts, plans your career</p>
        </div>
      </div>
      <AIChat
        persona="student"
        placeholder="Ask me anything — exams, career, skills…"
        suggestedPrompts={PROMPTS}
      />
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 20 },
  header: { display: 'flex', alignItems: 'center', gap: 14 },
  icon: {
    width: 52, height: 52, borderRadius: 14,
    background: 'var(--student-bg)', fontSize: 26,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid rgba(108,99,255,0.2)',
  },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 2 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
};
