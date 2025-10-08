const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/courses';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const courseService = {
  async fetchAll() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Failed to fetch courses (Status: ${response.status})`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Fetch error:', error);
      throw error;
    }
  },

  async create(courseData) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create course');
    }
    return response.json();
  },

  async update(id, courseData) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update course');
    }
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/${id}`, { 
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete course');
    }
    return response.json();
  }
};