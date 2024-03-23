import Joi from "joi";

const create = Joi.object({
  name_aidrop: Joi.string().required(),
  url_aidrop: Joi.string().required(),
  task: Joi.string().required(),
  twitter: Joi.string().required(),
  refrence_task: Joi.string().required(),
  img_url: Joi.string().required(),
});

const update = Joi.object({
  id_aidrop: Joi.number().required(),
  name_aidrop: Joi.string().required(),
  url_aidrop: Joi.string().required(),
  task: Joi.string().required(),
  twitter: Joi.string().required(),
  refrence_task: Joi.string().required(),
  img_url: Joi.string().required(),
});

const deletes = Joi.object({
  id_aidrop: Joi.number().required(),
});

const search = Joi.object({
  name_aidrop: Joi.string(),
});

export default { create, update, deletes, search };
