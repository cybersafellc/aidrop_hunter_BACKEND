import Joi from "joi";

const create = Joi.object({
  src: Joi.string().required(),
});

const deletes = Joi.object({
  id: Joi.number().required(),
});

export default { create, deletes };
