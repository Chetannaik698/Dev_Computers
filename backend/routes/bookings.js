import express from 'express';
import { listBookings, createBooking, updateBookingStatus } from '../controllers/bookingController.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authGuard, adminGuard, listBookings);
router.post('/', authGuard, createBooking);
router.put('/:id/status', authGuard, adminGuard, updateBookingStatus);
export default router;
