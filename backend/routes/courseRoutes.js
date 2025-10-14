import express from 'express';
import Course from '../models/Course.js';
import { authenticate, authorizeTeacher } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { courseNumber: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const courses = await Course.find(query);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', authenticate, authorizeTeacher, async (req, res) => {
  const subject = req.body.subject && req.body.subject.trim() !== '' 
    ? req.body.subject.trim() 
    : 'Not Specified';
  
  const credits = req.body.credits !== undefined && req.body.credits !== '' && req.body.credits !== null 
    ? Number(req.body.credits) 
    : 0;
  
  const course = new Course({
    courseNumber: req.body.courseNumber,
    title: req.body.title,
    description: req.body.description,
    subject: subject,
    credits: credits,
    createdBy: req.user._id
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put('/:id', authenticate, authorizeTeacher, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only edit courses you created' });
    }

    course.courseNumber = req.body.courseNumber || course.courseNumber;
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.subject = req.body.subject && req.body.subject.trim() !== '' ? req.body.subject : course.subject;
    course.credits = req.body.credits !== undefined && req.body.credits !== '' && req.body.credits !== null 
      ? Number(req.body.credits) 
      : course.credits;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', authenticate, authorizeTeacher, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only delete courses you created' });
    }

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;