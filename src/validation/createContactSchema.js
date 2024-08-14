import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {3} characters',
    'string.max': 'Username should have at most {33} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[+][0-9]{12}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in the format +XXXXXXXXXXXX',
    }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('personal', 'home', 'work'),
});
