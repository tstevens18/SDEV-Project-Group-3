import React from 'react'
import { NavLink } from 'react-router-dom'


export default function NotFound(){
    return (
        <div className="text-center py-5">
            <h2 className="fw-bold">404 - Page Not Found</h2>
            <p className="text-muted">The page you’re looking for doesn’t exist.</p>
            <NavLink to="/" className="btn btn-primary mt-3">Back to Home</NavLink>
        </div>
    )
}