import {
  createUser,
  loginOrSignupWithGoogle,
  loginUser,
  logoutUser,
  refreshSession,
  resetPassword,
} from '../services/auth.js';

import { requestResetToken } from '../services/auth.js';
import { generateOAuthURL } from '../utils/googleOAuth.js';
// створення сесій кукків
const setupSessionCookies = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
  res.cookie('sessionToken', session.refreshToken, {
    httpOnly: true,
    expire: 7 * 24 * 60 * 60,
  });
};
// створення користувача при реєстрації
export const registerUserController = async (req, res) => {
  const user = await createUser(req.body);

  res.status(201).json({
    message: 'Successfully registered a user!',
    data: { user },
  });
};
// авторизація
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};
// вихід
export const logoutUserController = async (req, res) => {
  await logoutUser({
    sessionId: req.cookies.sessionId,
    sessionToken: req.cookies.sessionToken,
  });

  res.clearCookie('sessionId');
  res.clearCookie('sessionToken');

  res.status(204).send();

  res.json({
    status: 204,
    message: 'Successfully logged out an user!',
    data: {},
  });
};
// перезавантаження
export const refreshTokenController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ sessionId, sessionToken });

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email has been successfully sent.',
    status: 200,
    data: {},
  });
};
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
  });
};

export const getOAuthUrlController = async (req, res) => {
  const url = generateOAuthURL();
  res.json({
    sratus: 200,
    message: 'OAuth url has been successfully generated.',
    data: { url },
  });
};

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: { accessToken: session.accessToken },
  });
};
