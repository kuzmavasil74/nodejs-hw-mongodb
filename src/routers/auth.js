import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from '../controllers/auth.js';
import validateBody from '../middleware/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post('/login', ctrlWrapper(loginUserController));
authRouter.post('/logout', ctrlWrapper(logoutUserController));
authRouter.post('/refresh-token', ctrlWrapper(refreshTokenController));

export default authRouter;
