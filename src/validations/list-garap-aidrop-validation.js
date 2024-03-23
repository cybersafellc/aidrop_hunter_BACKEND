import Joi from "joi";

const create = Joi.object({
  id_aidrop: Joi.number().required(),
});
const deletes = Joi.object({
  id_ga: Joi.number().required(),
});

export default { create, deletes, search };
