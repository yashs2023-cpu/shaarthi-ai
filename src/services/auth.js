import SaarthiDB from './storage.js';

const authService = {
  getCurrentUserId() {
    return localStorage.getItem('saarthi_current_user_id');
  },

  getCurrentUser() {
    const userId = this.getCurrentUserId();
    if (!userId) return null;
    return SaarthiDB.users.find(u => u.id === userId);
  },

  generateJWT() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + Date.now();
  },

  login(email, password) {
    let user = SaarthiDB.users.find(u => u.email === email);
    if (!user) {
      user = {
        id: 'user_' + Date.now(),
        email,
        password,
        name: 'User',
        phone: '',
        language: 'en',
        mode: null,
        created_at: new Date().toISOString(),
      };
      SaarthiDB.users.push(user);
    }

    const session = {
      user_id: user.id,
      token: this.generateJWT(),
      device: navigator.userAgent,
      created_at: new Date().toISOString(),
    };
    SaarthiDB.user_sessions.push(session);
    SaarthiDB.save();

    localStorage.setItem('saarthi_current_user_id', user.id);
    localStorage.setItem('saarthi_auth_token', session.token);

    return { success: true, user, token: session.token };
  },

  register(name, email, phone, password, language) {
    const existingUser = SaarthiDB.users.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    const user = {
      id: 'user_' + Date.now(),
      email,
      name,
      phone,
      password,
      language,
      mode: null,
      created_at: new Date().toISOString(),
    };

    SaarthiDB.users.push(user);
    SaarthiDB.save();

    return { success: true, user };
  },

  verifyOtp(otp) {
    // Mock OTP verification - any 6 digits work
    if (otp && otp.length === 6) {
      return { success: true };
    }
    return { success: false, error: 'Invalid OTP' };
  },

  logout() {
    localStorage.removeItem('saarthi_current_user_id');
    localStorage.removeItem('saarthi_auth_token');
  },

  isAuthenticated() {
    return !!this.getCurrentUserId();
  },
};

export default authService;
