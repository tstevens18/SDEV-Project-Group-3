import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Home(){
return (
    <div className="text-center py-5">
        <div className="fade-in-up mb-5">
            <h1 className="display-3 fw-bold mb-3">
                Welcome to <span className="text-gradient">Course Manager</span>
            </h1>
            <p className="lead text-muted mb-4" style={{maxWidth: '700px', margin: '0 auto'}}>
                A powerful course management system. Create, view, update, and delete courses with ease.
            </p>
        </div>

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

        <div className="d-flex flex-wrap justify-content-center gap-3 fade-in-up" style={{animationDelay: '0.4s'}}>
            <NavLink to="/courses" className="btn btn-primary btn-lg px-5">
                <i className="bi bi-book me-2"></i>Manage Courses
            </NavLink>
            <NavLink to="/about" className="btn btn-outline-light btn-lg px-5">
                <i className="bi bi-info-circle me-2"></i>Learn More
            </NavLink>
        </div>
    </div>
    )
}