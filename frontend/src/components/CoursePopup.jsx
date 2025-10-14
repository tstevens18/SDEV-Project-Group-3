import React, { useEffect, useState } from 'react';

export default function CoursePopup({ 
  show, 
  editingCourse, 
  formData, 
  onClose, 
  onSubmit, 
  onChange 
}) {
  const [isValidCourseNumber, setIsValidCourseNumber] = useState(true);

  
  useEffect(() => {
    if (formData.courseNumber) {
      const courseNumberRegex = /^[A-Z]{4}[0-9]{3}$/;
      setIsValidCourseNumber(courseNumberRegex.test(formData.courseNumber));
    } else {
      setIsValidCourseNumber(false);
    }
  }, [formData.courseNumber]);

  
  const isFormValid = () => {
    return (
      formData.courseNumber &&
      isValidCourseNumber &&
      formData.title &&
      formData.title.trim() !== '' &&
      formData.subject &&
      formData.subject.trim() !== '' &&
      formData.credits &&
      formData.credits > 0 &&
      formData.credits <= 10 &&
      formData.description &&
      formData.description.trim() !== ''
    );
  };

  if (!show) return null;

  return (
    <div 
      className="modal show d-block" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
        <div 
          className="modal-content" 
          style={{
            background: 'rgba(26, 31, 58, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            color: '#e6eef8'
          }}
        >
          <div 
            className="modal-header" 
            style={{
              borderBottom: '1px solid rgba(102, 126, 234, 0.2)'
            }}
          >
            <h5 className="modal-title fw-bold" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {editingCourse ? '✏️ Edit Course' : '➕ Add New Course'}
            </h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
              style={{
                filter: 'invert(1) brightness(2)'
              }}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-bold" style={{color: '#a8b0cf'}}>
                  <i className="bi bi-hash me-2"></i>Course Number
                  <span><p class = "subtext">Must be 4 uppercase letters followed by 3 digits (e.g., MATH101, CSCI201)</p></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="courseNumber"
                  value={formData.courseNumber}
                  onChange={onChange}
                  placeholder="e.g., MATH101"
                  maxLength="7"
                  required
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: `1px solid ${!isValidCourseNumber && formData.courseNumber ? 'rgba(220, 53, 69, 0.6)' : 'rgba(102, 126, 234, 0.3)'}`,
                    color: '#e6eef8',
                    padding: '0.75rem'
                  }}
                />
                {!isValidCourseNumber && formData.courseNumber && (
                  <small style={{color: '#dc3545', display: 'block', marginTop: '0.25rem'}}>
                    <i className="bi bi-exclamation-circle me-1"></i>
                    Course number must be exactly 4 uppercase letters followed by 3 digits
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{color: '#a8b0cf'}}>
                  <i className="bi bi-card-heading me-2"></i>Course Name
                  <span><p class = "subtext">e.g., Introduction to Calculus</p></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={onChange}
                  placeholder="e.g., Introduction to Calculus"
                  required
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    color: '#e6eef8',
                    padding: '0.75rem'
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{color: '#a8b0cf'}}>
                  <i className="bi bi-book me-2"></i>Subject
                  <span><p class = "subtext">Max 50 Characters</p></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  value={formData.subject}
                  onChange={onChange}
                  maxlength = "50"
                  placeholder="e.g., Computer Science, Mathematics"
                  required
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    color: '#e6eef8',
                    padding: '0.75rem'
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{color: '#a8b0cf'}}>
                  <i className="bi bi-star me-2"></i>Credits
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="credits"
                  value={formData.credits}
                  onChange={onChange}
                  placeholder='1 - 10'
                  min="0"
                  max="10"
                  step="0.5"
                  required
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    color: '#e6eef8',
                    padding: '0.75rem'
                  }}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold" style={{color: '#a8b0cf'}}>
                  <i className="bi bi-text-paragraph me-2"></i>Description
                  <span><p class = "subtext">Max 250 Characters</p></span>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={onChange}
                  maxlength = "250"
                  rows="4"
                  required
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    color: '#e6eef8',
                    padding: '0.75rem',
                    resize: 'vertical'
                  }}
                ></textarea>
              </div>
            </div>
            <div 
              className="modal-footer" 
              style={{
                borderTop: '1px solid rgba(102, 126, 234, 0.2)'
              }}
            >
              <button 
                type="button" 
                className="btn px-4" 
                onClick={onClose}
                style={{
                  background: 'rgba(139, 146, 176, 0.2)',
                  border: '1px solid rgba(139, 146, 176, 0.3)',
                  color: '#a8b0cf',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(139, 146, 176, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(139, 146, 176, 0.2)';
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn px-4"
                disabled={!isFormValid()}
                style={{
                  background: isFormValid() 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : 'rgba(139, 146, 176, 0.3)',
                  border: 'none',
                  color: isFormValid() ? '#fff' : '#6c757d',
                  boxShadow: isFormValid() ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
                  transition: 'all 0.3s ease',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  opacity: isFormValid() ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (isFormValid()) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (isFormValid()) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }
                }}
              >
                <i className={`bi ${editingCourse ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
                {editingCourse ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}