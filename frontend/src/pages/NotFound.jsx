import React from 'react'
import { NavLink } from 'react-router-dom'


export default function NotFound(){
    return (
        <div className="text-center py-5">
            <div className="fade-in-up">
                <div className="mb-4">
                    <h1 className="display-1 fw-bold text-gradient" style={{fontSize: '8rem'}}>404</h1>
                </div>

                <div className="mb-4">
                    <h2 className="fw-bold mb-3">Oops! Page Not Found</h2>
                    <p className="text-muted lead mb-4" style={{maxWidth: '500px', margin: '0 auto'}}>
                        The page you're looking for seems to have wandered off into the digital void. 
                        Let's get you back on track!
                    </p>
                </div>

                <div className="glass-card p-4 mb-4" style={{maxWidth: '600px', margin: '0 auto'}}>
                    <h5 className="fw-bold mb-3">Here are some helpful links:</h5>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <NavLink to="/" className="btn btn-outline-light">
                            <i className="bi bi-house-door me-2"></i>Home
                        </NavLink>
                        <NavLink to="/courses" className="btn btn-outline-light">
                            <i className="bi bi-book me-2"></i>Courses
                        </NavLink>
                        <NavLink to="/about" className="btn btn-outline-light">
                            <i className="bi bi-info-circle me-2"></i>About
                        </NavLink>
                    </div>
                </div>

                <NavLink to="/" className="btn btn-primary btn-lg px-5">
                    <i className="bi bi-arrow-left me-2"></i>Back to Home
                </NavLink>
            </div>
        </div>
    )
}