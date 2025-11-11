import express from 'express';
import catRouter from './api/routes/cat-router.js';
import userRouter from './api/routes/user-router.js';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use the cat router
app.use('/api/v1/cat', catRouter);

// Use the user router
app.use('/api/v1/user', userRouter);

app.use('/public', express.static('public'));

export default app;
