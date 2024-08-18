import { SORT_ORDER } from '../constants/index.js';
// парсування параметрів сортування
const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};
// парсування параметрів сортування
const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
  ];

  if (keysOfContacts.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};
// парсування параметрів сортування
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
