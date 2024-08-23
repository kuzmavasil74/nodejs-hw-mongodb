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
import { ObjectId } from 'mongodb';

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

export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType, isFavourite } = req.body;
    const userId = req.user._id;
    const contact = await createContact({ payload: req.body, userId });
    res.status(201).json({
      status: 201,
      message: 'Successfully created contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error in createContactController:', error);
    next(error || createHttpError(500, 'Failed to create contact'));
  }
};

// export const createContactController = async (req, res) => {
//   const { body, file } = req;
//   const contact = await createContact({ ...body, avatar: file }, req.user._id);

//   res.status(201).json({
//     status: 201,
//     message: `Successfully created a contact!`,
//     data: contact,
//   });
// };
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
  console.log(req.body);
  const { contactId } = req.params;
  const userId = req.user._id;

  const result = await updateContact(contactId, req.body, userId, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

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
