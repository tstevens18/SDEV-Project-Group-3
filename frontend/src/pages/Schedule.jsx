import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart.jsx';
import { useNavigate } from 'react-router-dom';
import { scheduleService } from '../api/scheduleAPI';

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [droppingId, setDroppingId] = useState(null);
  const { isAuthenticated, isStudent } = useAuth();
  const { loadEnrolledCourses } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isStudent()) {
      loadSchedule();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, isStudent]);

  const loadSchedule = async () => {
    try {
      setLoading(true);
      const data = await scheduleService.getSchedule();
      const validCourses = data.filter(course => course && course._id);
      setSchedule(validCourses);
    } catch (error) {
      console.error('Error loading schedule:', error);
      alert('Error loading schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDropCourse = async (courseId, courseTitle) => {
    if (!window.confirm(`Are you sure you want to drop "${courseTitle}"?`)) {
      return;
    }

    setDroppingId(courseId);
    try {
      const result = await scheduleService.dropCourse(courseId);
      setSchedule(result.schedule);
      await loadEnrolledCourses();
    } catch (error) {
      alert(error.message || 'Failed to drop course');
    } finally {
      setDroppingId(null);
    }
  };

  if (!isAuthenticated() || !isStudent()) {
    return (
      <div className="py-5 text-center">
        <div className="glass-card p-5 mx-auto" style={{maxWidth: '500px'}}>
          <i className="bi bi-lock text-warning" style={{fontSize: '3rem'}}></i>
          <h3 className="mt-3">Access Restricted</h3>
          <p className="text-muted">You need to be logged in as a student to view your schedule.</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => navigate('/login')}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none'
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading your schedule...</p>
      </div>
    );
  }

  const totalCredits = schedule.reduce((sum, course) => {
    if (!course) return sum;
    return sum + (course.credits || 0);
  }, 0);

  return (
    <div className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 fade-in-up">
        <div>
          <h2 className="fw-bold mb-2">
            <span className="text-gradient">My Schedule</span>
          </h2>
          <p className="text-muted mb-0">
            {schedule.length === 0 
              ? 'You are not enrolled in any courses' 
              : `${schedule.length} course${schedule.length !== 1 ? 's' : ''} • ${totalCredits} credit${totalCredits !== 1 ? 's' : ''}`
            }
          </p>
        </div>
      </div>

      {schedule.length === 0 ? (
        <div className="text-center py-5">
          <div className="glass-card p-5 mx-auto" style={{maxWidth: '500px'}}>
            <i className="bi bi-calendar-x" style={{fontSize: '4rem', color: '#667eea'}}></i>
            <h3 className="mt-4 mb-3">No Enrolled Courses</h3>
            <p className="text-muted mb-4">Start adding courses to your cart and checkout to build your schedule!</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/courses')}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
            >
              <i className="bi bi-book me-2"></i>Browse Courses
            </button>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {schedule.map((course, index) => {
            if (!course || !course._id) return null;
            
            return (
            <div key={course._id} className="col-12 col-md-6 col-lg-4">
              <div 
                className="glass-card p-4 h-100 fade-in-up"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h4 className="fw-bold mb-0" style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: '1.25rem'
                  }}>
                    {course.title}
                  </h4>
                  <span className="badge" style={{
                    background: 'rgba(102, 126, 234, 0.2)',
                    color: '#667eea',
                    fontSize: '0.85rem',
                    padding: '0.4rem 0.8rem'
                  }}>
                    {course.credits || 0} Credits
                  </span>
                </div>

                <p className="text-muted mb-3">
                  <i className="bi bi-book me-2"></i>
                  {course.subject || 'Not Specified'}
                </p>

                <p className="text-light mb-4" style={{fontSize: '0.95rem'}}>
                  {course.description}
                </p>

                <button 
                  className="btn btn-sm w-100"
                  onClick={() => handleDropCourse(course._id, course.title)}
                  disabled={droppingId === course._id}
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
                  {droppingId === course._id ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Dropping...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-x-circle me-2"></i>
                      Drop Course
                    </>
                  )}
                </button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}