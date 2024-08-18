import { Router } from 'express';
import authRouter from './auth.js';
import contactsRouter from './contacts.js';

const rootRouter = Router();
// роутер для виходу з аккаунту
rootRouter.use('/auth', authRouter);
// роутер для контактів
rootRouter.use('/contacts', contactsRouter);

export default rootRouter;
