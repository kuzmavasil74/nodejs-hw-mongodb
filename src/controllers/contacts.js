import {
  getContactById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
// Функція для отримання всіх контактів
export const getAllContactsController = async (req, res) => {
  try {
    // Перетворюємо параметри запиту
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);

    // Отримуємо контакти
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      filter,
    });

    // Відповідаємо успішним результатом
    res.status(200).json({
      status: 200,
      message: 'Successfully found all contacts!',
      data: contacts,
    });
  } catch (error) {
    // Відповідаємо помилкою
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};
// Функція для отримання контакту за ID
export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact with id ${contactId} not found`));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Contacts found with id ${contactId}`,
    data: contact,
  });
};
// Функція для створення контакту
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};
// Функція для видалення контакту
export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
// Функція для оновлення контакту
export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, { upsert: true });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  // Відповідаємо успішним результатом
  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};
// Функція для оновлення контакту
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
