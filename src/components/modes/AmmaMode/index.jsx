import React, { useState } from 'react';
import { RecipeTab } from './RecipeTab';
import { GroceryTab } from './GroceryTab';
import { RemindersTab } from './RemindersTab';
import { GovernmentSchemesTab } from './GovernmentSchemesTab';
import { CommunityTab } from './CommunityTab';

export function AmmaMode() {
  const [activeTab, setActiveTab] = useState('recipe');

  const tabs = [
    { key: 'schemes', label: '🏛️ Schemes' },
    { key: 'recipe', label: '🍳 Recipe' },
    { key: 'grocery', label: '🛒 Grocery' },
    { key: 'reminders', label: '👨‍👩‍👧 Reminders' },
    { key: 'community', label: '👥 Community' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tabButton,
              background: activeTab === tab.key ? '#F4A300' : '#f0f0f0',
              color: activeTab === tab.key ? '#fff' : '#000',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'schemes' && <GovernmentSchemesTab />}
        {activeTab === 'recipe' && <RecipeTab />}
        {activeTab === 'grocery' && <GroceryTab />}
        {activeTab === 'reminders' && <RemindersTab />}
        {activeTab === 'community' && <CommunityTab />}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tabButton: {
    padding: '10px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s',
  },
  content: { background: '#fff', padding: '20px', borderRadius: '12px' },
};
