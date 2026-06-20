// Voice AI Service with Speech-to-Text and Text-to-Speech
const voiceService = {
  // Text-to-Speech with multiple languages
  async speak(text, language = 'en', persona = 'default') {
    try {
      const voiceSettings = {
        en: { voice: 'Google UK English Female', rate: 0.9 },
        hi: { voice: 'Google हिन्दी Female', rate: 0.85 },
        ta: { voice: 'Google தமிழ் Female', rate: 0.85 },
        te: { voice: 'Google తెలుగు Female', rate: 0.85 },
      };

      const personaVoices = {
        amma: { pitch: 0.8, speed: 0.9 }, // Warm, slower
        business: { pitch: 1.0, speed: 1.0 }, // Professional, normal
        senior: { pitch: 0.7, speed: 0.7 }, // Low, very slow
        student: { pitch: 1.1, speed: 1.1 } // Higher, faster
      };

      const settings = voiceSettings[language] || voiceSettings.en;
      const personaSettings = personaVoices[persona] || personaVoices.default;

      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.language = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';
        utterance.rate = personaSettings.speed;
        utterance.pitch = personaSettings.pitch;
        utterance.volume = 1;

        return new Promise((resolve) => {
          utterance.onend = resolve;
          speechSynthesis.cancel();
          speechSynthesis.speak(utterance);
        });
      }
    } catch (error) {
      console.error('Text-to-Speech Error:', error);
    }
  },

  // Speech-to-Text
  async listen(language = 'en') {
    return new Promise((resolve, reject) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject('Speech Recognition not supported');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.language = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        console.log('🎤 Listening...');
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        resolve(transcript);
      };

      recognition.onerror = (event) => {
        reject(event.error);
      };

      recognition.start();
    });
  },

  // Get available voices
  getAvailableLanguages() {
    return [
      { code: 'en', name: 'English', flag: '🇬🇧' },
      { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
      { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
      { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
      { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
      { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' }
    ];
  },

  // Persona-based voice responses
  getPersonaResponse(persona, message) {
    const responses = {
      amma: {
        greeting: '🙏 नमस्ते बेटा/बेटी! मैं आपकी सहायता के लिए यहाँ हूँ।',
        goodbye: '👋 अलविदा! खुश रहो और ध्यान रखना।',
        error: '😔 क्षमा करें, कुछ समस्या हुई। फिर से कोशिश करें।'
      },
      business: {
        greeting: '👋 Welcome! How can I assist you with your business today?',
        goodbye: '✅ Great working with you! Goodbye!',
        error: '⚠️ Error encountered. Please try again.'
      },
      senior: {
        greeting: '👴 नमस्ते दादा जी/दादी जी! कैसे हो?',
        goodbye: '👋 अलविदा! भगवान तुम्हें सुख दे।',
        error: '😊 कोई बात नहीं, फिर से करते हैं।'
      },
      student: {
        greeting: '📚 Hey! Ready to ace your studies?',
        goodbye: '🎓 Keep learning! Good luck!',
        error: '💪 No worries, let\'s try again!'
      }
    };

    return responses[persona] || responses.default;
  }
};

export default voiceService;
