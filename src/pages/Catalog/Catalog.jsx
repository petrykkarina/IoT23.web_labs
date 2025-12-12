// src/pages/Catalog/Catalog.jsx
import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Catalog.css';

const INITIAL_VISIBLE_COUNT = 3;
const STEP_SIZE = 3;

export default function Catalog({ products }) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterType, setFilterType] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const filtered = products
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesColor = !filterColor || p.color.toLowerCase() === filterColor.toLowerCase();
      const matchesType = !filterType || p.type.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesColor && matchesType;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'alpha') return a.name.localeCompare(b.name);
      return 0;
    });

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < filtered.length;

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + STEP_SIZE);
  };

  return (
    <div className="catalog-container">
      <h2>Where Technology Meets Style</h2>

      <div className="search-sort-panel">
        <input
          className="control-input"
          placeholder="Search gadgets..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select className="control-select" value={filterColor} onChange={e => setFilterColor(e.target.value)}>
          <option value="">Filter by Color</option>
          <option value="Space Black">Space Black</option>
          <option value="Titanium Grey">Titanium Grey</option>
          <option value="Grey">Grey</option>
          <option value="White">White</option>
          <option value="Black">Black</option>
        </select>

        <select className="control-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="">Filter by Type</option>
          <option value="phone">Phone</option>
          <option value="audio">Audio</option>
          <option value="tablet">Tablet</option>
          <option value="accessory">Accessory</option>
        </select>

        <select className="control-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="alpha">Alphabet A–Z</option>
        </select>
      </div>

      <div className="products-grid">
        {visibleProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visibleProducts.length === 0 && (
        <p className="no-products">No gadgets match your vibe 😔</p>
      )}

      {hasMoreProducts && (
        <div className="view-more-wrapper">
          <button onClick={handleViewMore} className="btn-view-more">
            Show More Luxury
          </button>
        </div>
      )}
    </div>
  );
}
