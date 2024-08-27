import { SORT_ORDER } from '../constants/index.js';
import ContactsCollection from '../db/Models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFile } from '../utils/saveFile.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { ObjectId } from 'mongodb';
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const query = { userId };
  const contactsQuery = ContactsCollection.find({ userId });

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments({ userId }),
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
  const contact = await ContactsCollection.findOne({
    _id: new ObjectId(contactId),
  });
  return contact;
};

export const createContact = async ({ photo, ...payload }, userId) => {
  // const url = await saveFileToLocalachine(photo);
  const url = await saveFileToCloudinary(photo);
  // const url = await saveFile(photo);

  const contact = await ContactsCollection.create({
    ...payload,
    userId,
    photo: url,
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
