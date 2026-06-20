import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../../../hooks/useToast';

export default function StudentStudy() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('work'); // work | break
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);
  const { showToast } = useToast();

  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('');
  const [classLevel, setClassLevel] = useState('Class 9');
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s === 0) {
            setMinutes(m => {
              if (m === 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                if (mode === 'work') {
                  setSessions(prev => prev + 1);
                  showToast('Pomodoro complete! Take a 5-min break 🎉', 'success');
                  setMode('break');
                  return 5;
                } else {
                  showToast('Break over! Time to focus 📚', 'info');
                  setMode('work');
                  return 25;
                }
              }
              return m - 1;
            });
            return 59;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, showToast]);

  const reset = () => {
    setIsRunning(false);
    setMode('work');
    setMinutes(25);
    setSeconds(0);
  };

  const pad = n => String(n).padStart(2, '0');

  const handleGenerateNotes = () => {
    if (!topic.trim()) {
      showToast('Please enter a topic to generate notes', 'warning');
      return;
    }
    setNotes({
      topic: topic.trim(),
      subject: subject.trim() || 'General',
      classLevel,
      headings: ['Introduction', 'Key Concepts', 'Examples', 'Summary'],
      keyPoints: [
        `Understand the core definition of ${topic.trim()}.`,
        `Learn how ${topic.trim()} connects to other topics in ${subject.trim() || 'this subject'}.`,
        `Practice solved examples to reinforce the concept.`,
        `Revise using active recall instead of re-reading.`,
      ],
      tip: 'Use the Pomodoro timer above — 25 min focused study, 5 min break — while going through these notes.',
    });
    showToast('Study notes generated! 📝', 'success');
  };

  const progress = mode === 'work'
    ? ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100
    : ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100;

  const accentColor = mode === 'work' ? 'var(--student-primary)' : 'var(--success)';

  return (
    <div style={styles.page}>
      <div>
        <h1 style={styles.title}>Study Planner 📚</h1>
        <p style={styles.subtitle}>Pomodoro timer + note generator to maximise your focus</p>
      </div>

      {/* Pomodoro Timer */}
      <div className="saarthi-card" style={{ textAlign: 'center', maxWidth: 420, margin: '0 auto', width: '100%' }}>
        <div style={styles.modeSwitch}>
          <button
            style={{ ...styles.modeBtn, background: mode === 'work' ? 'var(--student-primary)' : 'transparent', color: mode === 'work' ? '#fff' : 'var(--gray-500)' }}
            onClick={() => { reset(); setMode('work'); }}
          >
            📖 Focus
          </button>
          <button
            style={{ ...styles.modeBtn, background: mode === 'break' ? 'var(--success)' : 'transparent', color: mode === 'break' ? '#fff' : 'var(--gray-500)' }}
            onClick={() => { setIsRunning(false); setMode('break'); setMinutes(5); setSeconds(0); }}
          >
            ☕ Break
          </button>
        </div>

        {/* Circular progress */}
        <div style={styles.timerCircle}>
          <svg width="200" height="200" style={styles.timerSVG}>
            <circle cx="100" cy="100" r="88" stroke="var(--gray-100)" strokeWidth="10" fill="none" />
            <circle
              cx="100" cy="100" r="88"
              stroke={accentColor}
              strokeWidth="10" fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              transform="rotate(-90 100 100)"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div style={styles.timerInner}>
            <div style={{ ...styles.timerDisplay, color: accentColor }}>
              {pad(minutes)}:{pad(seconds)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', textTransform: 'uppercase', fontWeight: 600 }}>
              {mode === 'work' ? 'Focus Time' : 'Break Time'}
            </div>
          </div>
        </div>

        <div style={styles.timerControls}>
          <button
            className="btn"
            style={{ flex: 1, background: accentColor, color: '#fff', borderRadius: 'var(--r-full)' }}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸ Pause' : '▶ Start'}
          </button>
          <button className="btn btn-ghost" style={{ borderRadius: 'var(--r-full)' }} onClick={reset}>
            🔄 Reset
          </button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--gray-400)', marginTop: 12 }}>
          Sessions completed today: <strong style={{ color: 'var(--student-primary)' }}>{sessions}</strong>
        </p>
      </div>

      {/* Notes generator */}
      <div className="saarthi-card">
        <h3 style={styles.cardTitle}>📝 AI Notes Generator</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>
          Enter a topic and get structured study notes instantly
        </p>
        <div style={styles.form}>
          <div style={styles.twoCol}>
            <div style={styles.field}>
              <label style={styles.label}>Topic / Chapter</label>
              <input className="saarthi-input" placeholder="e.g., Photosynthesis" value={topic} onChange={e => setTopic(e.target.value)} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Subject</label>
              <input className="saarthi-input" placeholder="e.g., Biology, Maths" value={subject} onChange={e => setSubject(e.target.value)} />
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Class / Level</label>
            <select className="saarthi-input" value={classLevel} onChange={e => setClassLevel(e.target.value)}>
              {['Class 9', 'Class 10', 'Class 11', 'Class 12', 'Undergraduate', 'Competitive Exam'].map(l => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} onClick={handleGenerateNotes}>
            🤖 Generate Notes
          </button>
        </div>

        {notes && (
          <div style={styles.notesPanel}>
            <div style={styles.notesHeader}>
              <strong>{notes.topic}</strong>
              <span style={styles.notesMeta}>{notes.subject} · {notes.classLevel}</span>
            </div>
            <div style={styles.notesHeadings}>
              {notes.headings.map(h => <span key={h} style={styles.notesHeadingTag}>{h}</span>)}
            </div>
            <ul style={styles.notesList}>
              {notes.keyPoints.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <div style={styles.notesTip}>💡 {notes.tip}</div>
          </div>
        )}
      </div>

      {/* Study tips */}
      <div className="saarthi-card" style={{ background: 'linear-gradient(135deg, #F5F3FF, #EDE9FE)' }}>
        <h3 style={styles.cardTitle}>⚡ Power Study Techniques</h3>
        <div style={styles.tipGrid}>
          {[
            { icon: '🔁', title: 'Spaced Repetition', desc: 'Review notes at increasing intervals (1 day, 3 days, 1 week)' },
            { icon: '🧠', title: 'Active Recall', desc: 'Test yourself instead of re-reading — 3× more effective' },
            { icon: '🗺️', title: 'Mind Mapping', desc: 'Connect concepts visually to understand relationships' },
            { icon: '🏫', title: 'Feynman Technique', desc: 'Explain concepts simply as if teaching a 10-year-old' },
          ].map(t => (
            <div key={t.title} style={styles.tipCard}>
              <span style={{ fontSize: 24 }}>{t.icon}</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 3 }}>{t.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--gray-600)', lineHeight: 1.5 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', flexDirection: 'column', gap: 24 },
  title: { fontSize: 22, fontWeight: 800, color: 'var(--navy-deep)', marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'var(--gray-500)' },
  cardTitle: { fontSize: 17, fontWeight: 700, color: 'var(--navy-deep)', marginBottom: 4 },
  modeSwitch: {
    display: 'flex', gap: 0,
    background: 'var(--gray-100)', borderRadius: 'var(--r-full)',
    padding: 4, margin: '0 auto 20px', width: 'fit-content',
  },
  modeBtn: {
    padding: '8px 20px', borderRadius: 'var(--r-full)',
    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
    transition: 'var(--t-fast)',
  },
  timerCircle: { position: 'relative', width: 200, height: 200, margin: '0 auto 20px' },
  timerSVG: { position: 'absolute', top: 0, left: 0 },
  timerInner: {
    position: 'absolute', inset: 0,
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
  },
  timerDisplay: { fontSize: 42, fontWeight: 800, lineHeight: 1 },
  timerControls: { display: 'flex', gap: 10, justifyContent: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  twoCol: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 13, fontWeight: 600, color: 'var(--gray-700)' },
  tipGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginTop: 14 },
  tipCard: {
    display: 'flex', gap: 12, alignItems: 'flex-start',
    padding: 14, background: 'rgba(255,255,255,0.7)', borderRadius: 'var(--r-md)',
  },
  notesPanel: {
    marginTop: 18, padding: 18, background: 'var(--gray-50)',
    borderRadius: 'var(--r-md)', border: '1px solid var(--gray-200)',
  },
  notesHeader: { display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10, flexWrap: 'wrap' },
  notesMeta: { fontSize: 12, color: 'var(--gray-500)' },
  notesHeadings: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  notesHeadingTag: {
    fontSize: 11, fontWeight: 600, color: 'var(--student-primary)',
    background: 'rgba(108,99,255,0.1)', padding: '3px 10px', borderRadius: 'var(--r-full)',
  },
  notesList: { margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13.5, color: 'var(--gray-700)', lineHeight: 1.6 },
  notesTip: { marginTop: 14, fontSize: 13, color: 'var(--gray-600)', fontStyle: 'italic' },
};
