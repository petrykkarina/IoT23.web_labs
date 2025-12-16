// src/pages/ItemPage/ItemPage.jsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/actions'
import { getProductById } from '../../api/api'
import Spinner from '../../components/Spinner/Spinner'
import './ItemPage.css'

export default function ItemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  // useDispatch hook - for dispatching Redux actions
  const dispatch = useDispatch()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAdded, setIsAdded] = useState(false)
  const [selectedColor, setSelectedColor] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await getProductById(id)
        setProduct(data)
        // Set the first color as default selected
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0])
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Product not found')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  // Add to cart using Redux dispatch with selected color
  const handleAddToCart = () => {
    const productWithColor = {
      ...product,
      selectedColor: selectedColor
    }
    dispatch(addToCart(productWithColor))
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="item-page-container">
        <Spinner />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="item-page-container">
        <h2>404 — Product not found</h2>
        <button className="btn-back" onClick={() => navigate('/catalog')}>
          Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="item-page-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="item-details">
        <div className="item-image-placeholder">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="item-image"
            />
          ) : (
            <div className="no-image-placeholder">📱</div>
          )}
        </div>
        <div className="item-info">
          <h1>{product.name}</h1>
          <p className="item-price">${product.price}</p>

          <div className="specs">
            <div className="color-selector">
              <p><strong>Color:</strong> {selectedColor?.name || 'Select a color'}</p>
              <div className="color-options">
                {product.colors && product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`color-swatch ${selectedColor?.name === color.name ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>
            <p><strong>Type:</strong> {product.type || 'Not specified'}</p>
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>

          <button
            className={`btn-primary-buy ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? '✓ Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
