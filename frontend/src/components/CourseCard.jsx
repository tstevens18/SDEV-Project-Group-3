import React from 'react';

export default function CourseCard({ course, index, onEdit, onDelete }) {
  return (
    <div className="col-md-6 col-lg-4">
      <div 
        className="glass-card h-100 p-4 fade-in-up" 
        style={{
          animationDelay: `${index * 0.1}s`,
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 8px 30px rgba(102, 126, 234, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <div className="d-flex flex-column h-100">
          <div className="mb-3">
            <div className="mb-3">
              <label className="text-muted small fw-bold mb-2" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                TITLE
              </label>
              <h4 className="fw-bold mb-0" style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                {course.title}
              </h4>
            </div>
            
            <div className="mb-3">
              <label className="text-muted small fw-bold mb-2" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                SUBJECT
              </label>
              <p className="text-light mb-0" style={{fontSize: '1.1rem', lineHeight: '1.6'}}>
                <i className="bi bi-book me-2" style={{color: '#667eea'}}></i>{course.subject || 'Not Specified'}
              </p>
            </div>

            <div className="mb-3">
              <label className="text-muted small fw-bold mb-2" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                CREDITS
              </label>
              <p className="text-light mb-0" style={{fontSize: '1.1rem', lineHeight: '1.6'}}>
                <i className="bi bi-star me-2" style={{color: '#a78bfa'}}></i>{course.credits !== undefined ? course.credits : 0} Credits
              </p>
            </div>
            
            <div className="mb-3" style={{
              borderTop: '1px solid rgba(102, 126, 234, 0.2)',
              paddingTop: '1rem'
            }}>
              <label className="text-muted small fw-bold mb-2" style={{fontSize: '0.75rem', letterSpacing: '0.5px'}}>
                DESCRIPTION
              </label>
              <p className="text-light mb-0" style={{fontSize: '0.95rem', lineHeight: '1.6'}}>
                {course.description}
              </p>
            </div>
          </div>
          
          <div className="d-flex gap-2 mt-auto">
            <button 
              className="btn btn-sm flex-fill" 
              onClick={() => onEdit(course)}
              style={{
                background: 'rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                color: '#667eea',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.3)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                e.target.style.borderColor = 'rgba(102, 126, 234, 0.3)';
              }}
            >
              <i className="bi bi-pencil me-1"></i>Edit
            </button>
            <button 
              className="btn btn-sm flex-fill" 
              onClick={() => onDelete(course._id)}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.3)';
                e.target.style.borderColor = 'rgba(239, 68, 68, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(239, 68, 68, 0.2)';
                e.target.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
            >
              <i className="bi bi-trash me-1"></i>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}