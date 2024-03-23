import Joi from "joi";

const create = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(3).max(60).required(),
});

const login = Joi.object({
  username: Joi.string().email().required(),
  password: Joi.string().min(3).max(60).required(),
});

const updatePass = Joi.object({
  password: Joi.string().min(3).max(60).required(),
});
export default { create, login, updatePass };
