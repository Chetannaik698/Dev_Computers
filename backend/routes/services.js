import express from 'express';
import { listServices, bookService } from '../controllers/serviceController.js';
import { authGuard } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', listServices);
router.post('/book', authGuard, bookService);
export default router;
