import Jwt from "jsonwebtoken";
import ResponseError from "../error/response-error.js";

const adminJwtValidate = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      throw new ResponseError(400, "token required");
    }
    await Jwt.verify(token, process.env.ADMIN_SECRET, (err, decode) => {
      if (err) {
        throw new ResponseError(400, "invalid token");
      } else {
        req.adminId = decode.id;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

const userJwtValidate = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      throw new ResponseError(400, "token required");
    }
    await Jwt.verify(token, process.env.USER_SECRET, (err, decode) => {
      if (err) {
        throw new ResponseError(400, "invalid token");
      } else {
        req.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

const adminParameter = async (req, res, next) => {
  try {
    const { idx } = await req.query;
    if (!idx) {
      throw new ResponseError(400, "idx parameter required");
    }
    if (idx === process.env.ADMIN_PARAMETER) {
      next();
    } else {
      throw new ResponseError(400, "idx parameter incorect");
    }
  } catch (error) {
    next(error);
  }
};

export default { userJwtValidate, adminParameter, adminJwtValidate };
