import userValidation from "../validations/user-validation.js";
import { validate } from "../validations/validate.js";
import { prismaClient } from "../applications/database.js";
import ResponseError from "../error/response-error.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const create = async (request) => {
  const result = await validate(userValidation.create, request);
  const countUsername = await prismaClient.user.count({
    where: {
      username: result.username,
    },
  });
  if (countUsername) {
    throw new ResponseError(400, "username already exist");
  }
  const newId = (await prismaClient.user.findMany({})).length + 1;
  result.password = await bcrypt.hash(result.password, 10);
  return await prismaClient.user.create({
    data: {
      id_user: newId,
      username: result.username,
      password: result.password,
    },
    select: {
      username: true,
    },
  });
};

const login = async (request) => {
  const result = await validate(userValidation.login, request);
  const checkUsername = await prismaClient.user.findFirst({
    where: {
      username: result.username,
    },
  });
  if (!checkUsername) {
    throw new ResponseError(400, "username does not register");
  }
  if (await bcrypt.compare(result.password, checkUsername.password)) {
    const token = await Jwt.sign(
      { id: checkUsername.id_user },
      process.env.USER_SECRET,
      { expiresIn: "1h" }
    );
    return {
      username: checkUsername.username,
      token: token,
    };
  } else {
    throw new ResponseError(400, "password incorect");
  }
};

const updatePass = async (userId, request) => {
  const result = await validate(userValidation.updatePass, request);
  const count = await prismaClient.user.count({
    where: {
      id_user: userId,
    },
  });
  if (!count) {
    throw new ResponseError(400, "user does not register");
  }
  result.password = await bcrypt.hash(result.password, 10);
  return await prismaClient.user.update({
    data: result,
    where: {
      id_user: userId,
    },
    select: {
      username: true,
    },
  });
};

const get = async (userId) => {
  return await prismaClient.user.findFirst({
    where: {
      id_user: userId,
    },
    select: {
      username: true,
    },
  });
};
export default { create, login, updatePass, get };
