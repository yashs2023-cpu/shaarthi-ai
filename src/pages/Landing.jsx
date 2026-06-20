import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PERSONAS = [
  { key: 'amma',     avatar: '👩‍🍳', name: 'Amma Saarthi',     desc: 'Caring like family, guiding every day',  color: '#FF9933', bg: '#FFF8E7' },
  { key: 'student',  avatar: '👨‍🎓', name: 'Student Saarthi',   desc: 'Your AI buddy for learning & success',    color: '#6C63FF', bg: '#F5F3FF' },
  { key: 'senior',   avatar: '👴',   name: 'Senior Saarthi',    desc: 'Safe, simple & caring digital life',      color: '#0EA5E9', bg: '#F0F9FF' },
  { key: 'business', avatar: '👨‍💼', name: 'Business Saarthi',  desc: 'Smart growth for Indian entrepreneurs',   color: '#1B365D', bg: '#F0F4F8' },
];

const PROBLEMS = [
  { icon: '🎭', title: 'Digital Scams',      desc: 'Millions fall victim to UPI fraud, phishing & fake calls every year' },
  { icon: '📱', title: 'Digital Literacy',   desc: 'Complex technology leaves millions confused and left behind' },
  { icon: '🎓', title: 'Career Confusion',   desc: 'Students struggle to find the right path without guidance' },
  { icon: '🏛️', title: 'Scheme Awareness',  desc: 'Eligible citizens miss out on lakhs of rupees in government benefits' },
];

