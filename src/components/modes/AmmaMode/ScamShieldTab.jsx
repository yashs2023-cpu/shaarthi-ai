import React, { useState } from 'react';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { FormInput } from '../../shared/FormInput';
import scamDetectionService from '../../../services/scamDetection';
import { useToast } from '../../../hooks/useToast';

export function ScamShieldTab() {
  const [messageType, setMessageType] = useState('sms');
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const { showToast } = useToast();

  const handleAnalyze = () => {
    if (!message) {
      showToast('⚠️', 'Please enter a message');
      return;
    }

    let result;
    switch (messageType) {
      case 'sms':
        result = scamDetectionService.analyzeSMS(message);
        break;
      case 'whatsapp':
        result = scamDetectionService.analyzeWhatsApp(message);
        break;
      case 'upi':
        result = scamDetectionService.analyzeUPITransaction(message);
        break;
      default:
        result = null;
    }

    setAnalysis(result);
    showToast('✅', `Analysis complete - Risk: ${result.riskLevel}`);
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'CRITICAL':
        return '#e11d48';
      case 'HIGH':
        return '#F4A300';
      case 'MEDIUM':
        return '#FFA500';
      default:
        return '#4CAF50';
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🛡️ Scam Shield - Protect Yourself</h3>

      <Card title="Analyze Message" style={{ marginBottom: '16px' }}>
        <div style={styles.typeSelector}>
          {['sms', 'whatsapp', 'upi'].map(type => (
            <button
              key={type}
              onClick={() => setMessageType(type)}
              style={{
                ...styles.typeBtn,
                background: messageType === type ? '#1a1a3e' : '#f0f0f0',
                color: messageType === type ? '#fff' : '#000',
              }}
            >
              {type === 'sms' ? '📱 SMS' : type === 'whatsapp' ? '💬 WhatsApp' : '💳 UPI'}
            </button>
          ))}
        </div>

        <FormInput
          label="Paste message to check"
          placeholder="Suspicious message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ marginTop: '12px', minHeight: '80px' }}
        />

        <Button
          onClick={handleAnalyze}
          style={{ marginTop: '12px', width: '100%' }}
        >
          🔍 Analyze Now
        </Button>
      </Card>

      {analysis && (
        <Card title="⚡ Analysis Results" style={styles.resultCard}>
          <div style={{ ...styles.riskIndicator, background: getRiskColor(analysis.riskLevel) }}>
            <div style={styles.riskLevel}>{analysis.riskLevel}</div>
            <div style={styles.riskScore}>{analysis.riskScore}% Risk</div>
          </div>

          <div style={styles.recommendation}>
            <strong>💡 Recommendation:</strong>
            <p>{analysis.recommendation}</p>
          </div>

          {analysis.detectedScams.length > 0 && (
            <div style={styles.detectedScams}>
              <strong>🚨 Detected Threats:</strong>
              {analysis.detectedScams.map((scam, i) => (
                <div key={i} style={styles.scamItem}>
                  <span>{scam.type.toUpperCase()}</span>
                  <span style={{ color: scam.risk === 'high' ? '#e11d48' : '#F4A300' }}>
                    {scam.risk}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      <Card title="📚 Safety Tips" style={{ marginTop: '16px' }}>
        {scamDetectionService.getScamTips(messageType).map((tip, i) => (
          <p key={i} style={styles.tip}>{tip}</p>
        ))}
      </Card>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '16px' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#e11d48', margin: 0 },
  typeSelector: { display: 'flex', gap: '8px', marginBottom: '12px' },
  typeBtn: { padding: '8px 14px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  resultCard: { background: '#fff9f9' },
  riskIndicator: { padding: '20px', borderRadius: '12px', color: '#fff', textAlign: 'center', marginBottom: '16px' },
  riskLevel: { fontSize: '20px', fontWeight: 'bold' },
  riskScore: { fontSize: '14px', opacity: 0.9 },
  recommendation: { padding: '12px', background: '#f0f0f0', borderRadius: '8px', marginBottom: '12px' },
  detectedScams: { margin: '12px 0' },
  scamItem: { display: 'flex', justifyContent: 'space-between', padding: '8px', background: '#f9f9f9', borderRadius: '6px', fontSize: '13px', marginTop: '6px' },
  tip: { fontSize: '13px', margin: '6px 0' },
};
