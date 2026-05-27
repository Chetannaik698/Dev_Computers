import express from 'express';
import multer from 'multer';
import { uploadImages } from '../controllers/uploadController.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/cloudinary', authGuard, adminGuard, upload.array('images', 4), uploadImages);

export default router;
