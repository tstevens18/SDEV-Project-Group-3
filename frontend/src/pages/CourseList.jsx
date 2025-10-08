import React from 'react';
import { useCourses } from '../hooks/useCourses';
import { useAuth } from '../hooks/useAuth';
import CourseCard from '../components/CourseCard';
import CoursePopup from '../components/CoursePopup';

export default function CourseList() {
  const { isTeacher, isAuthenticated } = useAuth();
  const {
    courses,
    loading,
    error,
    showPopup,
    editingCourse,
    formData,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleOpenPopup,
    handleClosePopup,
    handleInputChange
  } = useCourses();

  if (loading) return (
    <div className="py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading courses...</p>
    </div>
  );
  
  if (error) return (
    <div className="py-5 text-center">
      <div className="glass-card p-4 mx-auto" style={{maxWidth: '500px'}}>
        <i className="bi bi-exclamation-triangle text-danger" style={{fontSize: '3rem'}}></i>
        <h4 className="mt-3 text-danger">Error</h4>
        <p className="text-muted">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 fade-in-up">
        <div>
          <h2 className="fw-bold mb-2">
            <span className="text-gradient">Available Courses</span>
          </h2>
          <p className="text-muted mb-0">
            {isTeacher() ? 'Manage your course catalog' : 'Browse available courses'}
          </p>
        </div>
        {isTeacher() && (
          <button 
            className="btn btn-primary btn-lg px-4" 
            onClick={() => handleOpenPopup()}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            <i className="bi bi-plus-circle me-2"></i>Add New Course
          </button>
        )}
      </div>

      {!isAuthenticated() && (
        <div className="alert alert-info mb-4" role="alert">
          <i className="bi bi-info-circle me-2"></i>
          You are viewing courses as a guest. <a href="#/login" className="alert-link">Login</a> to access more features.
        </div>
      )}

      <div className="row g-4">
        {courses.map((course, index) => (
          <CourseCard
            key={course._id}
            course={course}
            index={index}
            onEdit={handleOpenPopup}
            onDelete={handleDelete}
            isTeacher={isTeacher()}
          />
        ))}
      </div>

      {isTeacher() && (
        <CoursePopup
          show={showPopup}
          editingCourse={editingCourse}
          formData={formData}
          onClose={handleClosePopup}
          onSubmit={editingCourse ? handleUpdate : handleCreate}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}