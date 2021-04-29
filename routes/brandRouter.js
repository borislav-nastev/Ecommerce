import { Router } from 'express';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
import {
  getBrands,
  createBrand,
  deleteBrand,
  updateBrand,
} from '../controllers/brandController.js';

const router = Router();

router.route('/brand').get(getBrands).post(auth, authAdmin, createBrand);

router
  .route('/brand/:id')
  .delete(auth, authAdmin, deleteBrand)
  .put(auth, authAdmin, updateBrand);

export default router;
