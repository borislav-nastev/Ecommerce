import { Router } from 'express';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
import {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productController.js';

const router = Router();

router
  .route('/products')
  .get(getAllProducts)
  .post(auth, authAdmin, createProduct);

router
  .route('/products/:id')
  .delete(auth, authAdmin, deleteProduct)
  .put(auth, authAdmin, updateProduct);

export default router;
