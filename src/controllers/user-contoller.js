import userService from "../service/user-service.js";
const create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.cookie("token", result.token);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const updatePass = async (req, res, next) => {
  try {
    const result = await userService.updatePass(req.userId, req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await userService.get(req.userId);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

export default { create, login, updatePass, get };
