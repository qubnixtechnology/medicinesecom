// frontend/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export const api = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) => 
      fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }),
    
    register: (userData: any) =>
      fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }),
    
    getMe: (token: string) =>
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
  },
  
  // Product endpoints
  products: {
    getAll: (params?: any) => {
      const queryString = params ? new URLSearchParams(params).toString() : '';
      return fetch(`${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`);
    },
    
    getById: (id: number) =>
      fetch(`${API_BASE_URL}/products/${id}`),
    
    getByCategory: (categorySlug: string) =>
      fetch(`${API_BASE_URL}/products?category=${categorySlug}`)
  },
  
  // Category endpoints
  categories: {
    getAll: () => fetch(`${API_BASE_URL}/categories`)
  },
  
  // Order endpoints
  orders: {
    create: (orderData: any, token: string) =>
      fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      }),
    
    getMyOrders: (token: string) =>
      fetch(`${API_BASE_URL}/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
  },
  
  // Contact endpoint
  contact: {
    submit: (formData: any) =>
      fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
  }
};