import mongoose from 'mongoose';

const courseModel = new mongoose.Schema({
  courseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
    maxlength: 7,
    validate: {
      validator: function(v) {
        
        return /^[A-Z]{4}[0-9]{3}$/.test(v);
      },
      message: props => `${props.value} is not a valid course number! Must be 4 uppercase letters followed by 3 digits (e.g., MATH101, CSCI201)`
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 250
  },
  subject: {
    type: String,
    required: true,
    default: 'Not Specified',
    maxlength: 50
  },
  credits: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 10
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseModel);

export default Course;