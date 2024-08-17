import { ContactsCollection } from '../db/Models/Contact.js'; // Імпортуємо модель
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.name) {
    contactsQuery.and({ name: { $regex: filter.name, $options: 'i' } });
  }
  if (filter.email) {
    contactsQuery.and({ email: { $regex: filter.email, $options: 'i' } });
  }
  if (filter.phoneNumber) {
    contactsQuery.and({ phoneNumber: { $regex: filter.phoneNumber, $options: 'i' } });
  }
  if (filter.isFavourite) {
    contactsQuery.and({ isFavourite: filter.isFavourite });
  }
  if (filter.contactType) {
    contactsQuery.and({ contactType: filter.contactType });
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
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

// Функція для отримання контакту за ID
export const getContactById = async (contactId) => {
  try {
    return await ContactsCollection.findById(contactId);
  } catch (err) {
    throw new Error('Error fetching contact');
  }
};
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject?.upserted),
  };
};
