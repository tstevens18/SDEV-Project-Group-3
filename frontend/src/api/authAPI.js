const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const AUTH_API_URL = `${API_BASE_URL}/api/auth`;

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      return response.json();
    } catch (error) {
      console.error('Login API Error:', error);
      throw error;
    }
  },

  register: async (name, email, password, role) => {
    try {
      console.log('Attempting to register at:', `${AUTH_API_URL}/register`);
      const response = await fetch(`${AUTH_API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      return response.json();
    } catch (error) {
      console.error('Register API Error:', error);
      throw error;
    }
  },

  getCurrentUser: async (token) => {
    const response = await fetch(`${AUTH_API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  },

  logout: async (token) => {
    const response = await fetch(`${AUTH_API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.json();
  }
};