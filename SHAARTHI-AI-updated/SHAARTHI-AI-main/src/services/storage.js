// SaarthiDB - In-memory database with localStorage persistence
const SaarthiDB = {
  users: [],
  user_sessions: [],
  user_preferences: [],
  onboarding_answers: [],
  amma_recipe_history: [],
  grocery_lists: [],
  family_reminders: [],
  scam_reports: [],
  marketing_campaigns: [],
  business_analytics: [],
  emergency_contacts: [],
  study_materials: [],
  productivity_tasks: [],

  init() {
    const saved = localStorage.getItem('saarthi_db');
    if (saved) {
      try {
        Object.assign(this, JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load DB:', e);
      }
    }
  },

  save() {
    localStorage.setItem('saarthi_db', JSON.stringify(this));
  },

  logSql(query) {
    const logs = JSON.parse(localStorage.getItem('saarthi_sql_logs') || '[]');
    logs.push({ query, timestamp: new Date().toISOString() });
    localStorage.setItem('saarthi_sql_logs', JSON.stringify(logs));
  },

  logApi(method, endpoint, request, status, response) {
    const logs = JSON.parse(localStorage.getItem('saarthi_api_logs') || '[]');
    logs.push({
      method,
      endpoint,
      request,
      status,
      response,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('saarthi_api_logs', JSON.stringify(logs));
  },

  getSqlLogs() {
    return JSON.parse(localStorage.getItem('saarthi_sql_logs') || '[]');
  },

  getApiLogs() {
    return JSON.parse(localStorage.getItem('saarthi_api_logs') || '[]');
  },

  clear() {
    localStorage.removeItem('saarthi_db');
    localStorage.removeItem('saarthi_sql_logs');
    localStorage.removeItem('saarthi_api_logs');
  },
};

SaarthiDB.init();
export default SaarthiDB;
