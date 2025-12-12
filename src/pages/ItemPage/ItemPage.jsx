import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemPage.css';

export default function ItemPage({ products }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = products.find(p => p.id === Number(id));

    if (!product) {
        return (
            <div className="item-page-container">
                <h2>404 — Товар не знайдено</h2>
                <button className="btn-back" onClick={() => navigate('/')}>Повернутися до каталогу</button>
            </div>
        );
    }

    return (
        <div className="item-page-container">
            <button className="btn-back" onClick={() => navigate(-1)}>
                ← Назад
            </button>
            
            <div className="item-details">
                <div className="item-image-placeholder">
                    {<div className="item-image-placeholder">
    <img src={product.image} alt={product.name} className="item-image" />
</div>
}
                </div>
                <div className="item-info">
                    <h1>{product.name}</h1>
                    <p className="item-price">${product.price}</p>
                    
                    <div className="specs">
                        <p><strong>Колір:</strong> {product.color || 'Не вказано'}</p>
                        <p><strong>Тип:</strong> {product.type || 'Не вказано'}</p>
                    </div>
                    
                    <div className="description">
                        <h3>Опис</h3>
                        <p>{product.description || 'Детального опису немає.'}</p>
                    </div>

                    <button className="btn-primary-buy">
                        Купити зараз
                    </button>
                </div>
            </div>
        </div>
    );
}