import React, { useState, useEffect } from 'react';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/courses';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchCourses();
  }, []);


  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch courses');
      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

 
  const createCourse = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create course');
      
      const newCourse = await response.json();
      setCourses([...courses, newCourse]);
      setFormData({ title: '', description: '' });
      setShowCreateForm(false);
      alert('Course created successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error creating course:', err);
    }
  };

  
  const updateCourse = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${editingCourse._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update course');
      
      const updatedCourse = await response.json();
      setCourses(courses.map(course => 
        course._id === editingCourse._id ? updatedCourse : course
      ));
      setFormData({ title: '', description: '' });
      setEditingCourse(null);
      alert('Course updated successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error updating course:', err);
    }
  };

  
  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`${API_URL}/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete course');
      
      setCourses(courses.filter(course => course._id !== courseId));
      alert('Course deleted successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Error deleting course:', err);
    }
  };

  
  const handleEditClick = (course) => {
    setEditingCourse(course);
    setFormData({ title: course.title, description: course.description });
    setShowCreateForm(false);
  };

  
  const handleCreateClick = () => {
    setShowCreateForm(true);
    setEditingCourse(null);
    setFormData({ title: '', description: '' });
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingCourse(null);
    setFormData({ title: '', description: '' });
  };

  return (
    <div className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Courses</h2>
        <button 
          className="btn btn-success" 
          onClick={handleCreateClick}
          disabled={showCreateForm || editingCourse}
        >
          + Create New Course
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}

      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Create/Update Form */}
      {(showCreateForm || editingCourse) && (
        <div className="card mb-4 bg-dark text-light border-primary">
          <div className="card-body">
            <h4 className="card-title">
              {editingCourse ? 'Update Course' : 'Create New Course'}
            </h4>
            <form onSubmit={editingCourse ? updateCourse : createCourse}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? 'Update' : 'Create'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course List */}
      <div className="row">
        {courses.length === 0 && !loading && (
          <div className="col-12">
            <p className="text-center text-muted">No courses available. Create one to get started!</p>
          </div>
        )}
        
        {courses.map(course => (
          <div key={course._id} className="col-md-4 mb-3">
            <div className="card h-100 bg-dark text-light">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <div className="d-flex gap-2 flex-wrap">
                  <button className="btn btn-primary btn-sm">View Details</button>
                  <button 
                    className="btn btn-warning btn-sm" 
                    onClick={() => handleEditClick(course)}
                    disabled={showCreateForm || editingCourse}
                  >
                    Update
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteCourse(course._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}