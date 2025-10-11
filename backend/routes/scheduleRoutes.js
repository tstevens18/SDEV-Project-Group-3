import express from 'express';
import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      student: req.user._id,
      status: 'active'
    }).populate('course');
    
    const validEnrollments = enrollments.filter(enrollment => enrollment.course !== null);
    
    const invalidEnrollments = enrollments.filter(enrollment => enrollment.course === null);
    for (const enrollment of invalidEnrollments) {
      enrollment.status = 'dropped';
      await enrollment.save();
    }
    
    const schedule = validEnrollments.map(enrollment => enrollment.course);
    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/enrolled-ids', authenticate, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ 
      student: req.user._id,
      status: 'active'
    }).populate('course');
    
    const validEnrollments = enrollments.filter(enrollment => enrollment.course !== null);
    
    const invalidEnrollments = enrollments.filter(enrollment => enrollment.course === null);
    for (const enrollment of invalidEnrollments) {
      enrollment.status = 'dropped';
      await enrollment.save();
    }
    
    const courseIds = validEnrollments.map(enrollment => enrollment.course._id.toString());
    res.json(courseIds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/checkout', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const enrollments = [];
    const alreadyEnrolled = [];
    
    for (const course of user.cart) {
      const activeEnrollment = await Enrollment.findOne({
        student: user._id,
        course: course._id,
        status: 'active'
      });

      if (activeEnrollment) {
        alreadyEnrolled.push(course.title);
        continue;
      }

      const droppedEnrollment = await Enrollment.findOne({
        student: user._id,
        course: course._id,
        status: 'dropped'
      });

      if (droppedEnrollment) {
        droppedEnrollment.status = 'active';
        droppedEnrollment.enrolledAt = new Date();
        await droppedEnrollment.save();
        enrollments.push(droppedEnrollment);
      } else {
        const enrollment = await Enrollment.create({
          student: user._id,
          course: course._id
        });
        enrollments.push(enrollment);
      }
    }

    user.cart = [];
    await user.save();

    const populatedEnrollments = await Enrollment.find({
      _id: { $in: enrollments.map(e => e._id) }
    }).populate('course');

    const validEnrollments = populatedEnrollments.filter(e => e.course !== null);

    res.json({
      message: 'Checkout successful',
      enrolledCourses: validEnrollments.length,
      alreadyEnrolled: alreadyEnrolled,
      schedule: validEnrollments.map(e => e.course)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/drop/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
      status: 'active'
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.status = 'dropped';
    await enrollment.save();

    const updatedSchedule = await Enrollment.find({ 
      student: req.user._id,
      status: 'active'
    }).populate('course');

    const validSchedule = updatedSchedule.filter(e => e.course !== null);

    res.json({
      message: 'Course dropped successfully',
      schedule: validSchedule.map(e => e.course)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;