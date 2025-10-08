import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: ['https://tstevens18.github.io', 'http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());


app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sdev255:dbUserPassword@courses.brqsl8u.mongodb.net/coursedb?retryWrites=true&w=majority&appName=courses';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.json({ message: 'Course Manager API is running', status: 'healthy' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});