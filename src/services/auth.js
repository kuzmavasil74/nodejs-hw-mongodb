import createHttpError from 'http-errors';
import { UserCollection } from '../db/Models/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Session from '../db/Models/session.js';
import { sendEmail } from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';
import { EMAIL_VARS } from '../constants/index.js';
import { ENV_VARS } from '../constants/index.js';
import path from 'path';
import fs from 'fs/promises';
import { TEMPLATES_DIR } from '../constants/index.js';
import handlebars from 'handlebars';
import {
  getFullNameFromGoogleTokenPlayload,
  validateCode,
} from '../utils/googleOAuth.js';

const createSession = () => {
  return {
    accessToken: crypto.randomBytes(20).toString('base64'),
    refreshToken: crypto.randomBytes(20).toString('base64'),
    accessTokenValidUntil: Date.now() + 1000 * 60 * 15, // 15 minutes
    refreshTokenValidUntil: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
};

export const createUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await UserCollection.findOne({ email: payload.email });

  if (user) {
    throw createHttpError(409, 'Email in use');
  }

  return await UserCollection.create({
    ...payload,
    password: hashedPassword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const areEqual = await bcrypt.compare(password, user.password);

  if (!areEqual) {
    throw createHttpError(401, 'Unauthorized!');
  }

  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};

export const logoutUser = async ({ sessionId, sessionToken }) => {
  return await Session.deleteOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });
};

export const refreshSession = async ({ sessionId, sessionToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken: sessionToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token is expired!');
  }

  const user = await UserCollection.findById(session.userId);

  if (!user) {
    throw createHttpError(401, 'Session not found');
  }

  await Session.deleteOne({ _id: sessionId });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};
export const requestResetToken = async (email) => {
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );
  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'send-reset-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${env(ENV_VARS.FRONTEND_HOST)}/reset-password?token=${resetToken}`,
  });
  try {
    await sendEmail({
      from: env(EMAIL_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    console.log('Failed to send email', error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env(ENV_VARS.JWT_SECRET));
  } catch (error) {
    if (error instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw error;
  }

  const user = await UserCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UserCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();

  if (!payload) throw createHttpError(401, 'Unauthorized');

  let user = await UserCollection.findOne({ email: payload.email });

  if (!user) {
    const password = await bcrypt.hash(crypto.randomBytes(10), 10);

    user = await UserCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPlayload(payload),
      password,
      role: 'parent',
    });
  }
  await Session.deleteOne({ userId: user._id });

  return await Session.create({
    userId: user._id,
    ...createSession(),
  });
};
