import React from 'react'


export default function Login(){
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="card bg-dark text-light p-4" style={{maxWidth: '400px', width: '100%'}}>
                <h2 className="mb-4 text-center">Login</h2>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter your password" required />
                    </div>
                    <button type="button" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    )
}