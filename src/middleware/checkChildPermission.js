import createHttpError from 'http-errors';
import ContactsCollection from '../db/Models/Contact.js';
export const checkChildPermission =
  (...roles) =>
  async (req, res, next) => {
    const user = req.user;
    const { contactId } = req.params;

    if (roles.includes('teacher') && user.role === 'teacher') {
      return next();
    }

    if (roles.includes('parent') && user.role === 'parent') {
      const contact = await ContactsCollection.findOne({
        _id: contactId,
        parentId: user._id,
      });

      if (!contact) {
        return next(createHttpError(403, 'This is not your child'));
      }

      return next();
    }

    return next(createHttpError(403, 'Forbidden'));
  };
