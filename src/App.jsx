import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import CourseList from './pages/CourseList'
import Login from './pages/Login'
import NotFound from './pages/NotFound'


export default function App(){
return (
  <HashRouter>
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <main className="flex-grow-1 container py-4">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </main>
  </div>
  </HashRouter>
)
}