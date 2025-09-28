import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import questionRoutes from './routes/questionRoutes';
import authRoutes from './routes/authRoutes';
import testRoutes from './routes/testRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/questions', questionRoutes);
app.use('/auth', authRoutes);
app.use('/api/tests', testRoutes);

console.log('Server started with file-based database system');

export default app;
