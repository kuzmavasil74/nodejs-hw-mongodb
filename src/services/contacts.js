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
