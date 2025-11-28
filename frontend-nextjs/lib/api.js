
import axios from 'axios';

const API_BASE_URL = 'https://mohamedalamin.wuaze.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productAPI = {
  getProducts: () => api.get('/products'),
  getProduct: (slug) => api.get(`/products/${slug}`),
  getFeaturedProducts: () => api.get('/products/featured'),
  getCategories: () => api.get('/categories'),
};

export default api;
