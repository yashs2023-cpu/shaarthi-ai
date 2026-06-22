import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { FormInput } from '../shared/FormInput';
import { useToast } from '../../hooks/useToast';

export default function SeniorMode() {
  const [activeTab, setActiveTab] = useState('sos');
  const { showToast } = useToast();

  const [emergencyContacts] = useState([
    { id: 1, name: 'Dr. Rajesh Sharma', phone: '9876543210', type: 'Doctor', speciality: 'General Physician' },
    { id: 2, name: 'City Hospital', phone: '9876543211', type: 'Emergency', address: 'Main Road' },
    { id: 3, name: 'Ajay Singh (Son)', phone: '9876543212', type: 'Family', relation: 'Son' },
    { id: 4, name: 'Meera Singh (Daughter)', phone: '9876543213', type: 'Family', relation: 'Daughter' },
  ]);

  const [medicines] = useState([
    { id: 1, name: 'Blood Pressure Medicine', dosage: '1 tablet', time: '8:00 AM', status: '✅', reason: 'For hypertension' },
    { id: 2, name: 'Heart Medicine', dosage: '1 capsule', time: '1:00 PM', status: '✅', reason: 'Heart health' },
    { id: 3, name: 'Calcium Vitamin', dosage: '1 tablet', time: '8:00 PM', status: '⏳', reason: 'Bone strength' },
  ]);

  const [memories] = useState([
    { date: '2024-07-25', event: "Grandson's Birthday", reminder: '3 days before' },
    { date: '2024-08-15', event: 'Wedding Anniversary', reminder: '1 week before' },
    { date: '2024-06-25', event: 'Doctor Check-up', reminder: 'Monthly' },
  ]);

  const tabs = [
    { key: 'sos', label: '🆘 SOS' },
    { key: 'medicine', label: '💊 Medicine' },
    { key: 'memory', label: '🧠 Memory' },
    { key: 'guide', label: '📖 Guide' },
    { key: 'benefits', label: '💰 Benefits' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👴 Senior Saarthi - For Our Elders</h2>
      <p style={styles.subtitle}>Your trusted companion for health, safety, and well-being</p>

      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tabButton,
              background: activeTab === tab.key ? '#7FB7BE' : '#f0f0f0',
              color: activeTab === tab.key ? '#fff' : '#000',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'sos' && (
          <div>
            <h3>🆘 Emergency SOS Dialer - Big Buttons for Easy Access</h3>
            <p style={styles.description}>Tap any contact to call immediately. Emergency numbers are highlighted.</p>
            <div style={styles.emergencyGrid}>
              {emergencyContacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => showToast('📞', `Calling ${contact.name}...`)}
                  style={{
                    ...styles.sosContactBtn,
                    background: contact.type === 'Emergency' ? '#e11d48' : '#7FB7BE',
                  }}
                >
                  <div style={styles.sosContactName}>{contact.name}</div>
                  <div style={styles.sosContactPhone}>{contact.phone}</div>
                  <div style={styles.sosContactType}>{contact.type}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'medicine' && (
          <div>
            <h3>💊 Medicine Reminders - Never Miss a Dose</h3>
            <div style={styles.medicineList}>
              {medicines.map(med => (
                <Card key={med.id} style={styles.medicineCard}>
                  <div style={styles.medicineHeader}>
                    <div>
                      <h5 style={styles.medicineName}>{med.name}</h5>
                      <p style={styles.medicineReason}>{med.reason}</p>
                    </div>
                    <span style={styles.medicineStatus}>{med.status}</span>
                  </div>
                  <div style={styles.medicineDetails}>
                    <p>💊 Dosage: {med.dosage}</p>
                    <p>⏰ Time: {med.time}</p>
                  </div>
                  <Button
                    onClick={() => showToast('✅', `Marked ${med.name} as taken`)}
                    style={{ width: '100%', marginTop: '8px', padding: '12px' }}
                  >
                    ✓ Took Medicine
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'memory' && (
          <div>
            <h3>🧠 Memory Management - Important Dates & Events</h3>
            <Card title="Add Important Date" style={{ marginBottom: '16px' }}>
              <FormInput label="Event Name" placeholder="Birthday, Anniversary, etc" />
              <FormInput label="Date" type="date" />
              <FormInput label="Reminder" placeholder="Days before event" />
              <Button style={{ marginTop: '12px', width: '100%' }}>
                ➕ Add Memory
              </Button>
            </Card>

            <h4 style={styles.listTitle}>📅 Upcoming Events</h4>
            <div style={styles.memoriesList}>
              {memories.map((mem, i) => (
                <Card key={i} style={styles.memoryCard}>
                  <h5 style={styles.memoryEvent}>{mem.event}</h5>
                  <p style={styles.memoryDate}>📅 {mem.date}</p>
                  <p style={styles.memoryReminder}>🔔 Reminder: {mem.reminder}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div>
            <h3>📖 Digital Companion Guide - Easy Tech Learning</h3>
            <div style={styles.guidesList}>
              <Card>
                <h5>📱 How to Use Phone Features</h5>
                <p>Learn to make calls, send messages, and use apps</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  ▶️ Watch Video (5 min)
                </Button>
              </Card>
              <Card>
                <h5>🌐 Internet & Email Basics</h5>
                <p>Browse safely and email your family</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  ▶️ Watch Video (7 min)
                </Button>
              </Card>
              <Card>
                <h5>📞 Video Calling with Family</h5>
                <p>See your grandchildren on video call</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  ▶️ Watch Video (4 min)
                </Button>
              </Card>
              <Card>
                <h5>💳 Banking & Online Payments Safely</h5>
                <p>Send money and pay bills securely</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  ▶️ Watch Video (6 min)
                </Button>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div>
            <h3>💰 Government Benefits & Schemes for Seniors</h3>
            <div style={styles.benefitsList}>
              <Card>
                <h5>🏛️ Senior Citizen Pension</h5>
                <p>₹500-1000/month assistance for 60+ years</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  📝 Apply Now
                </Button>
              </Card>
              <Card>
                <h5>🏥 Ayushman Bharat - Health Insurance</h5>
                <p>₹5 lakh free health coverage for hospitalization</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  📝 Apply Now
                </Button>
              </Card>
              <Card>
                <h5>🏠 Senior Citizen Housing Scheme</h5>
                <p>Affordable housing for senior citizens</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  📝 Apply Now
                </Button>
              </Card>
              <Card>
                <h5>💰 Old Age Benefits & Tax Exemptions</h5>
                <p>Tax benefits and financial assistance</p>
                <Button style={{ width: '100%', marginTop: '8px' }}>
                  📝 Learn More
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#7FB7BE', marginBottom: '4px', margin: 0 },
  subtitle: { fontSize: '14px', color: '#666', marginBottom: '20px' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tabButton: { padding: '12px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.3s' },
  content: { background: '#fff', padding: '20px', borderRadius: '12px' },
  description: { fontSize: '14px', color: '#666', marginBottom: '16px' },
  emergencyGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' },
  sosContactBtn: { padding: '20px', border: 'none', borderRadius: '12px', cursor: 'pointer', color: '#fff', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' },
  sosContactName: { fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' },
  sosContactPhone: { fontSize: '14px', marginBottom: '4px' },
  sosContactType: { fontSize: '12px', opacity: 0.9 },
  medicineList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  medicineCard: {},
  medicineHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' },
  medicineName: { fontSize: '16px', fontWeight: 'bold', color: '#1a1a3e', margin: '0 0 4px 0' },
  medicineReason: { fontSize: '12px', color: '#666', margin: 0 },
  medicineStatus: { fontSize: '20px' },
  medicineDetails: { fontSize: '13px', color: '#666', margin: '8px 0' },
  listTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1a1a3e', margin: '16px 0 12px 0' },
  memoriesList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' },
  memoryCard: {},
  memoryEvent: { fontSize: '16px', fontWeight: 'bold', color: '#7FB7BE', margin: 0 },
  memoryDate: { fontSize: '13px', color: '#666', margin: '6px 0' },
  memoryReminder: { fontSize: '13px', color: '#F4A300', fontWeight: 'bold', margin: 0 },
  guidesList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' },
  benefitsList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' },
};
