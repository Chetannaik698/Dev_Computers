import express from 'express';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { authGuard, adminGuard } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', authGuard, adminGuard, createProduct);
router.put('/:id', authGuard, adminGuard, updateProduct);
router.delete('/:id', authGuard, adminGuard, deleteProduct);
export default router;
