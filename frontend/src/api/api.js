// src/api/api.js
import axios from 'axios';

// Base URL for your backend API
const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET all products with optional filters (search, color, type, sort)
export async function getProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append('search', filters.search);
  }
  if (filters.color) {
    params.append('color', filters.color);
  }
  if (filters.type) {
    params.append('type', filters.type);
  }
  if (filters.sort) {
    params.append('sort', filters.sort);
  }

  const queryString = params.toString();
  const url = queryString ? `/products?${queryString}` : '/products';

  const response = await apiClient.get(url);
  return response.data;
}

// GET single product by ID
export async function getProductById(id) {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
}

// POST create new product
export async function createProduct(productData) {
  const response = await apiClient.post('/products', productData);
  return response.data;
}

// PUT update product
export async function updateProduct(id, productData) {
  const response = await apiClient.put(`/products/${id}`, productData);
  return response.data;
}

// DELETE product
export async function deleteProduct(id) {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}

export default apiClient;
