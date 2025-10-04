import React from 'react'


export default function Login(){
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="col-md-5 col-lg-4">
                <div className="glass-card p-5 fade-in-up">
                    <div className="text-center mb-4">
                        <div className="mb-3">
                            <span style={{fontSize: '3rem'}}>🔐</span>
                        </div>
                        <h2 className="fw-bold mb-2">Welcome Back</h2>
                        <p className="text-muted">Sign in to continue to Schedule Builder</p>
                    </div>

                    <form>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-envelope me-2"></i>Email Address
                            </label>
                            <input 
                                type="email" 
                                className="form-control form-control-lg" 
                                placeholder="your.email@example.com" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-lock me-2"></i>Password
                            </label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                placeholder="Enter your password" 
                                required 
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="rememberMe" />
                                <label className="form-check-label text-muted small" htmlFor="rememberMe">
                                    Remember me
                                </label>
                            </div>
                            <a href="#" className="text-decoration-none small" style={{color: '#667eea'}}>
                                Forgot password?
                            </a>
                        </div>

                        <button type="button" className="btn btn-primary w-100 btn-lg mb-3">
                            <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
                        </button>

                        <div className="text-center mb-3">
                            <span className="text-muted small">or continue with</span>
                        </div>

                        <div className="d-grid gap-2">
                            <button type="button" className="btn btn-outline-light">
                                <i className="bi bi-google me-2"></i>Google
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-muted small mb-0">
                                Don't have an account? 
                                <a href="#" className="text-decoration-none ms-1" style={{color: '#667eea', fontWeight: '600'}}>
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}