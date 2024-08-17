import Joi from 'joi';

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phoneNumber: Joi.string()
    .pattern(/^\+?[0-9]+$/)
    .min(10)
    .max(15),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});
