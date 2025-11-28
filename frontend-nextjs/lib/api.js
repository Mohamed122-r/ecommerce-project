const API_BASE_URL = 'https://mohamedalamin.wuaze.com/api';

export async function getProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return { status: 'error', data: [] };
  }
}

export async function getFeaturedProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const data = await response.json();
    
    if (data.status === 'success') {
      // عرض أول 8 منتجات كمميزة
      return { ...data, data: data.data.slice(0, 8) };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return { status: 'error', data: [] };
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { status: 'error', data: [] };
  }
}
