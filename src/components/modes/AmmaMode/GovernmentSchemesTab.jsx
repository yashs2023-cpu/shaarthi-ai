import React, { useState } from 'react';
import { FormInput } from '../../shared/FormInput';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { useToast } from '../../../hooks/useToast';

export function GovernmentSchemesTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const schemes = [
    {
      id: 1,
      name: 'PM-Kisan Samman Nidhi',
      category: 'agriculture',
      benefit: '₹6,000/year (₹2,000 per installment)',
      description: 'Direct income support to farmers for purchasing seeds, fertilizers, and equipment',
      eligibility: 'Small & marginal farmers with up to 2 hectares',
      application: 'Online at pmkisan.gov.in',
      deadline: '31-12-2024',
      documents: ['Aadhar', 'Bank account', 'Land certificate']
    },
    {
      id: 2,
      name: 'Pradhan Mantri Ujjwala Yojana',
      category: 'energy',
      benefit: 'Free LPG connection + ₹1,600 subsidy',
      description: 'Free LPG cooking gas connections to below poverty line households',
      eligibility: 'BPL families without LPG connection',
      application: 'Visit nearby LPG agency',
      deadline: 'Ongoing',
      documents: ['Aadhar', 'BPL certificate', 'Photo']
    },
    {
      id: 3,
      name: 'MGNREGA',
      category: 'employment',
      benefit: '₹300-350/day for 100 days work',
      description: 'Guaranteed employment for rural unskilled workers',
      eligibility: 'Rural residents 18+, willing to do manual work',
      application: 'Register at village MGNREGA office',
      deadline: 'Ongoing',
      documents: ['ID proof', 'Address proof', 'Job card']
    },
    {
      id: 4,
      name: 'Ayushman Bharat',
      category: 'health',
      benefit: '₹5 lakh health insurance coverage',
      description: 'Free health insurance for hospitalization and surgery',
      eligibility: 'BPL and APL families',
      application: 'Contact nearest ASHA worker',
      deadline: 'Ongoing',
      documents: ['Aadhar', 'BPL certificate', 'Photo']
    },
  ];

  const categories = [
    { key: 'all', label: 'All Schemes' },
    { key: 'agriculture', label: '🌾 Agriculture' },
    { key: 'employment', label: '💼 Employment' },
    { key: 'health', label: '🏥 Health' },
    { key: 'energy', label: '⚡ Energy' },
  ];

  const filteredSchemes = schemes.filter(scheme =>
    selectedCategory === 'all' || scheme.category === selectedCategory
  );

  const { showToast } = useToast();

  return (
    <div style={styles.container}>
      <div style={styles.filterBar}>
        <FormInput
          placeholder="Search schemes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div style={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            style={{
              ...styles.categoryBtn,
              background: selectedCategory === cat.key ? '#F4A300' : '#f0f0f0',
              color: selectedCategory === cat.key ? '#fff' : '#000',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div style={styles.schemesList}>
        {filteredSchemes.map(scheme => (
          <Card key={scheme.id} style={styles.schemeCard}>
            <div style={styles.schemeHeader}>
              <h4 style={styles.schemeName}>{scheme.name}</h4>
              <span style={styles.benefit}>💰 {scheme.benefit}</span>
            </div>

            <p style={styles.description}>{scheme.description}</p>

            <div style={styles.details}>
              <div style={styles.detail}>
                <strong>✓ Eligibility:</strong> {scheme.eligibility}
              </div>
              <div style={styles.detail}>
                <strong>📋 How to Apply:</strong> {scheme.application}
              </div>
              <div style={styles.detail}>
                <strong>📅 Deadline:</strong> {scheme.deadline}
              </div>
              <div style={styles.detail}>
                <strong>📄 Documents:</strong> {scheme.documents.join(', ')}
              </div>
            </div>

            <div style={styles.actions}>
              <Button onClick={() => showToast('✅', 'Saved to favorites!')}>
                ❤️ Save
              </Button>
              <Button onClick={() => showToast('📱', 'Opening application form...')}>
                📝 Apply Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '16px' },
  filterBar: { marginBottom: '8px' },
  categories: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' },
  categoryBtn: { padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
  schemesList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  schemeCard: { cursor: 'pointer' },
  schemeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' },
  schemeName: { fontSize: '16px', fontWeight: 'bold', color: '#1a1a3e', margin: 0 },
  benefit: { fontSize: '13px', color: '#F4A300', fontWeight: 'bold', whiteSpace: 'nowrap' },
  description: { fontSize: '14px', color: '#666', margin: '8px 0', lineHeight: '1.5' },
  details: { display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0', padding: '12px', background: '#f9f9f9', borderRadius: '8px' },
  detail: { fontSize: '13px', color: '#555', lineHeight: '1.4' },
  actions: { display: 'flex', gap: '8px', marginTop: '12px' },
};
