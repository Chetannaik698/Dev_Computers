import express from 'express';
import { dashboard } from '../controllers/adminController.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/dashboard', authGuard, adminGuard, dashboard);
export default router;
