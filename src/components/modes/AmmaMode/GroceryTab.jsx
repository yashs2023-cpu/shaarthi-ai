import React, { useState } from 'react';
import { FormInput } from '../../shared/FormInput';
import { Card } from '../../shared/Card';
import { Button } from '../../shared/Button';
import apiService from '../../../services/api';
import { useToast } from '../../../hooks/useToast';
import SaarthiDB from '../../../services/storage';

export function GroceryTab() {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [groceryItems, setGroceryItems] = useState(SaarthiDB.grocery_lists);
  const [optimization, setOptimization] = useState(null);
  const { showToast } = useToast();

  const handleAddItem = () => {
    if (!item || !quantity) {
      showToast('⚠️', 'Please fill all fields');
      return;
    }

    const newItem = {
      id: 'grocery_' + Date.now(),
      item,
      quantity,
      added_at: new Date().toISOString(),
    };

    SaarthiDB.grocery_lists.push(newItem);
    SaarthiDB.save();
    setGroceryItems([...groceryItems, newItem]);
    setItem('');
    setQuantity('');
    showToast('✅', 'Item added!');
  };

  const handleOptimize = async () => {
    if (groceryItems.length === 0) {
      showToast('⚠️', 'Add items first');
      return;
    }

    showToast('🔄', 'Optimizing...');
    const items = groceryItems.map(g => g.item);
    const result = await apiService.optimizeGrocery(items);
    setOptimization(result);
    showToast('✅', 'Optimized!');
  };

  const handleDeleteItem = (id) => {
    const updated = groceryItems.filter(g => g.id !== id);
    SaarthiDB.grocery_lists = updated;
    SaarthiDB.save();
    setGroceryItems(updated);
    showToast('🗑️', 'Item deleted');
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>🛒 Grocery Planner AI</h3>

      <Card title="Add Item">
        <FormInput
          label="Item name"
          placeholder="Rice, milk, etc..."
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <FormInput
          label="Quantity"
          placeholder="2kg, 1ltr, etc..."
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Button onClick={handleAddItem} style={{ marginTop: '12px', width: '100%' }}>
          ➕ Add Item
        </Button>
      </Card>

      {groceryItems.length > 0 && (
        <Card title={`Your List (${groceryItems.length} items)`}>
          <div style={styles.list}>
            {groceryItems.map(g => (
              <div key={g.id} style={styles.listItem}>
                <span>{g.item} - {g.quantity}</span>
                <button
                  onClick={() => handleDeleteItem(g.id)}
                  style={styles.deleteBtn}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleOptimize} style={{ marginTop: '12px', width: '100%' }}>
            💰 Optimize for Savings
          </Button>
        </Card>
      )}

      {optimization && (
        <Card title="Optimized Savings">
          <p><strong>Total Cost:</strong> ₹{optimization.total_cost}</p>
          <p><strong>Savings:</strong> ₹{optimization.savings}</p>
          <p><strong>Best stores:</strong> {optimization.stores.join(', ')}</p>
        </Card>
      )}
    </div>
  );
}

const styles = {
  container: { display: 'flex', flexDirection: 'column', gap: '16px' },
  title: { fontSize: '20px', fontWeight: 'bold', color: '#F4A300' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
    background: '#f8f8f8',
    borderRadius: '8px',
    fontSize: '14px',
  },
  deleteBtn: {
    background: '#ff4444',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '4px 8px',
    cursor: 'pointer',
  },
};
