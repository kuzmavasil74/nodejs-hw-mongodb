import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
  resetPassword,
} from '../services/auth.js';

import { requestResetToken } from '../services/auth.js';
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
    message: 'User is created!',
    data: { user },
  });
};
// авторизація
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'User is logged in!',
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
};
// перезавантаження
export const refreshTokenController = async (req, res) => {
  const { sessionId, sessionToken } = req.cookies;
  const session = await refreshSession({ sessionId, sessionToken });

  setupSessionCookies(res, session);

  res.json({
    status: 200,
    message: 'Token refreshed successfuly!',
    data: { accessToken: session.accessToken },
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfuly sent!',
    status: 200,
    data: {},
  });
};
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
