// src/pages/Catalog/Catalog.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import { getProducts } from '../../api/api';
import './Catalog.css';

const INITIAL_VISIBLE_COUNT = 6;
const STEP_SIZE = 3;

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterType, setFilterType] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Fetch products from API with filters (passed as URL parameters)
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const filters = {};
      if (search.trim()) filters.search = search.trim();
      if (filterColor) filters.color = filterColor;
      if (filterType) filters.type = filterType;
      if (sort) filters.sort = sort;

      const data = await getProducts(filters);
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [search, filterColor, filterType, sort]);

  // Fetch products when filters change (with debounce for search)
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [fetchProducts]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMoreProducts = visibleCount < products.length;

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + STEP_SIZE);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <div className="catalog-container">
      <h2>Where Technology Meets Style</h2>

      <div className="search-sort-panel">
        <input
          className="control-input"
          placeholder="Search gadgets..."
          value={search}
          onChange={handleSearchChange}
        />

        <select
          className="control-select"
          value={filterColor}
          onChange={handleFilterChange(setFilterColor)}
        >
          <option value="">Filter by Color</option>
          <option value="Space Black">Space Black</option>
          <option value="Natural Titanium">Natural Titanium</option>
          <option value="Blue Titanium">Blue Titanium</option>
          <option value="Black">Black</option>
          <option value="Silver">Silver</option>
          <option value="Midnight Blue">Midnight Blue</option>
          <option value="Titanium Grey">Titanium Grey</option>
          <option value="Titanium Violet">Titanium Violet</option>
          <option value="White">White</option>
          <option value="Space Grey">Space Grey</option>
          <option value="Midnight">Midnight</option>
          <option value="Starlight">Starlight</option>
          <option value="Space Gray">Space Gray</option>
          <option value="Obsidian">Obsidian</option>
          <option value="Porcelain">Porcelain</option>
          <option value="Bay">Bay</option>
        </select>

        <select
          className="control-select"
          value={filterType}
          onChange={handleFilterChange(setFilterType)}
        >
          <option value="">Filter by Type</option>
          <option value="phone">Phone</option>
          <option value="audio">Audio</option>
          <option value="tablet">Tablet</option>
          <option value="laptop">Laptop</option>
          <option value="accessory">Accessory</option>
        </select>

        <select
          className="control-select"
          value={sort}
          onChange={handleFilterChange(setSort)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="alpha">Alphabet A–Z</option>
        </select>
      </div>

      {isLoading && <Spinner />}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchProducts} className="btn-retry">
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
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
                Show More Gadgets
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
