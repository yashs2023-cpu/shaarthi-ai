import React, { useState } from 'react';
import { FormInput } from '../shared/FormInput';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { useToast } from '../../hooks/useToast';

export default function BusinessMode() {
  const [activeTab, setActiveTab] = useState('insights');
  const { showToast } = useToast();

  // Business Insights Data
  const [insights] = useState({
    totalSales: '₹2,45,000',
    salesGrowth: '+15%',
    profitMargin: '32%',
    marginChange: '-2%',
    growth: '23%',
    growthChange: '+5%',
    topProduct: 'Product A',
    topCustomer: 'ABC Corp',
  });

  // Customers Data
  const [customers] = useState([
    { id: 1, name: 'ABC Enterprises', phone: '9876543210', lastOrder: '2024-06-15', totalSpent: '₹45,000' },
    { id: 2, name: 'XYZ Industries', phone: '9876543211', lastOrder: '2024-06-18', totalSpent: '₹32,000' },
    { id: 3, name: 'PQR Manufacturing', phone: '9876543212', lastOrder: '2024-06-20', totalSpent: '₹28,500' },
  ]);

  // Expenses Data
  const [expenses] = useState([
    { category: 'Rent', amount: '₹15,000', date: '2024-06-01', status: 'Paid' },
    { category: 'Supplies', amount: '₹5,000', date: '2024-06-10', status: 'Paid' },
    { category: 'Utilities', amount: '₹2,000', date: '2024-06-15', status: 'Pending' },
    { category: 'Salaries', amount: '₹45,000', date: '2024-06-30', status: 'Pending' },
  ]);

  // Employees Data
  const [employees] = useState([
    { id: 1, name: 'Raj Kumar', role: 'Manager', joinDate: '2023-01-15', salary: '₹25,000', status: 'Present' },
    { id: 2, name: 'Priya Singh', role: 'Executive', joinDate: '2023-06-01', salary: '₹18,000', status: 'Present' },
    { id: 3, name: 'Amit Patel', role: 'Developer', joinDate: '2024-01-10', salary: '₹20,000', status: 'On Leave' },
  ]);

  const tabs = [
    { key: 'insights', label: '📊 Insights' },
    { key: 'customers', label: '👥 Customers' },
    { key: 'expenses', label: '💰 Expenses' },
    { key: 'employees', label: '👔 Employees' },
    { key: 'wellness', label: '❤️ Wellness' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏢 Sharmaji Saarthi - Business Mode</h2>

      <div style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tabButton,
              background: activeTab === tab.key ? '#1E1F57' : '#f0f0f0',
              color: activeTab === tab.key ? '#fff' : '#000',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'insights' && (
          <div>
            <h3>📊 Business Insights AI</h3>
            <div style={styles.statsGrid}>
              <Card>
                <div style={styles.statLabel}>Revenue (This Month)</div>
                <div style={styles.statValue}>{insights.totalSales}</div>
                <div style={styles.statChange}>📈 {insights.salesGrowth}</div>
              </Card>
              <Card>
                <div style={styles.statLabel}>Profit Margin</div>
                <div style={styles.statValue}>{insights.profitMargin}</div>
                <div style={styles.statChange}>📉 {insights.marginChange}</div>
              </Card>
              <Card>
                <div style={styles.statLabel}>YoY Growth</div>
                <div style={styles.statValue}>{insights.growth}</div>
                <div style={styles.statChange}>📈 {insights.growthChange}</div>
              </Card>
            </div>

            <Card title="Quick Insights" style={{ marginTop: '16px' }}>
              <p>🏆 Top Selling Product: {insights.topProduct}</p>
              <p>💰 Best Customer: {insights.topCustomer}</p>
              <p>📈 Sales Trend: Increasing (Last 3 months)</p>
              <Button style={{ marginTop: '12px', width: '100%' }}>
                📊 View Detailed Report
              </Button>
            </Card>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h3>👥 Customer Log</h3>
            <Card title="Add New Customer" style={{ marginBottom: '16px' }}>
              <FormInput label="Company Name" placeholder="Business name" />
              <FormInput label="Contact Person" placeholder="Name" />
              <FormInput label="Phone" placeholder="9876543210" />
              <FormInput label="Email" placeholder="email@company.com" />
              <FormInput label="Address" placeholder="Business address" />
              <Button style={{ marginTop: '12px', width: '100%' }}>
                ➕ Add Customer
              </Button>
            </Card>

            <h4 style={styles.listTitle}>Recent Customers</h4>
            <div style={styles.customersList}>
              {customers.map(customer => (
                <Card key={customer.id} style={styles.customerCard}>
                  <h5 style={styles.customerName}>{customer.name}</h5>
                  <div style={styles.customerInfo}>
                    <p>📞 {customer.phone}</p>
                    <p>📅 Last Order: {customer.lastOrder}</p>
                    <p>💰 Total Spent: {customer.totalSpent}</p>
                  </div>
                  <Button onClick={() => showToast('📞', 'Calling ' + customer.name)} style={{ width: '100%', marginTop: '8px' }}>
                    📞 Call
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'expenses' && (
          <div>
            <h3>💰 Expense Tracking</h3>
            <Card title="Record New Expense" style={{ marginBottom: '16px' }}>
              <FormInput label="Category" placeholder="Rent, Supplies, etc" />
              <FormInput label="Amount" type="number" placeholder="Enter amount" />
              <FormInput label="Date" type="date" />
              <FormInput label="Description" placeholder="Details" />
              <Button style={{ marginTop: '12px', width: '100%' }}>
                📝 Add Expense
              </Button>
            </Card>

            <h4 style={styles.listTitle}>Recent Expenses</h4>
            <div style={styles.expensesList}>
              {expenses.map((exp, i) => (
                <Card key={i} style={styles.expenseCard}>
                  <div style={styles.expenseHeader}>
                    <h5 style={styles.expenseCategory}>{exp.category}</h5>
                    <span style={{...styles.status, color: exp.status === 'Paid' ? '#4CAF50' : '#FFA500'}}>
                      {exp.status}
                    </span>
                  </div>
                  <div style={styles.expenseAmount}>{exp.amount}</div>
                  <div style={styles.expenseDate}>{exp.date}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div>
            <h3>👔 Employee Management</h3>
            <div style={styles.employeesList}>
              {employees.map(emp => (
                <Card key={emp.id} style={styles.employeeCard}>
                  <div style={styles.employeeHeader}>
                    <div>
                      <h5 style={styles.employeeName}>{emp.name}</h5>
                      <p style={styles.employeeRole}>{emp.role}</p>
                    </div>
                    <span style={{...styles.statusBadge, background: emp.status === 'Present' ? '#4CAF50' : '#FFA500'}}>
                      {emp.status}
                    </span>
                  </div>
                  <div style={styles.employeeInfo}>
                    <p>📅 Joined: {emp.joinDate}</p>
                    <p>💰 Salary: {emp.salary}/month</p>
                  </div>
                </Card>
              ))}
            </div>

            <Button style={{ marginTop: '16px', width: '100%' }}>
              ➕ Add New Employee
            </Button>
          </div>
        )}

        {activeTab === 'wellness' && (
          <div>
            <h3>❤️ Family Wellness</h3>
            <Card title="Health Check Schedule">
              <p>👨 Father - Monthly check-up (Due: 2024-07-10)</p>
              <p>👩 Mother - Quarterly check-up (Due: 2024-08-15)</p>
              <p>👧 Daughter - Annual vaccination (Due: 2024-07-25)</p>
              <p>👦 Son - Sports fitness test (Next: 2024-07-30)</p>
              <Button style={{ marginTop: '12px', width: '100%' }}>
                📅 Set Reminders
              </Button>
            </Card>

            <Card title="Work-Life Balance Tips" style={{ marginTop: '16px' }}>
              <p>✓ Take short breaks every 2 hours</p>
              <p>✓ Exercise at least 30 minutes daily</p>
              <p>✓ Have quality time with family</p>
              <p>✓ Maintain regular sleep schedule</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#1E1F57', marginBottom: '20px', margin: 0 },
  tabs: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  tabButton: { padding: '10px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.3s' },
  content: { background: '#fff', padding: '20px', borderRadius: '12px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginTop: '12px' },
  statLabel: { fontSize: '12px', color: '#999', fontWeight: '600' },
  statValue: { fontSize: '24px', fontWeight: 'bold', color: '#1E1F57', margin: '8px 0' },
  statChange: { fontSize: '12px', color: '#4CAF50', fontWeight: 'bold' },
  listTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1E1F57', margin: '16px 0 12px 0' },
  customersList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' },
  customerCard: { cursor: 'pointer' },
  customerName: { fontSize: '15px', fontWeight: 'bold', color: '#1E1F57', margin: '0 0 8px 0' },
  customerInfo: { fontSize: '13px', color: '#666', margin: '0' },
  expensesList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' },
  expenseCard: { cursor: 'pointer' },
  expenseHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  expenseCategory: { fontSize: '15px', fontWeight: 'bold', color: '#1E1F57', margin: 0 },
  expenseAmount: { fontSize: '18px', fontWeight: 'bold', color: '#1E1F57', margin: '4px 0' },
  expenseDate: { fontSize: '12px', color: '#999' },
  status: { fontSize: '12px', fontWeight: 'bold' },
  employeesList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' },
  employeeCard: { cursor: 'pointer' },
  employeeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' },
  employeeName: { fontSize: '15px', fontWeight: 'bold', color: '#1E1F57', margin: '0 0 4px 0' },
  employeeRole: { fontSize: '12px', color: '#666', margin: 0 },
  statusBadge: { color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  employeeInfo: { fontSize: '13px', color: '#666', margin: '8px 0 0 0' },
};
