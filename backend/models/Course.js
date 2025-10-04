import mongoose from 'mongoose';

const courseModel = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    default: 'Not Specified'
  },
  credits: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 10
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseModel);

export default Course;