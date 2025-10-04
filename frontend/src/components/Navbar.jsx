import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{
            background: 'rgba(26, 31, 58, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(102, 126, 234, 0.2)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
            <div className="container">
                <NavLink className="navbar-brand fw-bold" to="/" style={{
                    fontSize: '1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '700',
                    textShadow: '0 0 1px rgba(102, 126, 234, 0.5)'
                }}>
                    <i className="bi bi-calendar-check me-2" style={{
                        WebkitTextFillColor: '#667eea',
                        color: '#667eea'
                    }}></i>
                    Course Manager
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-2">
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                to="/"
                                style={({isActive}) => ({
                                    transition: 'all 0.3s ease',
                                    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                })}
                            >
                                <i className="bi bi-house-door me-1"></i>Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                to="/about"
                                style={({isActive}) => ({
                                    transition: 'all 0.3s ease',
                                    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                })}
                            >
                                <i className="bi bi-info-circle me-1"></i>About
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                to="/courses"
                                style={({isActive}) => ({
                                    transition: 'all 0.3s ease',
                                    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                })}
                            >
                                <i className="bi bi-book me-1"></i>Courses
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                to="/login"
                                style={({isActive}) => ({
                                    transition: 'all 0.3s ease',
                                    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                })}
                            >
                                <i className="bi bi-box-arrow-in-right me-1"></i>Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}