import { useState, useEffect } from 'react';
import { courseService } from '../api/courseAPI';

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({ 
    courseNumber: '',
    title: '', 
    description: '', 
    subject: '', 
    credits: '' 
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async (search = '') => {
    try {
      setLoading(true);
      const data = await courseService.fetchAll(search);
      setCourses(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    fetchCourses(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchCourses(''); 
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        ...formData,
        credits: parseFloat(formData.credits) || 0
      };
      await courseService.create(courseData);
      await fetchCourses();
      handleClosePopup();
    } catch (err) {
      setError(err.message);
      console.error('Error creating course:', err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        ...formData,
        credits: parseFloat(formData.credits) || 0
      };
      await courseService.update(editingCourse._id, courseData);
      await fetchCourses();
      handleClosePopup();
    } catch (err) {
      setError(err.message);
      console.error('Error updating course:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await courseService.delete(id);
      await fetchCourses();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting course:', err);
    }
  };

  const handleOpenPopup = (course = null) => {
    setEditingCourse(course);
    setFormData(course ? { 
      courseNumber: course.courseNumber,
      title: course.title, 
      description: course.description,
      subject: course.subject,
      credits: course.credits
    } : { 
      courseNumber: '',
      title: '', 
      description: '',
      subject: '',
      credits: ''
    });
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditingCourse(null);
    setFormData({ courseNumber: '', title: '', description: '', subject: '', credits: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return {
    courses,
    loading,
    error,
    showPopup,
    editingCourse,
    formData,
    searchQuery,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleOpenPopup,
    handleClosePopup,
    handleInputChange,
    handleSearch,
    handleSearchSubmit,
    handleClearSearch
  };
}