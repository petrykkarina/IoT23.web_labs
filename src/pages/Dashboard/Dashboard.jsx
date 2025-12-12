// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from 'react';
import './Dashboard.css';

export default function Dashboard({ products, setProducts }) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const add = () => {
    if (!name.trim() || !price || !color.trim() || !type.trim() || !description.trim()) {
      setError('Please fill all required fields!');
      return;
    }

    const priceValue = Number(price);
    if (priceValue < 1 || isNaN(priceValue)) {
      setError('Price must be at least 1 and a valid number!');
      return;
    }

    setProducts([...products, {
      id: Date.now(),
      name: name.trim(),
      price: priceValue,
      color: color.trim(),
      type: type.trim(),
      description: description.trim()
    }]);

    setName('');
    setPrice('');
    setColor('');
    setType('');
    setDescription('');
    setError('');
  };

  const remove = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

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
          placeholder="Color (e.g., Grey, Black)"
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
            <option value="accessory">Accessory</option>
        </select>
        
        <textarea
            className="dash-input full-width"
            placeholder="Gadget Description"
            rows="3"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />

        <button className="btn-add full-width" onClick={add}>
            Add New Gadget
        </button>
      </div>

      <h3 className="list-title">Current Gadget List</h3>
      <ul className="product-list">
        {products.map(p => (
          <li key={p.id} className="product-item">
            <span className="product-info">
                <strong style={{color:'#d4af37'}}>{p.name}</strong> (<em>{p.type}</em>) — <strong style={{color:'#d4af37'}}>{p.price}$</strong> <br/>
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
