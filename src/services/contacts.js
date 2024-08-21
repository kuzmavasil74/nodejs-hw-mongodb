import { SORT_ORDER } from '../constants/index.js';
import ContactsCollection from '../db/Models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFileToLocalMachine } from '../utils/saveFileToLocalMachine.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find({ userId, ...filter });

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find({ userId, ...contactsQuery }).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async ({ avatar, ...payload }, userId) => {
  const url = await saveFileToLocalMachine(avatar);
  const contact = await ContactsCollection.create({
    ...payload,
    userId,
    avatarUrl: url,
  });
  return contact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );

  return contact;
};
