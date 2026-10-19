import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import userRoutes from './routes/userRoutes.js';

await connectDB();

const app = express();
const allowedOrigins = [
    'http://localhost:5173', 'https://localhost:5173',
    'http://127.0.0.1:5173', 'https://127.0.0.1:5173',
    'https://edukatura.vercel.app', 
    'https://edukatura.onrender.com'
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)),
    credentials: true
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

const PORT = process.env.NODE_ENV === "development" ?
    process.env.LOCAL_SERVER_PORT : process.env.RENDER_SERVER_PORT || process.env.LOCAL_SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
