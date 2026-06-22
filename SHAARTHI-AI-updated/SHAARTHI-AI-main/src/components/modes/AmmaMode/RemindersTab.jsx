import React, { useState } from 'react';
import { FormInput } from '../../shared/FormInput';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import apiService from '../../../services/api';
import { useToast } from '../../../hooks/useToast';
import SaarthiDB from '../../../services/storage';

export function RemindersTab() {
  const [type, setType] = useState('medicine');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [reminders, setReminders] = useState(SaarthiDB.family_reminders);
  const { showToast } = useToast();

  const handleCreateReminder = async () => {
    if (!description || !date) {
      showToast('⚠️', 'Please fill all fields');
      return;
    }

    showToast('🔄', 'Creating reminder...');
    const result = await apiService.createReminder(type, description, date);
    setReminders([...reminders, result]);
    setDescription('');
    setDate('');
    showToast('✅', 'Reminder created!');
  };

  const handleDeleteReminder = (id) => {
    const updated = reminders.filter(r => r.id !== id);
    SaarthiDB.family_reminders = updated;
    SaarthiDB.save();
    setReminders(updated);
    showToast('🗑️', 'Reminder deleted');
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>👨‍👩‍👧 Family Reminders</h3>

      <Card title="Create Reminder">
        <div style={styles.formGroup}>
          <label style={styles.label}>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.select}
          >
            <option value="medicine">💊 Medicine</option>
            <option value="bill">💰 Bill</option>
            <option value="event">🎉 Event</option>
          </select>
        </div>
        <FormInput
          label="Description"
          placeholder="e.g., Take blood pressure medicine"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormInput
          label="Date & Time"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Button onClick={handleCreateReminder} style={{ marginTop: '12px', width: '100%' }}>
          🔔 Create Reminder
        </Button>
      </Card>

      {reminders.length > 0 && (
        <Card title={`Active Reminders (${reminders.length})`}>
          <div style={styles.list}>
            {reminders.map(r => (
              <div key={r.id} style={styles.reminderItem}>
                <div>
                  <strong>{r.description}</strong>
                  <p style={styles.meta}>{new Date(r.due_date).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => handleDeleteReminder(r.id)}
                  style={styles.deleteBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '16px' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#F4A300' },
  formGroup: { marginBottom: '12px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' },
  select: {
    width: '100%',
    padding: '10px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
  },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  reminderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px',
    background: '#f8f8f8',
    borderRadius: '8px',
    borderLeft: '4px solid #F4A300',
  },
  meta: { fontSize: '12px', color: '#999', margin: '4px 0 0 0' },
  deleteBtn: {
    background: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 10px',
    cursor: 'pointer',
  },
};
