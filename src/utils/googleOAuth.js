import fs from 'fs';
import path from 'path';
import { env } from '../utils/env.js';
import { GOOGLE } from '../constants/index.js';
import { OAuth2Client } from 'google-auth-library';
import { error } from 'console';
import createHttpError from 'http-errors';
import exp from 'constants';

const googleConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'google.json')).toString(),
);

const client = new OAuth2Client({
  clientId: env(GOOGLE.CLIENT_ID),
  clientSecret: env(GOOGLE.CLIENT_SECRET),
  projectid: googleConfig.web.project_id,
  redirectUri: googleConfig.web.redirect_uris[0],
});

export const generateOAuthURL = () => {
  return client.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};

export const validateCode = async (code) => {
  const response = await client.getToken(code);

  if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');
  const ticket = await client.verifyIdToken({
    idToken: response.tokens.id_token,
  });
  return ticket;
};

export const getFullNameFromGoogleTokenPlayload = (payload) => {
  let fullName = 'Guest';
  if (payload.given_name && payload.family_name) {
    fullName = `${payload.given_name} ${payload.family_name}`;
  } else if (payload.given_name) {
    fullName = payload.given_name;
  }

  return fullName;
};
