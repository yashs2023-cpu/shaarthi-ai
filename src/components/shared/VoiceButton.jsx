import React, { useState, useCallback } from 'react';

export default function VoiceButton({ size = 60, persona = 'default', onTranscript }) {
  const [listening, setListening] = useState(false);

  const handleClick = useCallback(async () => {
    if (listening) return;

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Try Chrome.');
      return;
    }

    setListening(true);
    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const text = Array.from(event.results).map(r => r[0].transcript).join('');
        if (onTranscript) onTranscript(text);
        setListening(false);
      };
      recognition.onerror = () => setListening(false);
      recognition.onend = () => setListening(false);
      recognition.start();
    } catch {
      setListening(false);
    }
  }, [listening, onTranscript]);

  return (
    <button
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: listening
          ? 'linear-gradient(135deg, #EF4444, #B91C1C)'
          : 'linear-gradient(135deg, #FF9933, #E07800)',
        border: 'none',
        color: '#fff',
        fontSize: size * 0.4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: listening
          ? '0 0 0 4px rgba(239,68,68,0.3)'
          : '0 4px 14px rgba(255,153,51,0.4)',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        position: 'relative',
      }}
      onClick={handleClick}
      aria-label={listening ? 'Listening…' : 'Talk to Saarthi'}
      title={listening ? 'Listening… (click to stop)' : 'Talk to Saarthi'}
    >
      {listening ? '🔴' : '🎤'}
    </button>
  );
}
