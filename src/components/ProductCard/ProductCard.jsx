import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ProductCard.module.css';

export default function ProductCard({ product }) {
  return (
    <div className={classes.card}>
      <div className={classes.imagePlaceholder}>
        <img 
          src={product.image} 
          alt={product.name} 
          className={classes.productImage} 
        />
      </div>
      <h3 className={classes.title}>{product.name}</h3>
      <p className={classes.price}>{product.price}$</p>
      
      <Link to={`/item/${product.id}`} className={classes.btnBuy}>
        View More
      </Link>
    </div>
  );
}
