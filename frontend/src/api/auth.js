// src/api/auth.js
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function decodeToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));

    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }
    return payload;
  } catch (err) {
    return null;
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  if (!token) return false;
  const decoded = decodeToken(token);
  return decoded !== null;
}

export function getCurrentUser() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  return decodeToken(token);
}

export async function login(email, password) {
  try {
    const response = await authClient.post('/auth/login', { email, password });
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', user.email);

    return { token, user };
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error('Login failed. Please try again.');
  }
}

export async function register(userData) {
  try {
    const response = await authClient.post('/auth/register', userData);
    const { token, user } = response.data;

    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', user.email);

    return { token, user };
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error('Registration failed. Please try again.');
  }
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userEmail');
}
