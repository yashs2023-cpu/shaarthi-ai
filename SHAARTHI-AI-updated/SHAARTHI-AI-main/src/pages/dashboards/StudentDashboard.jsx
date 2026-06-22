import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardShell from '../../components/layout/DashboardShell';
import { PERSONAS } from '../../contexts/ModeContext';

import StudentHome from '../../components/modes/student/StudentHome';
import StudentAI from '../../components/modes/student/StudentAI';
import StudentCareer from '../../components/modes/student/StudentCareer';
import StudentScholarships from '../../components/modes/student/StudentScholarships';
import StudentStudy from '../../components/modes/student/StudentStudy';

const NAV_ITEMS = [
  { path: '/student',             label: 'Dashboard',     icon: '🎓' },
  { path: '/student/ai',          label: 'AI Mentor',     icon: '🤖' },
  { path: '/student/career',      label: 'Career Guide',  icon: '🚀' },
  { path: '/student/study',       label: 'Study Planner', icon: '📚' },
  { path: '/student/scholarships',label: 'Scholarships',  icon: '🏅' },
  { path: '/scam-shield',         label: 'Scam Shield',   icon: '🛡️' },
];

export default function StudentDashboard() {
  const persona = PERSONAS.student;
  return (
    <DashboardShell persona={persona} navItems={NAV_ITEMS}>
      <Routes>
        <Route index                element={<StudentHome />} />
        <Route path="ai"            element={<StudentAI />} />
        <Route path="career"        element={<StudentCareer />} />
        <Route path="study"         element={<StudentStudy />} />
        <Route path="scholarships"  element={<StudentScholarships />} />
        <Route path="*"             element={<Navigate to="/student" replace />} />
      </Routes>
    </DashboardShell>
  );
}
