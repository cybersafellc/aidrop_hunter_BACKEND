import { validate } from "../validations/validate.js";
import adminValidation from "../validations/admin-validation.js";
import { prismaClient } from "../applications/database.js";
import ResponseError from "../error/response-error.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const create = async (request) => {
  const result = await validate(adminValidation.create, request);
  const count = await prismaClient.admin_tbl.count({
    where: {
      username: result.username,
    },
  });
  if (count) {
    throw new ResponseError(400, "username already exist");
  }
  const newId = (await prismaClient.admin_tbl.findMany({})).length + 1;
  result.password = await bcrypt.hash(result.password, 10);

  return await prismaClient.admin_tbl.create({
    data: {
      id: newId,
      username: result.username,
      password: result.password,
    },
    select: {
      username: true,
    },
  });
};

const login = async (request) => {
  const result = await validate(adminValidation.login, request);
  const checkUsername = await prismaClient.admin_tbl.findFirst({
    where: {
      username: result.username,
    },
  });
  if (!checkUsername) {
    throw new ResponseError(400, "user does not register");
  }
  if (await bcrypt.compare(result.password, checkUsername.password)) {
    const token = await Jwt.sign(
      { id: checkUsername.id },
      process.env.ADMIN_SECRET,
      { expiresIn: "1h" }
    );

    return token;
  } else {
    throw new ResponseError(400, "password incorect");
  }
};

export default { create, login };
