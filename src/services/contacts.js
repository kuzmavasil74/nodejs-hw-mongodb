import { ContactsCollection } from '../db/Models/Contact.js'; // Імпортуємо модель

// Функція для отримання всіх контактів
export const getAllContacts = async () => {
  try {
    return await ContactsCollection.find();
  } catch (err) {
    throw new Error('Error fetching contacts');
  }
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
