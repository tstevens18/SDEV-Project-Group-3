import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('cart');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.cart || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/add/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
      status: 'active'
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    if (user.cart.includes(courseId)) {
      return res.status(400).json({ message: 'Course already in cart' });
    }

    user.cart.push(courseId);
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate('cart');
    res.json({ 
      message: 'Course added to cart', 
      cart: updatedUser.cart 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/remove/:courseId', authenticate, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(id => id.toString() !== courseId);
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate('cart');
    res.json({ 
      message: 'Course removed from cart', 
      cart: updatedUser.cart 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/clear', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = [];
    await user.save();

    res.json({ message: 'Cart cleared', cart: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;