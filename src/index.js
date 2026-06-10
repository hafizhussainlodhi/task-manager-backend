import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoute.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Purana cors hata kar yeh likh dein
app.use(cors({
    origin: true,
    credentials: true
}));
// Auth Route
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('Task Manager API chal rahi hai! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server port ${PORT} par daud raha hai...`);
});