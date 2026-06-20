import SaarthiDB from './storage.js';
import authService from './auth.js';

const apiService = {
  async delay(ms = 1400) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  async generateRecipe(ingredients, language = 'en') {
    await this.delay();
    const recipe = {
      id: 'recipe_' + Date.now(),
      user_id: authService.getCurrentUserId(),
      recipe_name: `Special ${ingredients.split(',')[0]} Dish`,
      ingredients: ingredients.split(',').map(i => i.trim()),
      steps: [
        'Prepare all ingredients',
        'Heat oil/ghee in pan',
        'Add ingredients in order',
        'Cook until golden',
        'Serve hot with accompaniments',
      ],
      nutrition: {
        'Calories': Math.floor(Math.random() * 400) + 200,
        'Protein': Math.floor(Math.random() * 30) + 10,
        'Fat': Math.floor(Math.random() * 20) + 5,
        'Carbs': Math.floor(Math.random() * 60) + 20,
      },
      voice_msg: `Recipe prepared. Enjoy your ${ingredients} dish!`,
      cooking_time: `${Math.floor(Math.random() * 30) + 15} minutes`,
      difficulty: ['Easy', 'Medium', 'Hard'][Math.floor(Math.random() * 3)],
      created_at: new Date().toISOString(),
    };

    SaarthiDB.amma_recipe_history.push(recipe);
    SaarthiDB.save();
    SaarthiDB.logApi('POST', '/api/recipes/generate', { ingredients, language }, 200, recipe);
    return recipe;
  },

  async optimizeGrocery(items) {
    await this.delay();
    const optimization = {
      id: 'opt_' + Date.now(),
      total_cost: Math.floor(Math.random() * 2000) + 500,
      savings: Math.floor(Math.random() * 500) + 100,
      stores: ['Local Market', 'Supermarket', 'Online'],
      best_deals: items.map(item => ({
        item,
        regular_price: Math.floor(Math.random() * 100) + 20,
        discounted_price: Math.floor(Math.random() * 80) + 10,
      })),
      voice_msg: 'Grocery list optimized for best prices',
    };

    SaarthiDB.logApi('POST', '/api/grocery/optimize', { items }, 200, optimization);
    return optimization;
  },

  async createReminder(type, description, date) {
    await this.delay();
    const reminder = {
      id: 'reminder_' + Date.now(),
      user_id: authService.getCurrentUserId(),
      type,
      description,
      due_date: date,
      status: 'active',
      created_at: new Date().toISOString(),
    };

    SaarthiDB.family_reminders.push(reminder);
    SaarthiDB.save();
    SaarthiDB.logApi('POST', '/api/reminders/create', { type, description, date }, 201, reminder);
    return reminder;
  },

  async analyzeScam(imageData) {
    await this.delay();
    const analysis = {
      id: 'scam_' + Date.now(),
      fraud_score: Math.floor(Math.random() * 100),
      risk_level: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
      warnings: [
        'Check sender identity',
        'Verify through official channel',
        'Do not share personal details',
      ],
      voice_msg: 'Scam analysis complete. Stay cautious!',
    };

    SaarthiDB.scam_reports.push(analysis);
    SaarthiDB.save();
    SaarthiDB.logApi('POST', '/api/safety/analyze', { imageData }, 200, analysis);
    return analysis;
  },

  async generateMarketingCopy(product, audience) {
    await this.delay();
    const copy = {
      id: 'marketing_' + Date.now(),
      headline: `Exclusive ${product} offer for ${audience}!`,
      body: `Limited time only. Get up to 50% off on premium ${product}. Order now!`,
      cta: 'Shop Now',
      hashtags: ['#Shop', '#Deal', `#${product.replace(/\s/g, '')}`],
      voice_msg: 'Marketing copy generated',
    };

    SaarthiDB.marketing_campaigns.push(copy);
    SaarthiDB.save();
    SaarthiDB.logApi('POST', '/api/marketing/generate', { product, audience }, 200, copy);
    return copy;
  },

  async generateStudyNotes(topic, subject) {
    await this.delay();
    const notes = {
      id: 'study_' + Date.now(),
      topic,
      subject,
      headings: ['Introduction', 'Key Concepts', 'Examples', 'Summary'],
      content: `Comprehensive notes on ${topic} for ${subject}`,
      key_points: [
        `First key point about ${topic}`,
        `Second key point about ${topic}`,
        `Third key point about ${topic}`,
      ],
      practice_questions: 3,
      voice_msg: `Study notes prepared for ${topic}`,
    };

    SaarthiDB.study_materials.push(notes);
    SaarthiDB.save();
    SaarthiDB.logApi('POST', '/api/study/notes', { topic, subject }, 200, notes);
    return notes;
  },
};

export default apiService;
