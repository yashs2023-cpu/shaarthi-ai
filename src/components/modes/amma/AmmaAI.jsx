import React from 'react';
import AIChat from '../../shared/AIChat';

const SUGGESTED_PROMPTS = [
  'PM-Kisan ka paisa kab aata hai?',
  'Aaj healthy sabzi ki recipe batao',
  'Online fraud se kaise bachein?',
  'Grocery list optimize karo',
  'Beti ke liye scholarship batao',
];

export default function AmmaAI() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.headerIcon}>🤖</div>
        <div>
          <h1 style={styles.title}>AI Assistant</h1>
          <p style={styles.subtitle}>
            Amma Saarthi — aapki zindagi asaan banane ke liye AI ki shakti
          </p>
        </div>
      </div>
      <AIChat
        persona="amma"
        placeholder="Koi bhi sawaal poochein — Hindi ya English mein…"
        suggestedPrompts={SUGGESTED_PROMPTS}
      />
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 20 },
  header: { display: 'flex', alignItems: 'center', gap: 14 },
  headerIcon: {
    width: 52, height: 52, borderRadius: 14,
    background: 'var(--amma-bg)', fontSize: 26,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid var(--saffron-glow)',
  },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 2 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
};
