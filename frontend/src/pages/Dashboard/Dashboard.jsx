// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, deleteProduct } from '../../api/api';
import Spinner from '../../components/Spinner/Spinner';
import './Dashboard.css';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  };

  const add = async () => {
    if (!name.trim() || !price || !color.trim() || !type.trim()) {
      setError('Please fill all required fields!');
      return;
    }

    const priceValue = Number(price);
    if (priceValue < 1 || isNaN(priceValue)) {
      setError('Price must be at least 1 and a valid number!');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newProduct = await createProduct({
        name: name.trim(),
        price: priceValue,
        color: color.trim(),
        type: type.trim(),
        description: description.trim() || null
      });

      setProducts([...products, newProduct]);
      setName('');
      setPrice('');
      setColor('');
      setType('');
      setDescription('');
    } catch (err) {
      console.error('Error creating product:', err);
      setError('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const remove = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <h2 className="dash-title">GadgetNew Dashboard</h2>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dash-title">GadgetNew Dashboard</h2>

      {error && (
        <div style={{
          background: '#6a0f1e',
          color: '#ffd966',
          padding: '10px 15px',
          borderRadius: '8px',
          marginBottom: '15px',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {error}
        </div>
      )}

      <div className="add-panel">
        <input
          className="dash-input"
          placeholder="Gadget Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="dash-input"
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          className="dash-input"
          placeholder="Color (e.g., Black, White)"
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <select
          className="dash-input"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <option value="">-- Select Type --</option>
          <option value="phone">Phone</option>
          <option value="audio">Audio</option>
          <option value="tablet">Tablet</option>
          <option value="laptop">Laptop</option>
          <option value="accessory">Accessory</option>
        </select>

        <textarea
          className="dash-input full-width"
          placeholder="Gadget Description (optional)"
          rows="3"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <button
          className="btn-add full-width"
          onClick={add}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add New Gadget'}
        </button>
      </div>

      <h3 className="list-title">Current Gadget List</h3>
      <ul className="product-list">
        {products.map(p => (
          <li key={p.id} className="product-item">
            <span className="product-info">
              <strong style={{ color: '#d4af37' }}>{p.name}</strong> ({p.type}) — <strong style={{ color: '#d4af37' }}>${p.price}</strong><br />
              <small>Color: {p.color}</small>
            </span>
            <button className="btn-delete" onClick={() => remove(p.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
