import React, { useState } from 'react';
import { FormInput } from '../../shared/FormInput';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import { useToast } from '../../../hooks/useToast';

export function RecipeTab() {
  const [selectedCuisine, setSelectedCuisine] = useState('north-indian');
  const [cookingTime, setCookingTime] = useState('30');
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Aloo Gobi Masala',
      cuisine: 'north-indian',
      time: '25 mins',
      difficulty: 'Easy',
      servings: '4',
      ingredients: ['Potatoes', 'Cauliflower', 'Onions', 'Tomatoes', 'Spices'],
      steps: [
        '1. Heat oil and add cumin seeds',
        '2. Add onions and cook until golden',
        '3. Add tomatoes and spices',
        '4. Add vegetables and cook',
        '5. Cover and simmer for 15 minutes',
      ],
      nutrition: { calories: '120/serving', protein: '4g', fat: '6g', carbs: '15g' },
      tips: 'Use fresh vegetables for best taste. Can add paneer for protein.',
    },
    {
      id: 2,
      name: 'Dahi Bhat',
      cuisine: 'south-indian',
      time: '15 mins',
      difficulty: 'Easy',
      servings: '2',
      ingredients: ['Rice', 'Yogurt', 'Cucumber', 'Carrots', 'Mustard seeds'],
      steps: [
        '1. Cook rice and let it cool',
        '2. Mix with yogurt',
        '3. Temper mustard seeds in oil',
        '4. Mix in vegetables',
        '5. Season and serve chilled',
      ],
      nutrition: { calories: '150/serving', protein: '5g', fat: '3g', carbs: '28g' },
      tips: 'Perfect for summers. Add salt to taste.',
    },
  ]);

  const { showToast } = useToast();

  const cuisines = [
    { key: 'north-indian', label: '🥘 North Indian' },
    { key: 'south-indian', label: '🍛 South Indian' },
    { key: 'gujarati', label: '🥗 Gujarati' },
    { key: 'bengali', label: '🐟 Bengali' },
  ];

  const filteredRecipes = recipes.filter(r => r.cuisine === selectedCuisine);

  return (
    <div style={styles.container}>
      <div style={styles.filters}>
        <div style={styles.cuisineButtons}>
          {cuisines.map(cuisine => (
            <button
              key={cuisine.key}
              onClick={() => setSelectedCuisine(cuisine.key)}
              style={{
                ...styles.cuisineBtn,
                background: selectedCuisine === cuisine.key ? '#F4A300' : '#f0f0f0',
                color: selectedCuisine === cuisine.key ? '#fff' : '#000',
              }}
            >
              {cuisine.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.recipesList}>
        {filteredRecipes.map(recipe => (
          <Card key={recipe.id} style={styles.recipeCard}>
            <div style={styles.recipeHeader}>
              <h4 style={styles.recipeName}>{recipe.name}</h4>
              <div style={styles.badges}>
                <span style={styles.badge}>⏱️ {recipe.time}</span>
                <span style={styles.badge}>👥 {recipe.servings}</span>
              </div>
            </div>

            <div style={styles.ingredients}>
              <h5 style={styles.sectionTitle}>🛒 Ingredients</h5>
              <ul style={styles.ingredientList}>
                {recipe.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div style={styles.steps}>
              <h5 style={styles.sectionTitle}>👨‍🍳 Cooking Steps</h5>
              <ol style={styles.stepsList}>
                {recipe.steps.map((step, i) => (
                  <li key={i} style={styles.step}>{step}</li>
                ))}
              </ol>
            </div>

            <div style={styles.nutrition}>
              <h5 style={styles.sectionTitle}>💪 Nutrition (per serving)</h5>
              <div style={styles.nutritionGrid}>
                <div>Calories: {recipe.nutrition.calories}</div>
                <div>Protein: {recipe.nutrition.protein}</div>
                <div>Fat: {recipe.nutrition.fat}</div>
                <div>Carbs: {recipe.nutrition.carbs}</div>
              </div>
            </div>

            <p style={styles.tip}>💡 <strong>Tip:</strong> {recipe.tips}</p>

            <div style={styles.actions}>
              <Button onClick={() => showToast('🎤', 'Listen to recipe...')}>
                🔊 Listen Recipe
              </Button>
              <Button onClick={() => showToast('✅', 'Added to favorites!')}>
                ❤️ Save Recipe
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '16px' },
  filters: { marginBottom: '8px' },
  cuisineButtons: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  cuisineBtn: { padding: '8px 14px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
  recipesList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  recipeCard: { cursor: 'pointer' },
  recipeHeader: { marginBottom: '12px' },
  recipeName: { fontSize: '18px', fontWeight: 'bold', color: '#1a1a3e', margin: '0 0 8px 0' },
  badges: { display: 'flex', gap: '8px' },
  badge: { fontSize: '12px', background: '#F4A300', color: '#fff', padding: '4px 8px', borderRadius: '12px' },
  ingredients: { marginBottom: '12px' },
  ingredientList: { margin: '8px 0', paddingLeft: '20px', fontSize: '13px' },
  steps: { marginBottom: '12px' },
  stepsList: { margin: '8px 0', paddingLeft: '20px', fontSize: '13px' },
  step: { marginBottom: '6px', lineHeight: '1.4' },
  sectionTitle: { fontSize: '13px', fontWeight: 'bold', color: '#1a1a3e', margin: '0 0 8px 0' },
  nutrition: { marginBottom: '12px', padding: '12px', background: '#f9f9f9', borderRadius: '8px' },
  nutritionGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '13px' },
  tip: { fontSize: '13px', color: '#F4A300', margin: '8px 0', padding: '8px', background: '#fff9e6', borderRadius: '6px' },
  actions: { display: 'flex', gap: '8px', marginTop: '12px' },
};
