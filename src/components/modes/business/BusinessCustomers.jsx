import React, { useState } from 'react';
import { useToast } from '../../../hooks/useToast';

const CUSTOMERS = [
  { id: 1, name: 'ABC Enterprises',     phone: '9876543210', lastOrder: '2025-06-15', total: '₹45,000', status: 'Active',   initials: 'AE' },
  { id: 2, name: 'XYZ Industries',      phone: '9876543211', lastOrder: '2025-06-18', total: '₹32,000', status: 'Active',   initials: 'XI' },
  { id: 3, name: 'PQR Manufacturing',   phone: '9876543212', lastOrder: '2025-06-20', total: '₹28,500', status: 'Inactive', initials: 'PM' },
  { id: 4, name: 'Sharma & Sons',       phone: '9876543213', lastOrder: '2025-06-10', total: '₹18,000', status: 'Active',   initials: 'SS' },
];

export default function BusinessCustomers() {
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { showToast } = useToast();

  const filtered = CUSTOMERS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Customer CRM 👥</h1>
          <p style={styles.subtitle}>Manage your customer relationships and orders</p>
        </div>
        <button
          className="btn btn-navy btn-sm"
          style={{ borderRadius: 'var(--r-full)' }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add Customer'}
        </button>
      </div>

      {showForm && (
        <div className="saarthi-card anim-up" style={{ background: '#F0F4F8' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, color: 'var(--navy-deep)' }}>
            New Customer
          </h3>
          <div style={styles.formGrid}>
            {[
              ['Company Name', 'e.g., Sharma Traders'],
              ['Contact Person', 'Full name'],
              ['Phone', '9876543210'],
              ['Email', 'email@company.com'],
              ['City', 'Delhi, Mumbai...'],
            ].map(([label, ph]) => (
              <div key={label} style={styles.field}>
                <label style={styles.label}>{label}</label>
                <input className="saarthi-input" placeholder={ph} />
              </div>
            ))}
          </div>
          <button
            className="btn btn-primary"
            style={{ marginTop: 14 }}
            onClick={() => { setShowForm(false); showToast('Customer added! 🎉', 'success'); }}
          >
            Save Customer
          </button>
        </div>
      )}

      <input
        className="saarthi-input"
        placeholder="🔍 Search customers…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div style={styles.customerList}>
        {filtered.map(c => (
          <div key={c.id} className="saarthi-card" style={styles.customerCard}>
            <div style={styles.customerLeft}>
              <div style={styles.customerAvatar}>{c.initials}</div>
              <div>
                <div style={styles.customerName}>{c.name}</div>
                <div style={styles.customerMeta}>
                  📞 {c.phone} &nbsp;·&nbsp; 📅 Last order: {c.lastOrder}
                </div>
              </div>
            </div>
            <div style={styles.customerRight}>
              <div style={styles.customerTotal}>{c.total}</div>
              <span className={`badge ${c.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                {c.status}
              </span>
              <button
                className="btn btn-sm"
                style={{ background: 'var(--navy)', color: '#fff', borderRadius: 'var(--r-full)' }}
                onClick={() => showToast(`Calling ${c.name}… 📞`, 'info')}
              >
                📞
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 20 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' },
  customerList: { display: 'flex', flexDirection: 'column', gap: 10 },
  customerCard: {},
  customerLeft: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 },
  customerAvatar: {
    width: 46, height: 46, borderRadius: 12,
    background: 'linear-gradient(135deg, var(--navy-light), var(--navy-deep))',
    color: '#fff', fontSize: 14, fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  customerName: { fontSize: 15, fontWeight: 700, color: 'var(--navy-deep)' },
  customerMeta: { fontSize: 12.5, color: 'var(--gray-500)', marginTop: 3 },
  customerRight: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' },
  customerTotal: { fontSize: 16, fontWeight: 700, color: 'var(--navy-deep)' },
};
