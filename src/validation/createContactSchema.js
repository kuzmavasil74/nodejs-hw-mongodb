import Joi from 'joi';
// валідація контакту за допомогою Joi (для створення)
export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    // John
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {3} characters',
    'string.max': 'Username should have at most {33} characters',
    'any.required': 'Username is required',
  }),
  email: Joi.string().email().required(), // 0l5Jc@example.com
  phoneNumber: Joi.string() // +380000000000 or 380000000000
    .pattern(/^[+][0-9]{12}$/)
    .required()
    .messages({
      'string.pattern.base': 'Phone number must be in the format +XXXXXXXXXXXX',
    }),
  isFavourite: Joi.boolean(), // true, false
  contactType: Joi.string().valid('personal', 'home', 'work'), // personal, home, work
});
