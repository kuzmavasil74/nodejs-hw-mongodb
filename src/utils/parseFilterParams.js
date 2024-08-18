// Функція для обробки параметрів фільтрування запиту по імені
const parseName = (name) => {
  if (!name) {
    return undefined;
  }
  return { name: { $regex: name, $options: 'i' } };
};
// Функція для обробки параметрів фільтрування запиту по email
const parseEmail = (email) => {
  if (!email) {
    return undefined;
  }
  return { email: { $regex: email, $options: 'i' } };
};
// Функція для обробки параметрів фільтрування запиту по номеру
const parsePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return undefined;
  }
  return { phoneNumber: { $regex: phoneNumber, $options: 'i' } };
};
// Функція для обробки параметрів фільтрування запиту по відображенню в закладках
const parseFavourite = (favourite) => {
  if (!favourite) {
    return undefined;
  }
  return { isFavourite: favourite };
};
// Функція для обробки параметрів фільтрування запиту по типу контакту
const parseContactType = (contactType) => {
  if (!contactType) {
    return undefined;
  }
  return { contactType };
};
// Функція для обробки параметрів фільтрування запиту
export const parseFilterParams = (query) => {
  const { name, email, phoneNumber, isFavourite, contactType } = query;

  const parsedName = parseName(name);
  const parsedEmail = parseEmail(email);
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
  const parsedFavourite = parseFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    name: parsedName,
    email: parsedEmail,
    phoneNumber: parsedPhoneNumber,
    isFavourite: parsedFavourite,
    contactType: parsedContactType,
  };
};
