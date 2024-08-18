import { Router } from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrWrapper.js';
import { validateMongoId, validateBody } from '../middleware/index.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';

const contactsRouter = Router();
// роутер для контактів
contactsRouter.use('/:contactId', validateMongoId('contactId'));
// роутер для всіх контактів
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
// роутер для одного контакту
contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));
// роутер для створення контакту
contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
// роутер для видалення контакту
contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));
// роутер для оновлення контакту
contactsRouter.put(
  '/:contactId',
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
// роутер для оновлення контакту
contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default contactsRouter;
