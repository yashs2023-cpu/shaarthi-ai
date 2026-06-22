import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// ─── Dummy credentials for demo ───────────────────────
const DEMO_USERS = [
  { email: 'demo@saarthi.ai',    password: 'Demo@1234',   name: 'Demo User',      phone: '+91 98765 43210' },
  { email: 'student@saarthi.ai', password: 'Student@123', name: 'Arjun Kumar',    phone: '+91 97654 32109' },
  { email: 'amma@saarthi.ai',    password: 'Amma@123',    name: 'Rajeswari Devi', phone: '+91 96543 21098' },
  { email: 'senior@saarthi.ai',  password: 'Senior@123',  name: 'Devendra Prasad',phone: '+91 95432 10987' },
  { email: 'business@saarthi.ai',password: 'Biz@12345',   name: 'Sunita Agarwal', phone: '+91 94321 09876' },
];

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('saarthi_auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('saarthi_auth_token');
      localStorage.removeItem('saarthi_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  async login(email, password) {
    // ── Check demo credentials first (works offline, no backend needed) ──
    const demoUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (demoUser) {
      const user = { id: 'demo_' + demoUser.email, name: demoUser.name, email: demoUser.email, phone: demoUser.phone, language: 'en', isDemo: true };
      localStorage.setItem('saarthi_auth_token', 'demo_token_' + Date.now());
      localStorage.setItem('saarthi_user', JSON.stringify(user));
      return { success: true, user };
    }

    // ── Try real backend ──
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('saarthi_auth_token', data.token);
      localStorage.setItem('saarthi_user', JSON.stringify(data.user));
      return { success: true, user: data.user, token: data.token };
    } catch (error) {
      const message = error.response?.data?.error || 'Invalid email or password. Try demo@saarthi.ai / Demo@1234';
      return { success: false, error: message };
    }
  },

  async register(name, email, phone, password, language) {
    // ── Demo mode: auto-register without backend ──
    const user = { id: 'demo_' + Date.now(), name, email, phone, language, isDemo: true };
    localStorage.setItem('saarthi_auth_token', 'demo_token_' + Date.now());
    localStorage.setItem('saarthi_user', JSON.stringify(user));
    return { success: true, user };

    // NOTE: Uncomment below and remove above when backend is available:
    // try {
    //   const { data } = await api.post('/auth/register', { name, email, phone, password, language });
    //   return { success: true, user: data.user };
    // } catch (error) {
    //   const message = error.response?.data?.error || 'Registration failed. Try again.';
    //   return { success: false, error: message };
    // }
  },

  async getProfile() {
    // ── Demo mode: restore from localStorage ──
    const token = this.getToken();
    if (token?.startsWith('demo_token_')) {
      const user = this.getCurrentUser();
      return user ? { success: true, user } : { success: false, error: 'No session' };
    }

    try {
      const { data } = await api.get('/auth/profile');
      localStorage.setItem('saarthi_user', JSON.stringify(data));
      return { success: true, user: data };
    } catch (error) {
      return { success: false, error: 'Session expired' };
    }
  },

  getCurrentUser() {
    try {
      const user = localStorage.getItem('saarthi_user');
      return user ? JSON.parse(user) : null;
    } catch { return null; }
  },

  getToken() { return localStorage.getItem('saarthi_auth_token'); },
  isAuthenticated() { return !!this.getToken(); },

  logout() {
    localStorage.removeItem('saarthi_auth_token');
    localStorage.removeItem('saarthi_user');
    localStorage.removeItem('saarthi_active_persona');
  },

  getDemoCredentials() { return DEMO_USERS; },
};

export { api };
export default authService;
