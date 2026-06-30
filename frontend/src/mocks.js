import axios from 'axios';

// Mock database
const MOCK_PRODUCTS = [
  {
    _id: 'prod-1',
    title: 'MacBook Pro 14" M3',
    description: 'Apple MacBook Pro 14-inch with M3 chip, 16GB Unified Memory, 512GB SSD, Space Gray.',
    price: 1999,
    discountPercentage: 10,
    rating: 4.8,
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60'],
    stock: 12,
    brand: 'Apple',
    category: 'electronics'
  },
  {
    _id: 'prod-2',
    title: 'iPhone 15 Pro Max',
    description: 'Apple iPhone 15 Pro Max 256GB, Titanium Black, with advanced triple camera system.',
    price: 1199,
    discountPercentage: 5,
    rating: 4.9,
    thumbnail: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60'],
    stock: 25,
    brand: 'Apple',
    category: 'electronics'
  },
  {
    _id: 'prod-3',
    title: 'Nike Air Max 270',
    description: 'Nike Air Max 270 lifestyle sneakers featuring a large Max Air unit and breathable mesh upper.',
    price: 150,
    discountPercentage: 15,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60'],
    stock: 45,
    brand: 'Nike',
    category: 'shoes'
  },
  {
    _id: 'prod-4',
    title: 'Sony WH-1000XM5',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and multi-point connection.',
    price: 399,
    discountPercentage: 12,
    rating: 4.7,
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'],
    stock: 18,
    brand: 'Sony',
    category: 'electronics'
  },
  {
    _id: 'prod-5',
    title: 'Minimalist Leather Wallet',
    description: 'Genuine full-grain leather wallet with RFID blocking and slim card holder layout.',
    price: 45,
    discountPercentage: 0,
    rating: 4.5,
    thumbnail: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=500&auto=format&fit=crop&q=60'],
    stock: 100,
    brand: 'Generic',
    category: 'accessories'
  },
  {
    _id: 'prod-6',
    title: 'Smart Sports Watch',
    description: 'Waterproof smartwatch with heart rate monitor, sleep tracking, and built-in GPS.',
    price: 199,
    discountPercentage: 20,
    rating: 4.4,
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'],
    stock: 30,
    brand: 'Fitbit',
    category: 'electronics'
  },
  {
    _id: 'prod-7',
    title: 'Classic Aviator Sunglasses',
    description: 'Polarized metal frame aviator sunglasses with UV400 protection.',
    price: 85,
    discountPercentage: 10,
    rating: 4.3,
    thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60'],
    stock: 50,
    brand: 'RayBan',
    category: 'accessories'
  },
  {
    _id: 'prod-8',
    title: 'Potted Bonsai Tree',
    description: 'Indoor miniature juniper bonsai tree in a ceramic pot for office and home decor.',
    price: 55,
    discountPercentage: 0,
    rating: 4.6,
    thumbnail: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60',
    images: ['https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60'],
    stock: 15,
    brand: 'Nature',
    category: 'home'
  }
];

const MOCK_USER = {
  _id: 'user-sreenath',
  name: 'Sreenath',
  email: 'demo@mail.com',
  userGroup: 1
};

// Set up default adapter
axios.defaults.adapter = async (config) => {
  const url = config.url || '';
  const method = (config.method || 'get').toLowerCase();
  
  // Extract path and query params
  const cleanUrl = url.replace(/https?:\/\/[^/]+/, '');
  const [path, queryString] = cleanUrl.split('?');
  const params = {};
  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, val] = param.split('=');
      params[key] = decodeURIComponent(val);
    });
  }

  // Helper to construct response
  const makeResponse = (data, status = 200, statusText = 'OK') => {
    return {
      data,
      status,
      statusText,
      headers: {},
      config,
      request: {}
    };
  };

  // Route matches
  // 1. User login
  if (path.endsWith('/user/login') && method === 'post') {
    const body = config.data ? JSON.parse(config.data) : {};
    if (body.email === 'demo@mail.com' && body.password === 'demodemo') {
      return makeResponse({
        token: 'mock-jwt-token-sreenath-12345',
        user: MOCK_USER,
        message: 'Welcome back, Sreenath!'
      });
    } else {
      return makeResponse({ message: 'Invalid credentials. Use demo@mail.com / demodemo' }, 400, 'Bad Request');
    }
  }

  // 2. User me (check auth)
  if (path.endsWith('/user/me') && method === 'get') {
    return makeResponse({
      user: MOCK_USER
    });
  }

  // 3. Products list with pagination
  if (path.endsWith('/products') && method === 'get') {
    const page = parseInt(params.page || '1', 10);
    const limit = parseInt(params.productsPerPage || '8', 10);
    const startIdx = (page - 1) * limit;
    const endIdx = startIdx + limit;
    const paginatedProducts = MOCK_PRODUCTS.slice(startIdx, endIdx);
    
    return makeResponse({
      result: paginatedProducts,
      pages: Math.ceil(MOCK_PRODUCTS.length / limit),
      total: MOCK_PRODUCTS.length
    });
  }

  // 4. Single Product detail
  const productDetailMatch = path.match(/\/products\/([^/]+)$/);
  if (productDetailMatch && method === 'get') {
    const productId = productDetailMatch[1];
    const product = MOCK_PRODUCTS.find(p => p._id === productId) || MOCK_PRODUCTS[0];
    return makeResponse(product);
  }

  // 5. Checkout creation
  if (path.endsWith('/checkouts/create') && method === 'post') {
    const body = config.data ? JSON.parse(config.data) : {};
    const orderId = 'order-' + Math.random().toString(36).substr(2, 9);
    
    // Save order in localStorage so it can be loaded on Order Details page
    const cartItems = (body.cart || []).map(item => {
      const prodDetails = MOCK_PRODUCTS.find(p => p._id === item.product) || {};
      return {
        ...prodDetails,
        quantity: item.quantity
      };
    });

    const orderData = {
      _id: orderId,
      createdAt: new Date().toISOString(),
      cart: cartItems,
      address: body.address || {},
      payment: body.payment || {},
      total: cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    };

    localStorage.setItem(orderId, JSON.stringify(orderData));

    return makeResponse({
      id: orderId,
      message: 'Order placed successfully!'
    });
  }

  // 6. Checkout / Order retrieval
  const orderDetailMatch = path.match(/\/checkouts\/([^/]+)$/);
  if (orderDetailMatch && method === 'get') {
    const orderId = orderDetailMatch[1];
    const savedOrder = localStorage.getItem(orderId);
    if (savedOrder) {
      return makeResponse(JSON.parse(savedOrder));
    } else {
      // Return a mock default order
      return makeResponse({
        _id: orderId,
        createdAt: new Date().toISOString(),
        cart: [
          {
            _id: 'prod-1',
            title: 'MacBook Pro 14" M3',
            price: 1999,
            thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
            quantity: 1
          }
        ],
        address: {
          country: 'India',
          zip: '500001',
          address1: 'Hyderabad, Telangana'
        },
        payment: {
          type: 'delivery'
        }
      });
    }
  }

  // Default response for unhandled endpoints
  return makeResponse({}, 404, 'Not Found');
};
