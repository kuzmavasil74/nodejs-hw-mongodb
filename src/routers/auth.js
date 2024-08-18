import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrWrapper.js';
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  refreshTokenController,
} from '../controllers/auth.js';
import validateBody from '../middleware/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';

const authRouter = Router();

// роутер для реєстрації
authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
// роутер для авторизації
authRouter.post('/login', ctrlWrapper(loginUserController));
// роутер для виходу з аккаунту
authRouter.post('/logout', ctrlWrapper(logoutUserController));
// роутер для оновлення токенів
authRouter.post('/refresh-token', ctrlWrapper(refreshTokenController));

export default authRouter;
