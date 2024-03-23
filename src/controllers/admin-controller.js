import adminService from "../service/admin-service.js";

const create = async (req, res, next) => {
  try {
    const result = await adminService.create(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await adminService.login(req.body);
    res.cookie("token", result);
    res.status(200).json({
      token: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

export default { create, login };
