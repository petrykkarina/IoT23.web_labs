// src/redux/store.js
import { createStore } from 'redux';
import cartReducer from './reducers';

// Load cart from localStorage
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return { cartItems: JSON.parse(savedCart) };
    }
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
  }
  return undefined;
}

// Save cart to localStorage
function saveCartToStorage(state) {
  try {
    localStorage.setItem('cart', JSON.stringify(state.cartItems));
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
}

const preloadedState = loadCartFromStorage();

const store = createStore(
  cartReducer,
  preloadedState,
  // Enable Redux DevTools Extension if available
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveCartToStorage(store.getState());
});

export default store;
