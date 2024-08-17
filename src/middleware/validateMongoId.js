import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    // Перевірка на наявність ID
    if (!id) {
      return next(createHttpError(400, 'ID is not provided'));
    }

    // Перевірка на валідність ID
    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid ID format'));
    }

    // Якщо ID є і він валідний, передаємо контроль далі
    next();
  };

export default validateMongoId;
