const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/cart`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const cartService = {
  async getCart() {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error(`Failed to fetch cart (Status: ${response.status})`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Fetch cart error:', error);
      throw error;
    }
  },

  async addToCart(courseId) {
    try {
      const response = await fetch(`${API_URL}/add/${courseId}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add course to cart');
      }
      return response.json();
    } catch (error) {
      console.error('❌ Add to cart error:', error);
      throw error;
    }
  },

  async removeFromCart(courseId) {
    try {
      const response = await fetch(`${API_URL}/remove/${courseId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to remove course from cart');
      }
      return response.json();
    } catch (error) {
      console.error('❌ Remove from cart error:', error);
      throw error;
    }
  },

  async clearCart() {
    try {
      const response = await fetch(`${API_URL}/clear`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to clear cart');
      }
      return response.json();
    } catch (error) {
      console.error('❌ Clear cart error:', error);
      throw error;
    }
  }
};