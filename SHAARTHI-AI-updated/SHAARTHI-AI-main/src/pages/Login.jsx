import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

const DEMO_CREDS = [
  { label: '🎓 Student',  email: 'student@saarthi.ai', password: 'Student@123', color: '#6C63FF' },
  { label: '👩‍🍳 Amma',   email: 'amma@saarthi.ai',    password: 'Amma@123',    color: '#FF9933' },
  { label: '👴 Senior',   email: 'senior@saarthi.ai',  password: 'Senior@123',  color: '#0EA5E9' },
  { label: '💼 Business', email: 'business@saarthi.ai',password: 'Biz@12345',   color: '#1B365D' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [tab, setTab] = useState('login');
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLanguage, setRegLanguage] = useState('en');

  useEffect(() => {
    if (isAuthenticated) navigate('/choose');
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) { showToast('Please fill all fields', 'warning'); return; }
    setLoading(true);
    try {
      const result = await login(loginEmail, loginPassword);
      if (result.success) { showToast(`Welcome back, ${result.user?.name?.split(' ')[0]}! 🙏`, 'success'); navigate('/choose'); }
      else showToast(result.error || 'Login failed', 'error');
    } catch {
      showToast('Try a demo credential below! 👇', 'error');
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) { showToast('Please fill all required fields', 'warning'); return; }
    setLoading(true);
    try {
      const result = await register(regName, regEmail, regPhone, regPassword, regLanguage);
      if (result.success) {
        showToast('Account created! Welcome to Saarthi 🎉', 'success');
        navigate('/choose');
      } else showToast(result.error || 'Registration failed', 'error');
    } catch {
      showToast('Something went wrong', 'error');
    } finally { setLoading(false); }
  };

  const fillDemo = (cred) => {
    setLoginEmail(cred.email);
    setLoginPassword(cred.password);
    setTab('login');
    showToast(`Filled ${cred.label} credentials! Click Sign In 🚀`, 'success');
  };

  return (
    <div style={styles.page} className="indian-art-bg">
      {/* Decorative background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />
      <div style={styles.blob4} />

      {/* Floating mandalas */}
      <MandalaDecor size={320} style={{ position: 'fixed', top: -80, left: -80, opacity: 0.06 }} />
      <MandalaDecor size={240} style={{ position: 'fixed', bottom: -60, right: -60, opacity: 0.06 }} />
      <MandalaDecor size={160} style={{ position: 'fixed', top: '40%', left: '45%', opacity: 0.04 }} />

      {/* Left branding panel */}
      <div style={styles.brandPanel} className="lotus-art-bg">
        <div style={styles.brandContent}>
          {/* Spinning Ashoka Chakra */}
          <div style={styles.brandLogo}>
            <AshokaSVG size={48} color="var(--gold)" />
          </div>
          <h1 style={styles.brandTitle}>Saarthi AI</h1>
          <p style={styles.brandTagline}>आपका डिजिटल साथी</p>
          <p style={styles.brandDesc}>
            India's trusted AI companion for every Indian family — students, homemakers, seniors and entrepreneurs.
          </p>
          <div style={styles.brandPersonas}>
            {['🏡 Amma', '🎓 Student', '👴 Senior', '💼 Business'].map(p => (
              <span key={p} style={styles.brandBadge}>{p}</span>
            ))}
          </div>

          {/* Decorative border pattern */}
          <div style={styles.brandDivider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerDot}>✦</span>
            <div style={styles.dividerLine} />
          </div>

          {/* Feature quick list */}
          <div style={styles.featureList}>
            {[
              '🛡️ Scam Shield Protection',
              '🏛️ Government Schemes Guide',
              '📚 AI Study Assistant',
              '🌐 6 Indian Languages',
            ].map(f => (
              <div key={f} style={styles.featureItem}>{f}</div>
            ))}
          </div>
        </div>

        {/* Bottom pattern strip */}
        <div style={styles.brandBottom}>
          <div style={styles.tricolorStrip}>
            <div style={{ flex: 1, background: '#FF9933' }} />
            <div style={{ flex: 1, background: '#fff' }} />
            <div style={{ flex: 1, background: '#138808' }} />
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={styles.formPanel}>
        <Link to="/" style={styles.backLink}>← Back to home</Link>

        <div style={styles.formCard}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              {tab === 'login' ? '🙏 Welcome Back' : '🚀 Create Account'}
            </h2>
            <p style={styles.formSubtitle}>
              {tab === 'login' ? 'Sign in to meet your Saarthi' : 'Join millions using Saarthi AI'}
            </p>
          </div>

          {/* Tab switch */}
          <div style={styles.tabSwitch}>
            <button
              style={{ ...styles.tabBtn, ...(tab === 'login' ? styles.tabActive : {}) }}
              onClick={() => setTab('login')}
            >
              Sign In
            </button>
            <button
              style={{ ...styles.tabBtn, ...(tab === 'register' ? styles.tabActive : {}) }}
              onClick={() => setTab('register')}
            >
              Register
            </button>
          </div>

          {/* ── DEMO CREDENTIALS BANNER ── */}
          {tab === 'login' && (
            <div style={styles.demoBox}>
              <div style={styles.demoTitle}>
                <span style={styles.demoBolt}>⚡</span>
                Try Demo — click any persona to auto-fill
              </div>
              <div style={styles.demoGrid}>
                {DEMO_CREDS.map(cred => (
                  <button
                    key={cred.label}
                    style={{ ...styles.demoBtn, borderColor: cred.color + '40', color: cred.color }}
                    onClick={() => fillDemo(cred)}
                    title={`${cred.email} / ${cred.password}`}
                  >
                    {cred.label}
                  </button>
                ))}
              </div>
              <div style={styles.demoHint}>
                Or use <strong>demo@saarthi.ai</strong> / <strong>Demo@1234</strong>
              </div>
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Email address</label>
                <input
                  type="email"
                  className="saarthi-input"
                  placeholder="demo@saarthi.ai"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="saarthi-input"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                    style={{ paddingRight: 44 }}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                    tabIndex={-1}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-royal"
                style={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                    <span style={styles.spinner} /> Signing in…
                  </span>
                ) : 'Sign In →'}
              </button>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Full Name *</label>
                <input type="text" className="saarthi-input" placeholder="Priya Sharma" value={regName} onChange={e => setRegName(e.target.value)} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Email *</label>
                <input type="email" className="saarthi-input" placeholder="you@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Phone (optional)</label>
                <input type="tel" className="saarthi-input" placeholder="+91 98765 43210" value={regPhone} onChange={e => setRegPhone(e.target.value)} />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Password *</label>
                <input type="password" className="saarthi-input" placeholder="Create a strong password" value={regPassword} onChange={e => setRegPassword(e.target.value)} required />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Preferred Language</label>
                <select className="saarthi-input" value={regLanguage} onChange={e => setRegLanguage(e.target.value)}>
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="mr">मराठी (Marathi)</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-royal"
                style={styles.submitBtn}
                disabled={loading}
              >
                {loading ? '⏳ Creating account…' : 'Create Account →'}
              </button>
            </form>
          )}

          <p style={styles.terms}>
            By continuing, you agree to our{' '}
            <span style={{ color: 'var(--royal-maroon)', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: 'var(--royal-maroon)', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </div>

        {/* Trusted by section */}
        <div style={styles.trustRow}>
          {['🔒 Secure', '🇮🇳 Made in India', '⚡ Always Free'].map(t => (
            <span key={t} style={styles.trustBadge}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */
function AshokaSVG({ size = 48, color = 'var(--gold)' }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ animation: 'chakra-spin 20s linear infinite' }}>
      <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="4" />
      <circle cx="50" cy="50" r="8" fill={color} />
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1="50" y1="50"
          x2={50 + 41 * Math.cos((i * 15 * Math.PI) / 180)}
          y2={50 + 41 * Math.sin((i * 15 * Math.PI) / 180)}
          stroke={color} strokeWidth="2.5" />
      ))}
    </svg>
  );
}

