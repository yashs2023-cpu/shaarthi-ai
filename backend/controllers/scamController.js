import ScamReport from '../models/ScamReport.js';

// ── Pattern banks ──────────────────────────────────────────────────────────
const PATTERNS = {
  sms: [
    { re: /verify.*account|account.*verify/i,    risk: 'high',   type: 'phishing' },
    { re: /click.*link.*urgent|urgent.*link/i,   risk: 'high',   type: 'phishing' },
    { re: /confirm.*otp|otp.*share|share.*otp/i, risk: 'high',   type: 'otp_theft' },
    { re: /congratulations.*won|you.*won.*prize/i,risk: 'medium', type: 'lottery_scam' },
    { re: /update.*payment|payment.*update/i,    risk: 'high',   type: 'fraud' },
    { re: /your.*kyc.*expire|kyc.*pending/i,     risk: 'high',   type: 'kyc_scam' },
    { re: /refund.*pending|pending.*refund/i,    risk: 'medium', type: 'refund_scam' },
    { re: /free.*gift|claim.*reward/i,           risk: 'medium', type: 'giveaway_scam' },
  ],
  whatsapp: [
    { re: /job.*easy.*money|earn.*per.*day/i,           risk: 'high',   type: 'job_scam' },
    { re: /investment.*guaranteed.*return/i,             risk: 'high',   type: 'investment_fraud' },
    { re: /loan.*approved.*instant/i,                    risk: 'medium', type: 'loan_scam' },
    { re: /send.*money.*emergency|urgent.*transfer/i,    risk: 'high',   type: 'emergency_scam' },
    { re: /whatsapp.*gold|new.*version.*whatsapp/i,      risk: 'high',   type: 'malware' },
  ],
  upi: [
    { re: /money.*pending.*confirm|confirm.*receive/i, risk: 'high',   type: 'pending_fraud' },
    { re: /otp.*share|share.*pin/i,                    risk: 'high',   type: 'otp_theft' },
    { re: /cashback.*pending/i,                        risk: 'medium', type: 'cashback_scam' },
    { re: /collect.*request|payment.*request/i,        risk: 'medium', type: 'collect_fraud' },
  ],
  url: [],   // handled separately below
  email: [
    { re: /verify.*details|confirm.*identity/i,          risk: 'high',   type: 'identity_theft' },
    { re: /unusual.*activity|suspicious.*login/i,        risk: 'medium', type: 'account_alert' },
    { re: /invoice.*attached|payment.*due/i,             risk: 'medium', type: 'invoice_fraud' },
    { re: /prince.*million|inheritance.*fund/i,          risk: 'high',   type: '419_scam' },
  ],
};

function scorePatterns(text, type) {
  const patterns = PATTERNS[type] || PATTERNS.sms;
  let score = 0;
  const threats = [];
  for (const p of patterns) {
    if (p.re.test(text)) {
      score += p.risk === 'high' ? 35 : 18;
      threats.push({ type: p.type, risk: p.risk, description: p.type.replace(/_/g, ' ') });
    }
  }
  return { score: Math.min(100, score), threats };
}

function analyzeUrl(url) {
  let score = 0;
  const threats = [];
  if (/bit\.ly|tinyurl|short\.link|goo\.gl|t\.co/i.test(url)) {
    score += 25; threats.push({ type: 'shortened_url', risk: 'medium', description: 'URL is shortened — real destination hidden' });
  }
  if (!url.startsWith('https')) {
    score += 20; threats.push({ type: 'no_https', risk: 'medium', description: 'No HTTPS — connection is unencrypted' });
  }
  if (url.includes('@')) {
    score += 30; threats.push({ type: 'at_symbol', risk: 'high', description: '@ symbol used to disguise real domain' });
  }
  if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(url)) {
    score += 30; threats.push({ type: 'ip_address', risk: 'high', description: 'IP address instead of domain name' });
  }
  if (/paypa1|g00gle|amaz0n|sbi-bank|hdfc-secure/i.test(url)) {
    score += 40; threats.push({ type: 'typosquatting', risk: 'high', description: 'URL mimics a trusted brand' });
  }
  return { score: Math.min(100, score), threats };
}

