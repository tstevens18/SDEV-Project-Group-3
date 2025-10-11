import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'


export default function Home(){
    const { isAuthenticated, user, isTeacher, isStudent } = useAuth()

return (
    <div className="text-center py-5">
        <div className="fade-in-up mb-5">
            <h1 className="display-3 fw-bold mb-3">
                Welcome to <span className="text-gradient">Course Manager</span>
            </h1>
            <p className="lead text-muted mb-4" style={{maxWidth: '700px', margin: '0 auto'}}>
                {isTeacher() 
                    ? 'A powerful course management system for educators. Create, view, update, and delete courses with ease.'
                    : isStudent()
                    ? 'Browse courses, build your schedule, and manage your academic journey with ease.'
                    : 'A comprehensive platform for course management and student enrollment.'
                }
            </p>
            {isAuthenticated() && (
                <div 
                    className="glass-card d-inline-block px-4 py-3 mb-3"
                    style={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        border: '1px solid rgba(102, 126, 234, 0.3)',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)'
                    }}
                >
                    <i className="bi bi-check-circle-fill me-2" style={{color: '#667eea'}}></i>
                    <span className="text-light">Welcome back, </span>
                    <strong className="text-gradient">{user?.name}</strong>
                    <span className="badge ms-2" style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: '0.75rem'
                    }}>
                        {user?.role}
                    </span>
                </div>
            )}
        </div>

        {isTeacher() ? (
            <div className="row g-4 mb-5 fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>➕</span>
                        </div>
                        <h4 className="fw-bold mb-3">Create</h4>
                        <p className="text-muted">Add new courses with title, subject, credits, and description.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>📖</span>
                        </div>
                        <h4 className="fw-bold mb-3">Read</h4>
                        <p className="text-muted">Browse and view all available courses with detailed information.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>✏️</span>
                        </div>
                        <h4 className="fw-bold mb-3">Update</h4>
                        <p className="text-muted">Edit existing course details to keep information current.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>🗑️</span>
                        </div>
                        <h4 className="fw-bold mb-3">Delete</h4>
                        <p className="text-muted">Remove courses that are no longer needed from the system.</p>
                    </div>
                </div>
            </div>
        ) : isStudent() ? (
            <div className="row g-4 mb-5 fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>🔍</span>
                        </div>
                        <h4 className="fw-bold mb-3">Browse</h4>
                        <p className="text-muted">Explore available courses and find the perfect classes for you.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>🛒</span>
                        </div>
                        <h4 className="fw-bold mb-3">Add to Cart</h4>
                        <p className="text-muted">Select courses and add them to your cart before enrolling.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>✅</span>
                        </div>
                        <h4 className="fw-bold mb-3">Enroll</h4>
                        <p className="text-muted">Checkout your cart to officially enroll in your selected courses.</p>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>📅</span>
                        </div>
                        <h4 className="fw-bold mb-3">Manage Schedule</h4>
                        <p className="text-muted">View your enrolled courses and drop classes if needed.</p>
                    </div>
                </div>
            </div>
        ) : (
            <div className="row g-4 mb-5 fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="col-md-6">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>👨‍🏫</span>
                        </div>
                        <h4 className="fw-bold mb-3">For Teachers</h4>
                        <p className="text-muted">Create, update, and delete courses. Manage your course catalog with full CRUD capabilities.</p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="glass-card p-4 h-100">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>🎓</span>
                        </div>
                        <h4 className="fw-bold mb-3">For Students</h4>
                        <p className="text-muted">Browse courses, add them to your cart, enroll in classes, and manage your schedule.</p>
                    </div>
                </div>
            </div>
        )}

        <div className="d-flex flex-wrap justify-content-center gap-3 fade-in-up" style={{animationDelay: '0.4s'}}>
            {isTeacher() ? (
                <NavLink to="/courses" className="btn btn-primary btn-lg px-5">
                    <i className="bi bi-pencil-square me-2"></i>Manage Courses
                </NavLink>
            ) : isStudent() ? (
                <>
                    <NavLink to="/courses" className="btn btn-primary btn-lg px-5">
                        <i className="bi bi-book me-2"></i>Browse Courses
                    </NavLink>
                    <NavLink 
                        to="/schedule" 
                        className="btn btn-lg px-5"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="bi bi-calendar-check me-2"></i>My Schedule
                    </NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/courses" className="btn btn-primary btn-lg px-5">
                        <i className="bi bi-book me-2"></i>View Courses
                    </NavLink>
                    <NavLink 
                        to="/login" 
                        className="btn btn-lg px-5"
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: 'none',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i>Login / Sign Up
                    </NavLink>
                </>
            )}
            <NavLink to="/about" className="btn btn-outline-light btn-lg px-5">
                <i className="bi bi-info-circle me-2"></i>Learn More
            </NavLink>
        </div>
    </div>
    )
}