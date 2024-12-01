import express from 'express';
import { authRoutes } from './auth-routes.js';
import { apiRoutes } from './api/index.js';
import { authenticateToken } from '../Middleware/auth.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.all('/api', authenticateToken, apiRoutes);

export {router as routes };