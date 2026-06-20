import React from 'react';
import AIChat from '../../shared/AIChat';

const PROMPTS = [
  'Mujhe UPI fraud se kaise bachein?',
  'Blood pressure medicine kab leni chahiye?',
  'Online shopping safely kaise karein?',
  'Pension ke liye kaise apply karein?',
  'Video call karna sikhao',
];

export default function SeniorAI() {
  return (
    <div style={styles.page} className="senior-mode">
      <div style={styles.header}>
        <div style={styles.icon}>🤖</div>
        <div>
          <h1 style={styles.title}>AI Saarthi</h1>
          <p style={styles.subtitle}>Saral Hindi mein poochein kuch bhi — main hamesha yahan hoon</p>
        </div>
      </div>
      <AIChat
        persona="senior"
        placeholder="Koi bhi sawaal poochein…"
        suggestedPrompts={PROMPTS}
      />
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 20 },
  header: { display: 'flex', alignItems: 'center', gap: 14 },
  icon: {
    width: 60, height: 60, borderRadius: 16,
    background: '#F0F9FF', fontSize: 30,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid rgba(14,165,233,0.2)',
  },
  title: { fontSize: 24, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 16, color: 'var(--gray-500)' },
};