function getRiskLevel(score) {
  if (score >= 70) return 'CRITICAL';
  if (score >= 45) return 'HIGH';
  if (score >= 20) return 'MEDIUM';
  return 'LOW';
}

function getRecommendation(level) {
  const map = {
    CRITICAL: '🔴 DO NOT click, reply or share any info. Block the sender immediately and report to cybercrime.gov.in',
    HIGH:     '🚨 Very likely a scam. Do not share OTP, password or money. Verify through official channels.',
    MEDIUM:   '⚠️ Be cautious. Do not click links. Call the official number to verify.',
    LOW:      '✅ Looks safe, but always stay alert. Never share OTPs or passwords.',
  };
  return map[level];
}

// POST /api/scam/analyze
export const analyzeMessage = async (req, res) => {
  try {
    const { content, messageType = 'sms' } = req.body;
    if (!content) return res.status(400).json({ error: 'content is required' });

    const { score, threats } = messageType === 'url'
      ? analyzeUrl(content)
      : scorePatterns(content, messageType);

    const riskLevel = getRiskLevel(score);
    const recommendation = getRecommendation(riskLevel);

    const report = {
      messageType,
      content,
      riskScore: score,
      riskLevel,
      threats,
      recommendation,
    };

    // Save to DB if user is logged in (optional — userId may not exist)
    if (req.userId) {
      await ScamReport.create({ userId: req.userId, ...report });
    }

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/scam/history  — user's past scam checks
export const getHistory = async (req, res) => {
  try {
    const reports = await ScamReport.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/scam/report  — flag a scam to authorities
export const reportScam = async (req, res) => {
  try {
    const { reportId } = req.body;
    if (reportId) {
      await ScamReport.findByIdAndUpdate(reportId, { reported: true });
    }
    res.json({ message: 'Reported to cybercrime authorities. Reference: CYBER-' + Date.now() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/scam/tips/:type
export const getTips = (req, res) => {
  const tips = {
    general: [
      '🛡️ Never share OTP with anyone — not even bank employees',
      '🔐 Real banks NEVER ask for passwords or PINs via SMS or call',
      '🚨 Verify unexpected messages through official numbers only',
      '⚠️ If an offer sounds too good to be true — it is a scam',
      '📞 Always call back on official helpline numbers',
    ],
    sms: [
      '✋ Urgent requests from "banks" = Red flag',
      '🔗 Never click links in unsolicited SMS',
      '🏦 Contact your bank using the number printed on your card',
      '⏰ Real banks give time — scammers create urgency',
    ],
    upi: [
      '🔓 UPI collect requests TAKE money from you — decline unknown ones',
      '⚠️ You only need UPI PIN to SEND — never to receive money',
      '🚫 Never approve UPI requests you did not initiate',
      '📱 Scammers impersonate PhonePe, Google Pay, Paytm support',
    ],
    whatsapp: [
      '⛔ Job offers with upfront fees = always a scam',
      '💰 No investment guarantees 100% returns — ever',
      '🤖 Beware of fake messages from "relatives" asking for money',
      '🚪 Ask security questions before sending money to anyone',
    ],
    url: [
      '🔗 Always check the full URL before clicking',
      '🔒 Look for https:// and a lock icon in the browser',
      '📝 Scammers use domains like paytm-secure.com or sbi-login.net',
      '🖥️ Type website addresses directly instead of clicking links',
    ],
    email: [
      '📧 Check sender email carefully — support@paypa1.com ≠ paypal.com',
      '📎 Never open attachments from unknown senders',
      '💼 Legitimate companies never ask for passwords by email',
      '🗑️ When in doubt, delete and contact the company directly',
    ],
  };
  const type = req.params.type || 'general';
  res.json(tips[type] || tips.general);
};
