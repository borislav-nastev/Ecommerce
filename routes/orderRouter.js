import { Router } from 'express';
import auth from '../middleware/auth.js';
import authAdmin from '../middleware/authAdmin.js';
import {
  getOrders,
  createOrder,
  deleteOrder,
  updateOrder,
} from '../controllers/orderController.js';

const router = Router();

router.route('/order').get(auth, getOrders).post(auth, createOrder);

router
  .route('/order/:id')
  .delete(auth, authAdmin, deleteOrder)
  .put(auth, authAdmin, updateOrder);

export default router;
