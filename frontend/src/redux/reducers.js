// src/redux/reducers.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  CLEAR_CART
} from './actions'

const initialState = {
  cartItems: []
}

export default function cartReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      // Create a unique cart item id combining product id and selected color
      const selectedColorName = action.payload.selectedColor?.name || ''
      const cartItemId = `${action.payload.id}-${selectedColorName}`

      const existingItem = state.cartItems.find(
        item => item.cartItemId === cartItemId
      )

      if (existingItem) {
        // If item with same color already in cart, increase quantity
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }

      // Add new item with quantity 1 and unique cartItemId
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...action.payload, cartItemId, quantity: 1 }
        ]
      }
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.cartItemId !== action.payload)
      }

    case UPDATE_QUANTITY: {
      const { cartItemId, quantity } = action.payload

      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.cartItemId !== cartItemId)
        }
      }

      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      }
    }

    case CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }

    default:
      return state
  }
}
