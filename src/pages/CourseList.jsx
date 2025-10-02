import React from 'react'


export default function CourseList(){
const courses = [
    {id: 1, title: 'Math 101', description: 'This is a math course'},
    {id: 2, title: 'Science 101', description: 'This is a science course'},
    {id: 3, title: 'English 101', description: 'This is an english course'},
]

//This function runs when 'update course' is selected.
//This function takes the course id as an argurment
function updateCourse(courseID){

    //the course object is taken from the array based on its ID
    const course = courses.find(i => i.id === courseID)
    console.log(course)

    let html = " "

    //if the course exists
    if(course){

        //html form for the title and description, prepopulated with the course information
        html += "<div><label for='title'>Title</label><input type='text' id = 'title' value = "+course.title+"></div>"
        html += "<div><label for='description'>Description</label><textarea rows='4' cols='50' id = 'description'>"+course.description+"</textarea></div>"
        html += "<div><input type='button' id = 'updateBtn' value = 'Update'/></div>"

        document.querySelector("#updateForm").innerHTML = html
        
        document.querySelector("#updateBtn").addEventListener("click", submitUpdate)

        //function for submiting the update form
        //This function does not yet actually update the course information, it just prints the new course information
        //to the console
        function submitUpdate(courseID){
            console.log("course updated")
            let newTitle = document.querySelector("#title").value
            let newDescription = document.querySelector("#description").value
            course.title = newTitle
            course.description = newDescription

            console.log("The new course is " + newTitle + " & " + newDescription)
        }

    }
    else{
        console.log("course does not exist")
    }
}


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

                            {/* when either button is clicked, the course id is used to build the next page*/}
                            <button className="btn btn-primary">View Details</button>
                            <button className ="btn btn-primary" onClick={() => updateCourse(course.id)}>Update Course</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div>
            <form id = "updateForm">
            </form>
        </div>
    </div>
    )
}