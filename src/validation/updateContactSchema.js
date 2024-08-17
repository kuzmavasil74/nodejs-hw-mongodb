import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30), // John
  email: Joi.string().email(), // 0l5Jc@example.com
  phoneNumber: Joi.string() // +380000000000 or 380000000000
    .pattern(/^\+?[0-9]+$/)
    .min(10)
    .max(15),
  isFavourite: Joi.boolean(), // true, false
  contactType: Joi.string().valid('work', 'home', 'personal'), // personal, home, work
});
