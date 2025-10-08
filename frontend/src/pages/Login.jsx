import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Login(){
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const { login, register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let result
            if (isLogin) {
                result = await login(formData.email, formData.password)
            } else {
                result = await register(formData.name, formData.email, formData.password, formData.role)
            }

            if (result.success) {
                navigate('/courses')
            } else {
                setError(result.error || 'Authentication failed')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="col-md-6 col-lg-5">
                <div className="glass-card p-5 fade-in-up">
                    <div className="text-center mb-4">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>🔐</span>
                        </div>
                        <h2 className="fw-bold mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-muted">
                            {isLogin ? 'Sign in to continue to Course Manager' : 'Register to get started'}
                        </p>
                    </div>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-3">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-person me-2"></i>Full Name
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    className="form-control form-control-lg" 
                                    placeholder="John Doe" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                        )}

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-envelope me-2"></i>Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                className="form-control form-control-lg" 
                                placeholder="your.email@example.com" 
                                value={formData.email}
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-lock me-2"></i>Password
                            </label>
                            <input 
                                type="password" 
                                name="password"
                                className="form-control form-control-lg" 
                                placeholder="Enter your password" 
                                value={formData.password}
                                onChange={handleChange}
                                required 
                                minLength={6}
                            />
                        </div>

                        {!isLogin && (
                            <div className="mb-4">
                                <label className="form-label fw-semibold">
                                    <i className="bi bi-person-badge me-2"></i>I am a:
                                </label>
                                <div className="d-flex gap-3">
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="role" 
                                            id="roleStudent"
                                            value="student"
                                            checked={formData.role === 'student'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="roleStudent">
                                            Student
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name="role" 
                                            id="roleTeacher"
                                            value="teacher"
                                            checked={formData.role === 'teacher'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="roleTeacher">
                                            Teacher
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100 btn-lg mb-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                </>
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-muted small mb-0">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <a 
                                    href="#" 
                                    className="text-decoration-none ms-1" 
                                    style={{color: '#667eea', fontWeight: '600'}}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsLogin(!isLogin)
                                        setError('')
                                    }}
                                >
                                    {isLogin ? 'Sign up' : 'Sign in'}
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}