import React from 'react'
import { NavLink } from 'react-router-dom'


export default function About(){
    return (
        <div className="py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="text-center mb-5 fade-in-up">
                        <h1 className="display-4 fw-bold mb-3">
                            About <span className="text-gradient">Course Manager</span>
                        </h1>
                        <p className="lead text-muted">
                            A comprehensive course management system
                        </p>
                    </div>

                    <div className="glass-card p-5 mb-5 fade-in-up" style={{animationDelay: '0.2s'}}>
                        <h3 className="fw-bold mb-4 text-gradient">Our Mission</h3>
                        <p className="text-light mb-0" style={{fontSize: '1.1rem', lineHeight: '1.8'}}>
                            Course Manager is designed to provide a seamless experience for managing academic courses. 
                            Our platform enables educators to create, read, update, and delete course 
                            information efficiently, ensuring accurate and up-to-date course catalogs. It also allows students to view available courses.
                        </p>
                    </div>

                    <div className="text-center fade-in-up" style={{animationDelay: '0.3s'}}>
                        <h4 className="mb-4">Ready to manage courses?</h4>
                        <NavLink to="/courses" className="btn btn-primary btn-lg px-5">
                            <i className="bi bi-arrow-right-circle me-2"></i>Manage Courses
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}