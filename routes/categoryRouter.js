import { Router } from 'express';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
import {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from '../controllers/categoryController.js';

const router = Router();

router
  .route('/category')
  .get(getCategories)
  .post(auth, authAdmin, createCategory);

router
  .route('/category/:id')
  .delete(auth, authAdmin, deleteCategory)
  .put(auth, authAdmin, updateCategory);

export default router;
