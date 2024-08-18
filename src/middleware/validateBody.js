import createHttpError from 'http-errors';
// валидація даних за допомогою Joi
const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad Request', { errors: err.details });
    next(error);
  }
};

export default validateBody;
