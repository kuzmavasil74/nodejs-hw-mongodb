import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrWrapper.js';
import {
  getOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshTokenController,
  registerUserController,
} from '../controllers/auth.js';
import validateBody from '../middleware/validateBody.js';
import { registerUserSchema } from '../validation/registerUserSchema.js';
import { requestResetEmailController } from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/requestResetEmailSchema.js';
import { resetPasswordSchema } from '../validation/resetPasswordSchema.js';
import { resetPasswordController } from '../controllers/auth.js';
import { loginWithGoogleSchema } from '../validation/auth.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
authRouter.post('/login', ctrlWrapper(loginUserController));

authRouter.post('/refresh', ctrlWrapper(refreshTokenController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/oauth-url', ctrlWrapper(getOAuthUrlController));

authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;
