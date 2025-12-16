import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import './Success.css';

export default function Success() {
  const location = useLocation();
  const orderData = location.state;

  if (!orderData) {
    return <Navigate to="/" replace />;
  }

  const { orderTotal, orderItems } = orderData;

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="order-details">
          <div className="order-detail">
            <span className="detail-label">Order Number</span>
            <span className="detail-value">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="order-detail">
            <span className="detail-label">Items</span>
            <span className="detail-value">{orderItems} product(s)</span>
          </div>
          <div className="order-detail">
            <span className="detail-label">Total Amount</span>
            <span className="detail-value total">${orderTotal?.toFixed(2)}</span>
          </div>
        </div>

        <p className="success-info">
          A confirmation email has been sent to your email address.
          You can track your order in your account dashboard.
        </p>

        <div className="success-actions">
          <Link to="/catalog" className="btn-continue">
            Continue Shopping
          </Link>
          <Link to="/" className="btn-home">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

