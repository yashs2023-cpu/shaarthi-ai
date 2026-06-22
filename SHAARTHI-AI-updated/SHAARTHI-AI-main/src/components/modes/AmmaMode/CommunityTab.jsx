import React, { useState } from 'react';
import { FormInput } from '../../shared/FormInput';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { useToast } from '../../../hooks/useToast';

export function CommunityTab() {
  const [groups] = useState([
    {
      id: 1,
      name: 'Mahila Mandal - West Ward',
      leader: 'Mrs. Lakshmi Sharma',
      members: 45,
      focus: 'Women Empowerment & Skill Training',
      meetings: 'Every Tuesday 2 PM',
      activities: ['Stitching classes', 'Financial literacy', 'Health camps'],
      location: 'Community Center, Block A',
      joinedBy: '₹50/month',
      contact: '9876543210',
    },
    {
      id: 2,
      name: 'Self Help Group - Craft Makers',
      leader: 'Mrs. Priya Verma',
      members: 32,
      focus: 'Handmade Products & Income Generation',
      meetings: 'Every Saturday 10 AM',
      activities: ['Pottery', 'Weaving', 'Embroidery', 'Market access'],
      location: 'Local Hall, Main Street',
      joinedBy: '₹100 one-time + ₹25/month',
      contact: '9876543211',
    },
    {
      id: 3,
      name: 'Joint Liability Group - Savings Circle',
      leader: 'Mrs. Anjali Singh',
      members: 28,
      focus: 'Microfinance & Group Savings',
      meetings: 'Every month on 1st',
      activities: ['Savings pool', 'Micro-loans', 'Business training'],
      location: 'Bank Office, Main Road',
      joinedBy: '₹100 monthly savings',
      contact: '9876543212',
    },
    {
      id: 4,
      name: 'Nutrition & Health Group',
      leader: 'Mrs. Meena Rao',
      members: 38,
      focus: 'Health Awareness & Nutrition',
      meetings: 'Every Wednesday 11 AM',
      activities: ['Health talks', 'Nutrition workshops', 'Fitness classes'],
      location: 'ASHA Center, Block C',
      joinedBy: 'Free',
      contact: '9876543213',
    },
  ]);

  const [selectedGroup, setSelectedGroup] = useState(null);
  const { showToast } = useToast();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>👥 Community & Self-Help Groups (SHGs)</h3>
        <p style={styles.subtitle}>Join groups to learn skills, earn income, and grow together</p>
      </div>

      <div style={styles.groupsList}>
        {groups.map(group => (
          <Card key={group.id} style={styles.groupCard}>
            <div style={styles.groupHeader}>
              <div>
                <h4 style={styles.groupName}>{group.name}</h4>
                <p style={styles.leader}>👤 Led by: {group.leader}</p>
              </div>
              <div style={styles.memberBadge}>{group.members} members</div>
            </div>

            <div style={styles.groupInfo}>
              <div style={styles.infoItem}>
                <strong>📌 Focus:</strong> {group.focus}
              </div>
              <div style={styles.infoItem}>
                <strong>📅 Meetings:</strong> {group.meetings}
              </div>
              <div style={styles.infoItem}>
                <strong>📍 Location:</strong> {group.location}
              </div>
              <div style={styles.infoItem}>
                <strong>💰 Membership:</strong> {group.joinedBy}
              </div>
            </div>

            <div style={styles.activities}>
              <strong>🎯 Activities:</strong>
              <div style={styles.activityTags}>
                {group.activities.map((activity, i) => (
                  <span key={i} style={styles.activityTag}>{activity}</span>
                ))}
              </div>
            </div>

            <div style={styles.actions}>
              <Button onClick={() => {
                setSelectedGroup(group);
                showToast('✅', `Interested in ${group.name}!`);
              }} style={{ flex: 1 }}>
                📝 Join Group
              </Button>
              <Button onClick={() => showToast('📞', `Contacting ${group.leader}...`)} variant="outline" style={{ flex: 1 }}>
                📞 {group.contact}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="🆕 Start Your Own Group" style={{ marginTop: '20px' }}>
        <p>Want to create a group? Connect with neighbors and build economic opportunities together.</p>
        <div style={styles.groupForm}>
          <FormInput label="Group Name" placeholder="e.g., Women's Stitching Group" />
          <FormInput label="Focus Area" placeholder="e.g., Skill training, Savings, Crafts" />
          <FormInput label="Target Members" type="number" placeholder="How many members?" />
          <Button style={{ width: '100%', marginTop: '12px' }}>
            🚀 Create Group
          </Button>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '16px' },
  header: { marginBottom: '8px' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#F4A300', margin: 0 },
  subtitle: { fontSize: '13px', color: '#666', margin: '4px 0 0 0' },
  groupsList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  groupCard: { cursor: 'pointer' },
  groupHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' },
  groupName: { fontSize: '16px', fontWeight: 'bold', color: '#1a1a3e', margin: '0 0 4px 0' },
  leader: { fontSize: '12px', color: '#666', margin: 0 },
  memberBadge: { fontSize: '13px', background: '#F4A300', color: '#fff', padding: '6px 12px', borderRadius: '12px', fontWeight: 'bold' },
  groupInfo: { display: 'flex', flexDirection: 'column', gap: '6px', margin: '12px 0', padding: '12px', background: '#f9f9f9', borderRadius: '8px' },
  infoItem: { fontSize: '13px', color: '#555' },
  activities: { margin: '12px 0' },
  activityTags: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' },
  activityTag: { fontSize: '12px', background: '#E8C84A', color: '#1a1a3e', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' },
  actions: { display: 'flex', gap: '8px', marginTop: '12px' },
  groupForm: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' },
};
