import {
  getContactById,
  getAllContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

// Функція для отримання всіх контактів
export const getAllContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  try {
    const contacts = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      userId: req.user._id,
    });

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
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
    message: `Contact found with id ${contactId}`,
    data: contact,
  });
};
// Функція для створення контакту
export const createContactController = async (req, res) => {
  const { body, file } = req;

  const contact = await createContact({ ...body, photo: file }, req.user._id);
  if (!file) {
    return res.status(400).json({ message: 'File is required' });
  }

  try {
    const contact = await createContact({ ...body, photo: file }, req.user._id);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    res
      .status(500)
      .json({ message: 'Failed to create contact', error: error.message });
  }
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
  const userId = req.user._id;

  try {
    // Переконайтесь, що userId передається
    if (!userId) {
      throw createHttpError(400, 'User ID is missing');
    }

    // Ваша функція updateContact повинна бути адаптована для прийняття всіх параметрів
    const result = await updateContact(contactId, req.body, userId, {
      upsert: true,
    });

    // Перевірка наявності результату
    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    // Перевірка на новий контакт (upsert)
    const status = result.isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: `Successfully upserted a contact!`,
      data: result, // Додайте результати правильно
    });
  } catch (error) {
    console.error('Error in upsertContactController:', error);
    next(createHttpError(500, 'Failed to upsert contact'));
  }
};

// Функція для оновлення контакту
export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, req.user._id);
  const userId = req.user._id;

  console.log('Request to update contact with ID:', contactId);
  console.log('For user ID:', userId);

  try {
    const result = await updateContact(contactId, req.body, userId);

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    console.error('Error in patchContactController:', error);
    next(createHttpError(500, 'Failed to patch contact'));
  }
};
