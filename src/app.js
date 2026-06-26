import express from 'express';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import authRouter from './router/auth.router.js';
import leaveRouter from './router/leave.router.js';
import adminRouter from './router/admin.router.js';
import cors from 'cors';

let app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/leave', leaveRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler)

export default app;