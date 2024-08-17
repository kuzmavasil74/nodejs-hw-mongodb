const parseName = (name) => {
  if (!name) {
    return undefined;
  }
  return { name: { $regex: name, $options: 'i' } };
};
const parseEmail = (email) => {
  if (!email) {
    return undefined;
  }
  return { email: { $regex: email, $options: 'i' } };
};
const parsePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return undefined;
  }
  return { phoneNumber: { $regex: phoneNumber, $options: 'i' } };
};
const parseFavourite = (favourite) => {
  if (!favourite) {
    return undefined;
  }
  return { isFavourite: favourite };
};
const parseContactType = (contactType) => {
  if (!contactType) {
    return undefined;
  }
  return { contactType };
};

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
