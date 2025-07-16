import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    const todoCount = await prisma.todo.count();
    res.json({ 
      message: 'Database connected successfully!',
      users: userCount,
      todos: todoCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});