// src/redux/actions.js

// Action types
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
export const CLEAR_CART = 'CLEAR_CART'

// Action creators
export function addToCart (product) {
  return {
    type: ADD_TO_CART,
    payload: product
  }
}

export function removeFromCart (cartItemId) {
  return {
    type: REMOVE_FROM_CART,
    payload: cartItemId
  }
}

export function updateQuantity (cartItemId, quantity) {
  return {
    type: UPDATE_QUANTITY,
    payload: { cartItemId, quantity }
  }
}

export function clearCart () {
  return {
    type: CLEAR_CART
  }
}

