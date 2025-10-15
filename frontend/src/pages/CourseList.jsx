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
    searchQuery,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleOpenPopup,
    handleClosePopup,
    handleInputChange,
    handleSearch,
    handleSearchSubmit,
    handleClearSearch
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

      <div className="mb-4">
        <div className="glass-card p-3">
          <form onSubmit={(e) => { e.preventDefault(); handleSearchSubmit(); }}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-0">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-0 bg-transparent"
                placeholder="Search by course name or course number (press Enter)..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearchSubmit();
                  }
                }}
                style={{ boxShadow: 'none' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-link text-muted"
                  onClick={handleClearSearch}
                  style={{ textDecoration: 'none' }}
                >
                  <i className="bi bi-x-circle"></i>
                </button>
              )}
              <button
                type="submit"
                className="btn"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: '#fff',
                  padding: '0.5rem 1rem'
                }}
              >
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row g-4">
        {courses.length === 0 ? (
          <div className="col-12">
            <div className="glass-card p-5 text-center">
              <i className="bi bi-search text-muted" style={{fontSize: '4rem'}}></i>
              <h4 className="mt-3 text-muted">No courses found</h4>
              <p className="text-muted mb-0">
                {searchQuery 
                  ? `No courses match your search "${searchQuery}". Try a different search term.`
                  : 'There are no courses available at the moment.'}
              </p>
              {searchQuery && (
                <button
                  className="btn btn-outline-primary mt-3"
                  onClick={handleClearSearch}
                >
                  <i className="bi bi-arrow-counterclockwise me-2"></i>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        ) : (
          courses.map((course, index) => (
            <CourseCard
              key={course._id}
              course={course}
              index={index}
              onEdit={handleOpenPopup}
              onDelete={handleDelete}
              isTeacher={isTeacher()}
            />
          ))
        )}
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