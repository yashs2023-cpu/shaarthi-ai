import React from 'react';
import AIChat from '../../shared/AIChat';

const PROMPTS = [
  'How to reduce my business costs?',
  'GST filing deadline this month?',
  'Best way to retain customers',
  'How to get a business loan?',
  'Marketing strategy for local business',
];

export default function BusinessAI() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.icon}>🤖</div>
        <div>
          <h1 style={styles.title}>AI Business Advisor</h1>
          <p style={styles.subtitle}>
            Expert guidance on GST, growth strategies, customers, and more
          </p>
        </div>
      </div>
      <AIChat
        persona="business"
        placeholder="Ask about GST, growth, loans, customers…"
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
    background: 'var(--business-bg)', fontSize: 26,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid rgba(27,54,93,0.15)',
  },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 2 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
};
