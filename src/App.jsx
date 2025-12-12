// app.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home'; 
import Catalog from './pages/Catalog/Catalog'; // 📢 ІМПОРТ НОВОГО КОМПОНЕНТА
import Dashboard from './pages/Dashboard/Dashboard'; // ЗАЛИШАЄТЬСЯ
import ItemPage from './pages/ItemPage/ItemPage';
import iPhone15ProImg from './assets/products/iphone15pro.jpg';
import SonyWH1000XM5Img from './assets/products/sony-wh1000xm5.jpg';



import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import './App.css';

export default function App() {
    // products та setProducts залишаються в App.jsx, щоб керувати даними
    const [products, setProducts] = useState([
    {
        id: 1,
        name: 'iPhone 15 Pro',
        price: 1199,
        color: 'Grey Titanium',
        type: 'phone',
        description: 'Найкращий телефон на ринку.',
        image: iPhone15ProImg   // ← додано
    },
    {
        id: 6,
        name: 'Sony WH-1000XM5',
        price: 350,
        color: 'Black',
        type: 'audio',
        description: 'Найкраще шумозаглушення.',
        image: require('./assets/products/sony-wh1000xm5.jpg') // або через import
    },
]);


    return (
        <Router>
            <div className="app-container">
                
                <Header />

                <main className="main">
                    <Routes>
                        {/* 1. Домашня сторінка - лише статична інфо */}
                        <Route path="/" element={<Home />} /> 
                        
                        {/* 📢 2. НОВИЙ МАРШРУТ ДЛЯ КАТАЛОГУ */}
                        <Route path="/catalog" element={<Catalog products={products} />} />
                        
                        {/* 3. Dashboard - залишається як був */}
                        <Route 
                            path="/dashboard" 
                            element={<Dashboard products={products} setProducts={setProducts} />} 
                        />
                        <Route 
                            path="/item/:id" 
                            element={<ItemPage products={products} />} 
                        />
                    </Routes>
                </main>

                <Footer />
                
            </div>
        </Router>
    );
}