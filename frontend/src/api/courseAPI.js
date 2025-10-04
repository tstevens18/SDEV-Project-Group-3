const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/courses';

// Debug logging
console.log('🔧 API Configuration:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  API_URL: API_URL,
  mode: import.meta.env.MODE
});

export const courseService = {
  async fetchAll() {
    console.log('📡 Fetching courses from:', API_URL);
    try {
      const response = await fetch(API_URL);
      console.log('📥 Response status:', response.status);
      if (!response.ok) throw new Error(`Failed to fetch courses (Status: ${response.status})`);
      const data = await response.json();
      console.log('✅ Courses fetched successfully:', data.length, 'courses');
      return data;
    } catch (error) {
      console.error('❌ Fetch error:', error);
      throw error;
    }
  },

  async create(courseData) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) throw new Error('Failed to create course');
    return response.json();
  },

  async update(id, courseData) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) throw new Error('Failed to update course');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/${id}`, { 
      method: 'DELETE' 
    });
    if (!response.ok) throw new Error('Failed to delete course');
    return response.json();
  }
};