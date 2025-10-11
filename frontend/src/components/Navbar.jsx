import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart.jsx'

export default function Navbar(){
    const { user, logout, isAuthenticated, isStudent } = useAuth()
    const { cartCount } = useCart()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/')
        setIsMenuOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

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
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleMenu}
                    aria-controls="navbarNav" 
                    aria-expanded={isMenuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav ms-auto gap-2">
                        <li className="nav-item">
                            <NavLink 
                                className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                to="/"
                                onClick={closeMenu}
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
                                onClick={closeMenu}
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
                                onClick={closeMenu}
                                style={({isActive}) => ({
                                    transition: 'all 0.3s ease',
                                    background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                })}
                            >
                                <i className="bi bi-book me-1"></i>Courses
                            </NavLink>
                        </li>
                        
                        {isAuthenticated() && isStudent() && (
                            <>
                                <li className="nav-item">
                                    <NavLink 
                                        className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                        to="/cart"
                                        onClick={closeMenu}
                                        style={({isActive}) => ({
                                            transition: 'all 0.3s ease',
                                            background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                                            position: 'relative'
                                        })}
                                    >
                                        <i className="bi bi-cart me-1"></i>Cart
                                        {cartCount > 0 && (
                                            <span className="badge rounded-pill ms-1" style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                fontSize: '0.7rem',
                                                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                                            }}>
                                                {cartCount}
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink 
                                        className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                        to="/schedule"
                                        onClick={closeMenu}
                                        style={({isActive}) => ({
                                            transition: 'all 0.3s ease',
                                            background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                        })}
                                    >
                                        <i className="bi bi-calendar-check me-1"></i>Schedule
                                    </NavLink>
                                </li>
                            </>
                        )}
                        
                        {isAuthenticated() ? (
                            <>
                                <li className="nav-item d-flex align-items-center">
                                    <span className="text-light px-3">
                                        <i className={`bi ${user?.role === 'teacher' ? 'bi-person-badge' : 'bi-person'} me-1`} style={{color: '#667eea'}}></i>
                                        {user?.name}
                                        <span className="badge ms-2" style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            fontSize: '0.7rem',
                                            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                                        }}>
                                            {user?.role}
                                        </span>
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="nav-link px-3 py-2 rounded btn btn-link text-decoration-none"
                                        onClick={handleLogout}
                                        style={{
                                            transition: 'all 0.3s ease',
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'rgba(255, 255, 255, 0.75)'
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i>Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <NavLink 
                                    className={({isActive}) => `nav-link px-3 py-2 rounded ${isActive ? 'active' : ''}`}
                                    to="/login"
                                    onClick={closeMenu}
                                    style={({isActive}) => ({
                                        transition: 'all 0.3s ease',
                                        background: isActive ? 'rgba(102, 126, 234, 0.2)' : 'transparent'
                                    })}
                                >
                                    <i className="bi bi-box-arrow-in-right me-1"></i>Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}