const FEATURES = [
  { icon: '🤖', title: 'AI Assistant',       desc: 'Gemini-powered responses in your language and context',   color: '#FF9933' },
  { icon: '🛡️', title: 'Scam Shield',        desc: 'Real-time SMS, WhatsApp & URL analysis',                  color: '#EF4444' },
  { icon: '🏛️', title: 'Government Schemes', desc: 'Discover and apply for benefits you deserve',              color: '#10B981' },
  { icon: '📚', title: 'Learning Hub',        desc: 'Personalized study plans and career guidance',             color: '#6C63FF' },
  { icon: '🎤', title: 'Voice Support',       desc: 'Talk naturally in Hindi, Tamil, Telugu & more',           color: '#0EA5E9' },
  { icon: '🌐', title: 'Works Offline',       desc: 'Core features work even with limited connectivity',       color: '#D4AF37' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (isAuthenticated) navigate('/choose');
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated, navigate]);

  return (
    <div style={styles.page}>
      {/* ── Navbar ── */}
      <nav style={{
        ...styles.navbar,
        background: scrollY > 40 ? 'rgba(255,248,231,0.95)' : 'transparent',
        boxShadow: scrollY > 40 ? 'var(--shadow-sm)' : 'none',
        backdropFilter: scrollY > 40 ? 'blur(12px)' : 'none',
      }}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>
            <span style={styles.brandDot}>स</span>
            <span style={styles.brandText}>Saarthi AI</span>
          </div>
          <div style={styles.navActions}>
            <button style={styles.navLogin} onClick={() => navigate('/login')}>Login</button>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>
              Get Started →
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={styles.hero}>
        <div style={styles.heroCircle1} />
        <div style={styles.heroCircle2} />
        <div style={styles.heroCircle3} />

        <div style={styles.heroContent} className="anim-up">
          <div className="badge badge-saffron" style={{ fontSize: 13, marginBottom: 20, display: 'inline-flex' }}>
            🇮🇳 Made for Bharat
          </div>
          <h1 style={styles.heroTitle}>
            नमस्ते 🙏<br />
            <span className="gradient-saffron">Your AI Saarthi</span>
            <br />is here
          </h1>
          <p style={styles.heroDesc}>
            India's first multi-persona AI companion — for students, families,
            seniors and entrepreneurs. Powered by Gemini. Built with love for Bharat.
          </p>
          <div style={styles.heroCTAs}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
              Choose Your Saarthi 🚀
            </button>
            <button
              className="btn btn-outline btn-lg"
              style={{ color: 'var(--navy)', borderColor: 'var(--navy)' }}
              onClick={() => document.getElementById('personas')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See All Personas
            </button>
          </div>
          <div style={styles.heroStats}>
            {[['4', 'AI Personas'], ['20+', 'Features'], ['6', 'Languages'], ['100%', 'Free']].map(([num, label]) => (
              <div key={label} style={styles.heroStat}>
                <div style={styles.heroStatNum}>{num}</div>
                <div style={styles.heroStatLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.heroVisual} className="anim-right">
          <div style={styles.heroCard}>
            <div style={styles.heroCardHeader}>
              <div style={styles.heroCardAvatar}>👩‍🍳</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Amma Saarthi</div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)' }}>Online · Ready to help</div>
              </div>
              <div style={styles.onlineDot} />
            </div>
            <div style={styles.heroChatBubble}>
              🙏 Namaste! Today there's a new government scheme for you — PM-Kisan ₹2,000 installment is ready!
            </div>
            <div style={styles.heroChatBubbleUser}>How do I check my status?</div>
            <div style={styles.heroChatBubble}>
              Easy! Go to pmkisan.gov.in → Beneficiary Status → Enter Aadhaar 📱
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Section ── */}
      <section style={styles.problemSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div className="badge badge-danger" style={{ fontSize: 13, marginBottom: 12, display: 'inline-flex' }}>The Challenge</div>
            <h2 style={styles.sectionTitle}>India's Digital Divide is Real</h2>
            <p style={styles.sectionDesc}>Millions of Indians face these challenges every single day</p>
          </div>
          <div style={styles.problemGrid}>
            {PROBLEMS.map((p, i) => (
              <div key={p.title} className={`saarthi-card anim-up anim-delay-${i + 1}`} style={styles.problemCard}>
                <div style={styles.problemIcon}>{p.icon}</div>
                <h3 style={styles.problemTitle}>{p.title}</h3>
                <p style={styles.problemDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Persona Showcase ── */}
      <section id="personas" style={styles.personaSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div className="badge badge-saffron" style={{ fontSize: 13, marginBottom: 12, display: 'inline-flex' }}>Meet Your Saarthi</div>
            <h2 style={styles.sectionTitle}>Choose Your AI Companion</h2>
            <p style={styles.sectionDesc}>Each Saarthi is trained specifically for your needs</p>
          </div>
          <div style={styles.personaGrid}>
            {PERSONAS.map((p, i) => (
              <div
                key={p.key}
                className={`saarthi-card anim-up anim-delay-${i + 1}`}
                style={{ ...styles.personaCard, borderTop: `4px solid ${p.color}` }}
                onClick={() => navigate('/login')}
              >
                <div style={{ ...styles.personaCardAvatar, background: p.bg, color: p.color }}>
                  {p.avatar}
                </div>
                <h3 style={{ ...styles.personaCardName, color: p.color }}>{p.name}</h3>
                <p style={styles.personaCardDesc}>{p.desc}</p>
                <button
                  className="btn btn-sm"
                  style={{ marginTop: 16, background: p.color, color: '#fff', borderRadius: 'var(--r-full)' }}
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={styles.featuresSection}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div className="badge badge-gold" style={{ fontSize: 13, marginBottom: 12, display: 'inline-flex' }}>Features</div>
            <h2 style={styles.sectionTitle}>Everything You Need</h2>
            <p style={styles.sectionDesc}>Powerful AI tools designed for real Indian needs</p>
          </div>
          <div style={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`saarthi-card anim-up anim-delay-${(i % 3) + 1}`} style={styles.featureCard}>
                <div style={{ ...styles.featureIcon, background: f.color + '18', color: f.color }}>{f.icon}</div>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>आपका Saarthi इंतज़ार कर रहा है</h2>
          <p style={styles.ctaDesc}>Join millions of Indians who trust Saarthi for their digital journey</p>
          <button className="btn btn-gold btn-lg" onClick={() => navigate('/login')}>
            🚀 Start for Free — No signup fees
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <span style={{ ...styles.brandDot, width: 28, height: 28, fontSize: 14 }}>स</span>
            <span style={{ fontWeight: 700, color: '#fff', fontSize: 16 }}>Saarthi AI</span>
          </div>
          <p style={styles.footerTagline}>आपका डिजिटल साथी — Guiding India into the Digital Future</p>
          <p style={styles.footerCopy}>Built with ❤️ for Bharat · © 2025 Saarthi AI</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: { background: 'var(--ivory)', minHeight: '100vh' },
  navbar: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200, transition: 'all 0.3s ease', padding: '0 24px' },
  navInner: { maxWidth: 1280, margin: '0 auto', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  navBrand: { display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
  brandDot: { width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16 },
  brandText: { fontSize: 18, fontWeight: 800, color: 'var(--navy-deep)' },
  navActions: { display: 'flex', alignItems: 'center', gap: 12 },
  navLogin: { background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: 'var(--navy)', padding: '8px 16px' },
  hero: { minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 24px 60px', maxWidth: 1280, margin: '0 auto', gap: 48, position: 'relative', overflow: 'hidden' },
  heroCircle1: { position: 'absolute', top: 80, right: 120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,153,51,0.06)', zIndex: 0 },
  heroCircle2: { position: 'absolute', bottom: 60, right: 60, width: 250, height: 250, borderRadius: '50%', background: 'rgba(212,175,55,0.08)', zIndex: 0 },
  heroCircle3: { position: 'absolute', top: 200, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(27,54,93,0.04)', zIndex: 0 },
  heroContent: { flex: 1, maxWidth: 580, position: 'relative', zIndex: 1 },
  heroTitle: { fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, color: 'var(--navy-deep)', marginBottom: 20 },
  heroDesc: { fontSize: 18, color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: 32, maxWidth: 480 },
  heroCTAs: { display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 40 },
  heroStats: { display: 'flex', gap: 32, flexWrap: 'wrap' },
  heroStat: { textAlign: 'center' },
  heroStatNum: { fontSize: 28, fontWeight: 800, color: 'var(--saffron)' },
  heroStatLabel: { fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase' },
  heroVisual: { flex: 1, maxWidth: 400, position: 'relative', zIndex: 1 },
  heroCard: { background: '#fff', borderRadius: 'var(--r-2xl)', padding: 24, boxShadow: 'var(--shadow-xl)', border: '1px solid var(--gray-100)' },
  heroCardHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, position: 'relative' },
  heroCardAvatar: { width: 40, height: 40, borderRadius: 12, background: 'var(--amma-bg)', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  onlineDot: { width: 8, height: 8, borderRadius: '50%', background: 'var(--success)', position: 'absolute', top: 2, right: 2 },
  heroChatBubble: { background: 'var(--gray-50)', borderRadius: '16px 16px 16px 4px', padding: '12px 14px', fontSize: 13, lineHeight: 1.5, marginBottom: 8, color: 'var(--gray-700)', border: '1px solid var(--gray-200)' },
  heroChatBubbleUser: { background: 'linear-gradient(135deg, var(--saffron), var(--saffron-dark))', borderRadius: '16px 16px 4px 16px', padding: '12px 14px', fontSize: 13, color: '#fff', lineHeight: 1.5, marginBottom: 8, textAlign: 'right' },
  container: { maxWidth: 1280, margin: '0 auto', padding: '0 24px' },
  sectionHeader: { textAlign: 'center', marginBottom: 56 },
  sectionTitle: { fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 12 },
  sectionDesc: { fontSize: 16, color: 'var(--gray-500)', maxWidth: 480, margin: '0 auto' },
  problemSection: { padding: '80px 0', background: '#fff' },
  problemGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 },
  problemCard: { textAlign: 'center', cursor: 'default' },
  problemIcon: { fontSize: 40, marginBottom: 12 },
  problemTitle: { fontSize: 18, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 8 },
  problemDesc: { fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 },
  personaSection: { padding: '80px 0', background: 'var(--ivory)' },
  personaGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 },
  personaCard: { cursor: 'pointer', textAlign: 'center', transition: 'var(--t-normal)' },
  personaCardAvatar: { width: 80, height: 80, borderRadius: 20, fontSize: 36, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  personaCardName: { fontSize: 18, fontWeight: 700, marginBottom: 8 },
  personaCardDesc: { fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 },
  featuresSection: { padding: '80px 0', background: '#fff' },
  featuresGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 },
  featureCard: { cursor: 'default' },
  featureIcon: { width: 52, height: 52, borderRadius: 14, fontSize: 24, marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  featureTitle: { fontSize: 16, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 8 },
  featureDesc: { fontSize: 14, color: 'var(--gray-500)', lineHeight: 1.6 },
  ctaSection: { padding: '80px 24px', background: 'linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 100%)', textAlign: 'center' },
  ctaContent: { maxWidth: 600, margin: '0 auto' },
  ctaTitle: { fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff', marginBottom: 16 },
  ctaDesc: { fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 32 },
  footer: { background: 'var(--navy-deep)', padding: '40px 24px', borderTop: '1px solid rgba(255,255,255,0.08)' },
  footerInner: { maxWidth: 600, margin: '0 auto', textAlign: 'center' },
  footerBrand: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 },
  footerTagline: { fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  footerCopy: { fontSize: 12, color: 'rgba(255,255,255,0.35)' },
};
