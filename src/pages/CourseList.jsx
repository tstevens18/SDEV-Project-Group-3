import React from 'react'


export default function CourseList(){
const courses = [
    {id: 1, title: 'Math 101', description: 'This is a math course'},
    {id: 2, title: 'Science 101', description: 'This is a science course'},
    {id: 3, title: 'English 101', description: 'This is an english course'},
]


return (
    <div className="py-5">
        <h2 className="mb-4">Available Courses</h2>
        <div className="row">
            {courses.map(course => (
                <div key={course.id} className="col-md-4 mb-3">
                    <div className="card h-100 bg-dark text-light">
                        <div className="card-body">
                            <h5 className="card-title">{course.title}</h5>
                            <p className="card-text">{course.description}</p>
                            <button className="btn btn-primary">View Details</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}