const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;

const JWT_SECRET = 'gadget-shop-secret-key-2024';
const JWT_EXPIRES_IN = '24h';

let users = [
  {
    id: 1,
    email: 'user@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+380501234567',
  },
];

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    console.log(`POST /api/auth/login - Failed login attempt for: ${email}`);
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  console.log(`POST /api/auth/login - User logged in: ${email}`);

  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    },
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    console.log(`POST /api/auth/register - Email already exists: ${email}`);
    return res
      .status(409)
      .json({ message: 'User with this email already exists' });
  }

  const newUser = {
    id: users.length + 1,
    email,
    password,
    firstName,
    lastName,
    phone: phone || '',
  };

  users.push(newUser);

  const token = jwt.sign(
    {
      userId: newUser.id,
      email: newUser.email,
      name: `${newUser.firstName} ${newUser.lastName}`,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  console.log(`POST /api/auth/register - New user registered: ${email}`);

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: `${newUser.firstName} ${newUser.lastName}`,
    },
  });
});

app.get('/api/auth/verify', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({
      valid: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name,
      },
    });
  } catch (err) {
    console.log('POST /api/auth/verify - Invalid token');
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}
// Initial products data - gadgets and devices with multiple color variants
let products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description:
      'The most powerful iPhone ever with A17 Pro chip, titanium design, and advanced camera system.',
    price: 999,
    colors: [
      { name: 'Space Black', hex: '#1d1d1f' },
      { name: 'Natural Titanium', hex: '#a8a9ad' },
      { name: 'Blue Titanium', hex: '#394c5e' },
    ],
    type: 'phone',
    image:
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
  },
  {
    id: '2',
    name: 'Sony WH-1000XM5',
    description:
      'Industry-leading noise cancellation headphones with exceptional sound quality and 30-hour battery life.',
    price: 349,
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Silver', hex: '#c0c0c0' },
      { name: 'Midnight Blue', hex: '#191970' },
    ],
    type: 'audio',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24 Ultra',
    description:
      'Premium Android smartphone with S Pen, 200MP camera, and Galaxy AI features.',
    price: 1199,
    colors: [
      { name: 'Titanium Grey', hex: '#6b6b6b' },
      { name: 'Titanium Violet', hex: '#8b7b8b' },
      { name: 'Titanium Yellow', hex: '#d4a845' },
    ],
    type: 'phone',
    image:
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
  },
  {
    id: '4',
    name: 'AirPods Pro 2',
    description:
      'Active noise cancellation earbuds with Adaptive Audio and USB-C charging case.',
    price: 249,
    colors: [{ name: 'White', hex: '#f5f5f7' }],
    type: 'audio',
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    description:
      'Powerful tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
    price: 1099,
    colors: [
      { name: 'Space Grey', hex: '#52555a' },
      { name: 'Silver', hex: '#e3e4e5' },
    ],
    type: 'tablet',
    image:
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
  },
  {
    id: '6',
    name: 'MacBook Air M3',
    description:
      'Ultra-thin laptop with M3 chip, 18-hour battery life, and stunning Liquid Retina display.',
    price: 1099,
    colors: [
      { name: 'Midnight', hex: '#1e2533' },
      { name: 'Starlight', hex: '#f0e7d8' },
      { name: 'Space Gray', hex: '#7d7e80' },
    ],
    type: 'laptop',
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
  },
  {
    id: '7',
    name: 'Apple Watch Ultra 2',
    description:
      'The most rugged Apple Watch with precision GPS, 36-hour battery, and titanium case.',
    price: 799,
    colors: [
      { name: 'Natural Titanium', hex: '#a8a9ad' },
      { name: 'Black Titanium', hex: '#1d1d1f' },
    ],
    type: 'accessory',
    image:
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
  },
  {
    id: '8',
    name: 'Google Pixel 8 Pro',
    description:
      'AI-powered smartphone with Tensor G3 chip, Magic Eraser, and 7 years of updates.',
    price: 999,
    colors: [
      { name: 'Obsidian', hex: '#1d1d1f' },
      { name: 'Porcelain', hex: '#f1ebe4' },
      { name: 'Bay', hex: '#89a8c8' },
    ],
    type: 'phone',
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
  },
];

// GET all products with optional filters
app.get('/api/products', (req, res) => {
  const { sort, search, color, type } = req.query;
  let result = [...products];

  // Apply search filter
  if (search) {
    const query = search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    console.log(`GET /api/products - Filtered by search: "${search}"`);
  }

  // Apply color filter (searches in colors array by name)
  if (color) {
    result = result.filter((p) =>
      p.colors.some((c) => c.name.toLowerCase() === color.toLowerCase())
    );
    console.log(`GET /api/products - Filtered by color: "${color}"`);
  }

  // Apply type filter
  if (type) {
    result = result.filter((p) => p.type.toLowerCase() === type.toLowerCase());
    console.log(`GET /api/products - Filtered by type: "${type}"`);
  }

  // Apply sorting
  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price);
    console.log('GET /api/products - Sorted by price ascending');
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price);
    console.log('GET /api/products - Sorted by price descending');
  } else if (sort === 'alpha') {
    result.sort((a, b) => a.name.localeCompare(b.name));
    console.log('GET /api/products - Sorted alphabetically');
  }

  console.log(`GET /api/products - Returning ${result.length} products`);
  res.json(result);
});

// GET single product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === id);
  if (product) {
    console.log(`GET /api/products/${id} - Found product: ${product.name}`);
    res.json(product);
  } else {
    console.log(`GET /api/products/${id} - Product not found`);
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST create new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    ...req.body,
    id: Date.now().toString(),
  };
  products.push(newProduct);
  console.log('POST /api/products - Created product:', newProduct.name);
  res.status(201).json(newProduct);
});

// PUT update product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    console.log(`PUT /api/products/${id} - Product not found`);
    return res.status(404).json({ message: 'Product not found' });
  }

  products[productIndex] = { ...products[productIndex], ...req.body };
  console.log(
    'PUT /api/products - Updated product:',
    products[productIndex].name
  );
  res.json(products[productIndex]);
});

// DELETE product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex === -1) {
    console.log(`DELETE /api/products/${id} - Product not found`);
    return res.status(404).json({ message: 'Product not found' });
  }

  products = products.filter((p) => p.id !== id);
  console.log('DELETE /api/products - Deleted product with id:', id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('API Endpoints:');
  console.log('  POST /api/auth/login    - Login with email & password');
  console.log('  POST /api/auth/register - Register new user');
  console.log('  GET  /api/auth/verify   - Verify JWT token');
  console.log('  GET  /api/products      - Get all products');
  console.log('\nDemo credentials: user@example.com / password123');
});
