import React, { useState } from 'react';
import { useCart } from '../hooks/useCart.jsx';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { scheduleService } from '../api/scheduleAPI';

export default function Cart() {
  const { cart, loading, removeFromCart, clearCart, cartCount, loadCart, loadEnrolledCourses } = useCart();
  const { isAuthenticated, isStudent } = useAuth();
  const navigate = useNavigate();
  const [removingId, setRemovingId] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isAuthenticated() || !isStudent()) {
    return (
      <div className="py-5 text-center">
        <div className="glass-card p-5 mx-auto" style={{maxWidth: '500px'}}>
          <i className="bi bi-lock text-warning" style={{fontSize: '3rem'}}></i>
          <h3 className="mt-3">Access Restricted</h3>
          <p className="text-muted">You need to be logged in as a student to view your cart.</p>
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

  const handleRemove = async (courseId) => {
    setRemovingId(courseId);
    try {
      const result = await removeFromCart(courseId);
      if (!result.success) {
        alert(result.message);
      }
    } finally {
      setRemovingId(null);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      const result = await clearCart();
      if (!result.success) {
        alert(result.message);
      }
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const result = await scheduleService.checkout();
      
      let message = `Successfully enrolled in ${result.enrolledCourses} course${result.enrolledCourses !== 1 ? 's' : ''}!`;
      
      if (result.alreadyEnrolled && result.alreadyEnrolled.length > 0) {
        message += `\n\nAlready enrolled in: ${result.alreadyEnrolled.join(', ')}`;
      }
      
      alert(message);
      await loadCart();
      await loadEnrolledCourses();
      navigate('/schedule');
    } catch (error) {
      alert(error.message || 'Failed to checkout');
    } finally {
      setCheckingOut(false);
    }
  };

  const totalCredits = cart.reduce((sum, course) => sum + (course.credits || 0), 0);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5 fade-in-up">
        <div>
          <h2 className="fw-bold mb-2">
            <span className="text-gradient">My Shopping Cart</span>
          </h2>
          <p className="text-muted mb-0">
            {cartCount === 0 ? 'Your cart is empty' : `${cartCount} course${cartCount !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        {cartCount > 0 && (
          <button 
            className="btn btn-outline-danger" 
            onClick={handleClearCart}
          >
            <i className="bi bi-trash me-2"></i>Clear Cart
          </button>
        )}
      </div>

      {cartCount === 0 ? (
        <div className="text-center py-5">
          <div className="glass-card p-5 mx-auto" style={{maxWidth: '500px'}}>
            <i className="bi bi-cart-x" style={{fontSize: '4rem', color: '#667eea'}}></i>
            <h3 className="mt-4 mb-3">Your cart is empty</h3>
            <p className="text-muted mb-4">Start adding courses to your cart to see them here!</p>
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
        <>
          <div className="row g-4 mb-4">
            {cart.map((course, index) => (
              <div key={course._id} className="col-12">
                <div 
                  className="glass-card p-4 fade-in-up"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h4 className="fw-bold mb-2" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {course.title}
                      </h4>
                      <p className="text-muted mb-2">
                        <i className="bi bi-book me-2"></i>
                        {course.subject || 'Not Specified'}
                      </p>
                      <p className="text-light mb-0" style={{fontSize: '0.95rem'}}>
                        {course.description}
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <div className="mb-3">
                        <span className="badge" style={{
                          background: 'rgba(102, 126, 234, 0.2)',
                          color: '#667eea',
                          fontSize: '1rem',
                          padding: '0.5rem 1rem'
                        }}>
                          <i className="bi bi-star me-2"></i>
                          {course.credits || 0} Credits
                        </span>
                      </div>
                      <button 
                        className="btn btn-sm"
                        onClick={() => handleRemove(course._id)}
                        disabled={removingId === course._id}
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
                        {removingId === course._id ? (
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        ) : (
                          <i className="bi bi-trash me-2"></i>
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h4 className="fw-bold mb-2">Cart Summary</h4>
                <p className="text-muted mb-0">
                  Total: {cartCount} course{cartCount !== 1 ? 's' : ''} • {totalCredits} credit{totalCredits !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="col-md-4 text-md-end mt-3 mt-md-0">
                <button 
                  className="btn btn-primary btn-lg"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                  onClick={handleCheckout}
                  disabled={checkingOut}
                >
                  {checkingOut ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>Checkout
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}