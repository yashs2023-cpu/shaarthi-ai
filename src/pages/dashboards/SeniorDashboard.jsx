import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import { PERSONAS } from '../../contexts/ModeContext';

import SeniorHome from '../../components/modes/senior/SeniorHome';
import SeniorAI from '../../components/modes/senior/SeniorAI';
import SeniorSOS from '../../components/modes/senior/SeniorSOS';
import SeniorHealth from '../../components/modes/senior/SeniorHealth';
import SeniorBenefits from '../../components/modes/senior/SeniorBenefits';

const NAV_ITEMS = [
  { path: '/senior',          label: 'Dashboard',      icon: '🌟' },
  { path: '/senior/ai',       label: 'AI Assistant',   icon: '🤖' },
  { path: '/senior/sos',      label: 'Emergency SOS',  icon: '🆘' },
  { path: '/senior/health',   label: 'Health',         icon: '💊' },
  { path: '/senior/benefits', label: 'Benefits',       icon: '🏛️' },
  { path: '/scam-shield',     label: 'Scam Shield',    icon: '🛡️' },
];

export default function SeniorDashboard() {
  const persona = PERSONAS.senior;
  return (
    <DashboardShell persona={persona} navItems={NAV_ITEMS}>
      <Routes>
        <Route index             element={<SeniorHome />} />
        <Route path="ai"         element={<SeniorAI />} />
        <Route path="sos"        element={<SeniorSOS />} />
        <Route path="health"     element={<SeniorHealth />} />
        <Route path="benefits"   element={<SeniorBenefits />} />
        <Route path="*"          element={<Navigate to="/senior" replace />} />
      </Routes>
    </DashboardShell>
  );
}