function MandalaDecor({ size, style }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ ...style, pointerEvents: 'none' }}>
      {[0, 30, 60, 90, 120, 150].map(angle => (
        <g key={angle} transform={`rotate(${angle} ${r} ${r})`}>
          <ellipse cx={r} cy={r * 0.4} rx={r * 0.12} ry={r * 0.35} fill="none" stroke="#800020" strokeWidth="1" />
        </g>
      ))}
      {[0, 45, 90, 135].map(angle => (
        <g key={angle + 'sq'} transform={`rotate(${angle} ${r} ${r})`}>
          <rect x={r - r * 0.5} y={r - r * 0.5} width={r} height={r} fill="none" stroke="#D4AF37" strokeWidth="0.7" rx="4" />
        </g>
      ))}
      <circle cx={r} cy={r} r={r * 0.15} fill="none" stroke="#800020" strokeWidth="1.5" />
      <circle cx={r} cy={r} r={r * 0.05} fill="#D4AF37" />
    </svg>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #FFF8E7 0%, #FFF3D4 40%, #FFECD2 100%)',
  },
  blob1: {
    position: 'fixed', top: -120, left: -120,
    width: 400, height: 400, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,153,51,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'fixed', bottom: -100, right: '45%',
    width: 350, height: 350, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob3: {
    position: 'fixed', top: '30%', right: -80,
    width: 300, height: 300, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(128,0,32,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob4: {
    position: 'fixed', bottom: -80, left: '30%',
    width: 280, height: 280, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  brandPanel: {
    flex: 1,
    background: 'linear-gradient(160deg, #800020 0%, #6B0F2A 40%, #003844 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '48px 40px 0',
    position: 'relative',
    overflow: 'hidden',
    borderRight: '3px solid var(--gold)',
    minWidth: 0,
  },
  brandContent: { position: 'relative', zIndex: 1, color: '#fff' },
  brandLogo: {
    width: 88, height: 88, borderRadius: 22,
    background: 'rgba(255,255,255,0.08)',
    border: '2px solid var(--gold)',
    boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 28,
  },
  brandTitle: { fontSize: 46, fontWeight: 800, color: '#fff', marginBottom: 6, letterSpacing: '-0.5px' },
  brandTagline: { fontSize: 20, color: 'var(--gold)', fontWeight: 600, marginBottom: 18 },
  brandDesc: { fontSize: 15, color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 24, maxWidth: 340 },
  brandPersonas: { display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 },
  brandBadge: {
    background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.2)',
    color: '#fff', padding: '7px 14px', borderRadius: '99px', fontSize: 13, fontWeight: 600,
    backdropFilter: 'blur(4px)',
  },
  brandDivider: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 },
  dividerLine: { flex: 1, height: 1, background: 'rgba(212,175,55,0.35)' },
  dividerDot: { color: 'var(--gold)', fontSize: 12 },
  featureList: { display: 'flex', flexDirection: 'column', gap: 10 },
  featureItem: { fontSize: 13.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 },
  brandBottom: { paddingTop: 32 },
  tricolorStrip: { display: 'flex', height: 5, borderRadius: '3px 3px 0 0', overflow: 'hidden' },

  formPanel: {
    width: '100%', maxWidth: 540,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '40px 32px',
    position: 'relative',
    zIndex: 1,
  },
  backLink: {
    position: 'absolute', top: 24, left: 24,
    fontSize: 13, fontWeight: 600, color: 'var(--royal-maroon)', textDecoration: 'none',
  },
  formCard: {
    width: '100%', maxWidth: 440,
    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(20px)',
    borderRadius: 28,
    border: '1.5px solid rgba(212,175,55,0.3)',
    boxShadow: '0 20px 60px rgba(128,0,32,0.12), 0 0 0 1px rgba(212,175,55,0.1)',
    padding: '32px 28px 24px',
    position: 'relative',
  },
  formHeader: { marginBottom: 20, textAlign: 'center' },
  formTitle: { fontSize: 24, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 5 },
  formSubtitle: { fontSize: 13.5, color: 'var(--gray-500)' },

  tabSwitch: {
    display: 'flex', background: 'var(--gray-100)',
    borderRadius: '99px', padding: 4, marginBottom: 20,
  },
  tabBtn: {
    flex: 1, padding: '9px 0', border: 'none', borderRadius: '99px',
    fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
    background: 'transparent', color: 'var(--gray-500)', transition: 'all 0.2s',
  },
  tabActive: {
    background: '#fff', color: 'var(--royal-maroon)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderBottom: '2px solid var(--gold)',
  },

  /* Demo credentials box */
  demoBox: {
    background: 'linear-gradient(135deg, rgba(255,248,231,0.9), rgba(255,243,212,0.9))',
    border: '1.5px solid rgba(212,175,55,0.4)',
    borderRadius: 14, padding: '12px 14px', marginBottom: 18,
  },
  demoTitle: {
    fontSize: 12.5, fontWeight: 700, color: 'var(--royal-maroon)',
    marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5,
  },
  demoBolt: { fontSize: 14 },
  demoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 },
  demoBtn: {
    padding: '7px 10px', borderRadius: 9,
    border: '1.5px solid', background: '#fff',
    fontSize: 12, fontWeight: 700, cursor: 'pointer',
    transition: 'all 0.15s', textAlign: 'center',
  },
  demoHint: {
    fontSize: 11, color: 'var(--gray-500)', textAlign: 'center', lineHeight: 1.5,
  },

  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 12.5, fontWeight: 600, color: 'var(--gray-700)' },
  eyeBtn: {
    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, padding: 2,
  },
  submitBtn: {
    width: '100%', marginTop: 6, padding: '13px',
    fontSize: 15, fontWeight: 700, borderRadius: '99px',
  },
  spinner: {
    display: 'inline-block', width: 16, height: 16,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.7s linear infinite',
    flexShrink: 0,
  },
  terms: {
    marginTop: 16, fontSize: 11, color: 'var(--gray-400)',
    textAlign: 'center', lineHeight: 1.5,
  },
  trustRow: {
    display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap', justifyContent: 'center',
  },
  trustBadge: {
    fontSize: 11.5, fontWeight: 600, color: 'var(--gray-500)',
    background: 'rgba(255,255,255,0.7)', border: '1px solid var(--gray-200)',
    borderRadius: '99px', padding: '5px 12px',
    backdropFilter: 'blur(4px)',
  },
};
