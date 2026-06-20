// Scam Detection Engine
const scamPatterns = {
  sms: [
    { pattern: /verify.*account/i, risk: 'high', type: 'phishing' },
    { pattern: /click.*link.*urgent/i, risk: 'high', type: 'phishing' },
    { pattern: /confirm.*password|otp/i, risk: 'high', type: 'credential_theft' },
    { pattern: /congratulations.*won/i, risk: 'medium', type: 'lottery_scam' },
    { pattern: /update.*payment.*method/i, risk: 'high', type: 'fraud' },
  ],

  whatsapp: [
    { pattern: /job.*opportunity.*easy.*money/i, risk: 'high', type: 'employment_scam' },
    { pattern: /investment.*guaranteed.*returns/i, risk: 'high', type: 'investment_fraud' },
    { pattern: /loan.*approved.*instant/i, risk: 'medium', type: 'loan_scam' },
    { pattern: /free.*gift.*claim/i, risk: 'medium', type: 'giveaway_scam' },
  ],

  upi: [
    { pattern: /money.*pending.*confirm/i, risk: 'high', type: 'pending_transaction' },
    { pattern: /otp.*share|share.*otp/i, risk: 'high', type: 'otp_theft' },
    { pattern: /refund.*pending/i, risk: 'medium', type: 'refund_scam' },
  ],

  phishing: [
    { pattern: /bit\.ly|tinyurl|short\.link/i, risk: 'high', type: 'shortened_url' },
    { pattern: /verify.*details|confirm.*identity/i, risk: 'high', type: 'identity_theft' },
    { pattern: /unusual.*activity|suspicious.*login/i, risk: 'medium', type: 'security_alert' },
  ]
};

const scamDetectionService = {
  analyzeSMS(message) {
    let riskScore = 0;
    let detectedScams = [];

    for (const scam of scamPatterns.sms) {
      if (scam.pattern.test(message)) {
        const riskValue = scam.risk === 'high' ? 30 : scam.risk === 'medium' ? 15 : 5;
        riskScore += riskValue;
        detectedScams.push({
          type: scam.type,
          risk: scam.risk,
          description: `Detected ${scam.type.replace(/_/g, ' ')}`
        });
      }
    }

    return {
      message,
      riskScore: Math.min(100, riskScore),
      riskLevel: riskScore >= 50 ? 'CRITICAL' : riskScore >= 30 ? 'HIGH' : riskScore >= 15 ? 'MEDIUM' : 'LOW',
      detectedScams,
      recommendation: riskScore >= 50 ? 'DO NOT CLICK LINKS OR SHARE INFO' : riskScore >= 30 ? 'Be cautious' : 'Likely safe',
      timestamp: new Date().toISOString()
    };
  },

  analyzeWhatsApp(message) {
    let riskScore = 0;
    let detectedScams = [];

    for (const scam of scamPatterns.whatsapp) {
      if (scam.pattern.test(message)) {
        const riskValue = scam.risk === 'high' ? 30 : 15;
        riskScore += riskValue;
        detectedScams.push({
          type: scam.type,
          risk: scam.risk,
          description: `${scam.type.replace(/_/g, ' ')} detected`
        });
      }
    }

    return {
      platform: 'WhatsApp',
      message,
      riskScore: Math.min(100, riskScore),
      riskLevel: riskScore >= 50 ? 'CRITICAL' : riskScore >= 30 ? 'HIGH' : riskScore >= 15 ? 'MEDIUM' : 'LOW',
      detectedScams,
      recommendation: riskScore >= 50 ? 'LIKELY SCAM - Block sender' : 'Be cautious of requests for money',
      timestamp: new Date().toISOString()
    };
  },

  analyzeUPITransaction(message) {
    let riskScore = 0;
    let detectedScams = [];

    for (const scam of scamPatterns.upi) {
      if (scam.pattern.test(message)) {
        const riskValue = scam.risk === 'high' ? 40 : 20;
        riskScore += riskValue;
        detectedScams.push({
          type: scam.type,
          risk: scam.risk,
          description: `UPI ${scam.type.replace(/_/g, ' ')}`
        });
      }
    }

    return {
      type: 'UPI Fraud Detection',
      message,
      riskScore: Math.min(100, riskScore),
      riskLevel: riskScore >= 50 ? 'CRITICAL' : riskScore >= 30 ? 'HIGH' : 'LOW',
      detectedScams,
      recommendation: riskScore >= 50 ? 'NEVER share OTP or verify details' : 'Confirm with bank before acting',
      timestamp: new Date().toISOString()
    };
  },

  detectPhishingLink(url) {
    let riskScore = 0;
    const suspiciousIndicators = [];

    // Check for suspicious patterns
    if (/bit\.ly|tinyurl|short\.link|goo\.gl/.test(url)) {
      riskScore += 25;
      suspiciousIndicators.push('Shortened URL - hiding real destination');
    }

    if (/misspell.*banking|ban k|etc/.test(url)) {
      riskScore += 30;
      suspiciousIndicators.push('URL misspells legitimate domain');
    }

    if (!url.startsWith('https')) {
      riskScore += 20;
      suspiciousIndicators.push('Not HTTPS - unencrypted connection');
    }

    if (url.includes('@')) {
      riskScore += 25;
      suspiciousIndicators.push('@ symbol used for phishing');
    }

    return {
      url,
      riskScore: Math.min(100, riskScore),
      riskLevel: riskScore >= 50 ? 'DANGEROUS' : riskScore >= 25 ? 'SUSPICIOUS' : 'SAFE',
      suspiciousIndicators,
      recommendation: riskScore >= 50 ? 'DO NOT CLICK THIS LINK' : 'Verify with official website',
      timestamp: new Date().toISOString()
    };
  },

  getScamTips(category = 'general') {
    const tips = {
      general: [
        '🛡️ Never share OTP with anyone',
        '🔐 Banks never ask for passwords via SMS/email',
        '🚨 Verify unexpected messages with official channels',
        '⚠️ Too good to be true? Probably a scam',
        '📞 Call official number to verify'
      ],
      sms: [
        '✋ Urgent requests from banks = Red flag',
        '🔗 Don\'t click links in unsolicited SMS',
        '🏦 Contact bank using number on card',
        '⏰ Real banks give you time, scammers rush'
      ],
      upi: [
        '🔓 UPI is push-based, not pull-based',
        '⚠️ You are protected only if YOU pushed money',
        '🚫 Never approve transactions you didn\'t initiate',
        '📱 Scammers can access phone but not UPI PIN'
      ],
      whatsapp: [
        '⛔ Job offers with upfront fees = Scam',
        '💰 No investment guarantees returns',
        '🤖 Beware of fake WhatsApp from "relatives"',
        '🚪 Ask strange "relatives" security questions'
      ]
    };

    return tips[category] || tips.general;
  }
};

export default scamDetectionService;
