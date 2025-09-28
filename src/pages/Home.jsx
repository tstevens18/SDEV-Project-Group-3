import React from 'react'
import { NavLink } from 'react-router-dom'


export default function Home(){
return (
    <div className="text-center py-5">
        <h1 className="display-4 fw-bold">Welcome to Schedule Builder</h1>
        <div className="mt-4 d-flex flex-column align-items-center gap-3">
            <NavLink to="/about" className="btn btn-primary btn-lg">Learn More</NavLink>
            <NavLink to="/courses" className="btn btn-primary btn-lg">Browse Courses</NavLink>
            <NavLink to="/login" className="btn btn-primary btn-lg">Login</NavLink>
        </div>
    </div>
    )
}