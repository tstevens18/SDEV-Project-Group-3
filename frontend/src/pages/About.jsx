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
                            information efficiently, ensuring accurate and up-to-date course catalogs. Students can 
                            browse available courses, add them to their cart, enroll in classes through checkout, 
                            view their schedule, and drop courses as needed.
                        </p>
                    </div>

                    <div className="row g-4 mb-5 fade-in-up" style={{animationDelay: '0.3s'}}>
                        <div className="col-md-6">
                            <div className="glass-card p-4 h-100">
                                <h4 className="fw-bold mb-3 text-gradient">
                                    <i className="bi bi-person-workspace me-2"></i>For Teachers
                                </h4>
                                <ul className="text-light text-start" style={{fontSize: '1rem', lineHeight: '1.8'}}>
                                    <li>Create new courses with detailed information</li>
                                    <li>Update existing course details</li>
                                    <li>Delete courses from the catalog</li>
                                    <li>Full CRUD operations for course management</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="glass-card p-4 h-100">
                                <h4 className="fw-bold mb-3 text-gradient">
                                    <i className="bi bi-mortarboard me-2"></i>For Students
                                </h4>
                                <ul className="text-light text-start" style={{fontSize: '1rem', lineHeight: '1.8'}}>
                                    <li>Browse and search available courses</li>
                                    <li>Add courses to shopping cart</li>
                                    <li>Enroll in courses through checkout</li>
                                    <li>View and manage your course schedule</li>
                                    <li>Drop courses when needed</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="text-center fade-in-up" style={{animationDelay: '0.4s'}}>
                        <h4 className="mb-4">Ready to get started?</h4>
                        <NavLink to="/courses" className="btn btn-primary btn-lg px-5">
                            <i className="bi bi-arrow-right-circle me-2"></i>View Courses
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}