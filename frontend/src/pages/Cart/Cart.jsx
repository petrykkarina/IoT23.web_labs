// src/pages/Cart/Cart.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/actions';
import './Cart.css';

export default function Cart() {
  // useSelector hook - getting data from redux store
  const cartItems = useSelector(state => state.cartItems);
  // useDispatch hook - for dispatching Redux actions
  const dispatch = useDispatch();

  const handleRemove = (cartItemId) => {
    dispatch(removeFromCart(cartItemId))
  }

  const handleQuantityChange = (cartItemId, newQuantity) => {
    dispatch(updateQuantity(cartItemId, newQuantity))
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
          <Link to="/catalog" className="btn-continue-shopping">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <span className="cart-count">{totalItems} item(s)</span>
      </div>

      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.cartItemId} className="cart-item">
            <div className="cart-item-image">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="placeholder-image">📱</div>
              )}
            </div>

            <div className="cart-item-details">
              <Link to={`/item/${item.id}`} className="cart-item-name">
                {item.name}
              </Link>
              <p className="cart-item-meta">
                {item.selectedColor && (
                  <span className="cart-item-color">
                    <span
                      className="color-dot"
                      style={{ backgroundColor: item.selectedColor.hex }}
                    />
                    {item.selectedColor.name}
                  </span>
                )}
                {item.type && <span> • {item.type}</span>}
              </p>
            </div>

            <div className="cart-item-quantity">
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
              >
                −
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="cart-item-price">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            <button
              className="btn-remove"
              onClick={() => handleRemove(item.cartItemId)}
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <button className="btn-clear-cart" onClick={handleClearCart}>
          Clear Cart
        </button>

        <div className="cart-total">
          <span>Total:</span>
          <span className="total-price">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="cart-actions">
        <Link to="/catalog" className="btn-continue-shopping">
          ← Continue Shopping
        </Link>
        <button className="btn-checkout">
          Checkout
        </button>
      </div>
    </div>
  );
}
