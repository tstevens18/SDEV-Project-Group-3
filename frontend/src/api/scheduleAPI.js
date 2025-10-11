const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/schedule`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const scheduleService = {
  async getSchedule() {
    try {
      const response = await fetch(API_URL, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error(`Failed to fetch schedule (Status: ${response.status})`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Fetch schedule error:', error);
      throw error;
    }
  },

  async checkout() {
    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to checkout');
      }
      return response.json();
    } catch (error) {
      console.error('❌ Checkout error:', error);
      throw error;
    }
  },

  async dropCourse(courseId) {
    try {
      const response = await fetch(`${API_URL}/drop/${courseId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to drop course');
      }
      return response.json();
    } catch (error) {
      console.error('❌ Drop course error:', error);
      throw error;
    }
  },

  async getEnrolledCourseIds() {
    try {
      const response = await fetch(`${API_URL}/enrolled-ids`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error(`Failed to fetch enrolled course IDs (Status: ${response.status})`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Fetch enrolled course IDs error:', error);
      throw error;
    }
  }
};