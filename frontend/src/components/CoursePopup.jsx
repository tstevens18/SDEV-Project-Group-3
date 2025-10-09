import React from 'react';

export default function CoursePopup({ 
  show, 
  editingCourse, 
  formData, 
  onClose, 
  onSubmit, 
  onChange 
}) {
  if (!show) return null;

  let validTitle = function(){
    console.log("validating title")

    let submitButton = document.querySelector('#submitBtn')
    
    let courseName = formData.title;
    let courseNum = courseName.slice(-3);
    let coursePrefix = courseName.slice(0, 4);

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (!isNumeric(courseNum) || isNumeric(coursePrefix)) {
      console.log("disabled")
      submitButton.disabled = true;
      submitButton.style.background = 'rgba(139, 146, 176, 0.2)';
    }
    else{
      submitButton.disabled = false;
      submitButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }

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
                  <i className="bi bi-card-heading me-2"></i>Title 
                  <span><p class = "subtext">Must be 7 Characters</p></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={formData.title}
                  onChange={onChange}
                  placeholder="e.g., MATH101"
                  maxlength = "7"
                  minlength = "7"
                  required
                  style={{
                    background: 'rgba(102, 126, 234, 0.1)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    color: '#e6eef8',
                    padding: '0.75rem'
                  }}
                  onKeyUp={validTitle}
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
                id = "submitBtn"
                style={{
                  background: 'rgba(139, 146, 176, 0.2)',
                  border: 'none',
                  color: '#fff',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease',
                  disabled
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
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