// App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import Home from './pages/Home/Home'
import Catalog from './pages/Catalog/Catalog'
import Dashboard from './pages/Dashboard/Dashboard'
import ItemPage from './pages/ItemPage/ItemPage'
import Cart from './pages/Cart/Cart'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

import './App.css'

export default function App () {
  return (
    <Provider store={store}>
      <Router>
        <div className="app-container">
          <Header />

          <main className="main">
            <Routes>
              {/* 1. Домашня сторінка - лише статична інфо */}
              <Route path="/" element={<Home />} />

              {/* 2. Каталог - тепер з API */}
              <Route path="/catalog" element={<Catalog />} />

              {/* 3. Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* 4. Item Page - з Redux для кошика */}
              <Route path="/item/:id" element={<ItemPage />} />

              {/* 5. Cart Page - Redux */}
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </Provider>
  )
}
