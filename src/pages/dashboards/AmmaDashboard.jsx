import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import { PERSONAS } from '../../contexts/ModeContext';

// Amma feature pages
import AmmaHome from '../../components/modes/amma/AmmaHome';
import AmmaAI from '../../components/modes/amma/AmmaAI';
import AmmaSchemes from '../../components/modes/amma/AmmaSchemes';
import AmmaRecipes from '../../components/modes/amma/AmmaRecipes';
import AmmaCommunity from '../../components/modes/amma/AmmaCommunity';

const NAV_ITEMS = [
  { path: '/amma',           label: 'Dashboard',       icon: '🏡' },
  { path: '/amma/ai',        label: 'AI Assistant',    icon: '🤖' },
  { path: '/amma/schemes',   label: 'Gov. Schemes',    icon: '🏛️' },
  { path: '/amma/recipes',   label: 'Recipes',         icon: '🍳' },
  { path: '/amma/community', label: 'Community',       icon: '👥' },
  { path: '/scam-shield',    label: 'Scam Shield',     icon: '🛡️' },
];

export default function AmmaDashboard() {
  const persona = PERSONAS.amma;
  return (
    <DashboardShell persona={persona} navItems={NAV_ITEMS}>
      <Routes>
        <Route index           element={<AmmaHome />} />
        <Route path="ai"       element={<AmmaAI />} />
        <Route path="schemes"  element={<AmmaSchemes />} />
        <Route path="recipes"  element={<AmmaRecipes />} />
        <Route path="community" element={<AmmaCommunity />} />
        <Route path="*"        element={<Navigate to="/amma" replace />} />
      </Routes>
    </DashboardShell>
  );
}
