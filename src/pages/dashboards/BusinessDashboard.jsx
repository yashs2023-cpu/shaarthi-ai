import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import { PERSONAS } from '../../contexts/ModeContext';

import BusinessHome from '../../components/modes/business/BusinessHome';
import BusinessAI from '../../components/modes/business/BusinessAI';
import BusinessInsights from '../../components/modes/business/BusinessInsights';
import BusinessCustomers from '../../components/modes/business/BusinessCustomers';
import BusinessGST from '../../components/modes/business/BusinessGST';

const NAV_ITEMS = [
  { path: '/business',           label: 'Dashboard',    icon: '💼' },
  { path: '/business/ai',        label: 'AI Advisor',   icon: '🤖' },
  { path: '/business/insights',  label: 'Insights',     icon: '📊' },
  { path: '/business/customers', label: 'Customers',    icon: '👥' },
  { path: '/business/gst',       label: 'GST Guide',    icon: '🏛️' },
  { path: '/scam-shield',        label: 'Scam Shield',  icon: '🛡️' },
];

export default function BusinessDashboard() {
  const persona = PERSONAS.business;
  return (
    <DashboardShell persona={persona} navItems={NAV_ITEMS}>
      <Routes>
        <Route index              element={<BusinessHome />} />
        <Route path="ai"          element={<BusinessAI />} />
        <Route path="insights"    element={<BusinessInsights />} />
        <Route path="customers"   element={<BusinessCustomers />} />
        <Route path="gst"         element={<BusinessGST />} />
        <Route path="*"           element={<Navigate to="/business" replace />} />
      </Routes>
    </DashboardShell>
  );
}
