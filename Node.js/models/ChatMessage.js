const Joi = require("joi");

const schema = {
  id: Joi.number(),
  message: Joi.string()
    .max(900)
    .required(),
  dateCreated: Joi.date(),
  toUserId: Joi.number(),
  fromUserId: Joi.number()
};

module.exports = Joi.object().keys(schema);
