import { Router } from 'express';
import {
  register,
  login,
  logout,
  getUser,
} from '../controllers/userController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/info', auth, getUser);

export default router;
