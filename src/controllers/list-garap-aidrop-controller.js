import listGarapAidropService from "../services/list-garap-aidrop-service.js";

const create = async (req, res, next) => {
  try {
    const result = await listGarapAidropService.create(req.userId, req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await listGarapAidropService.get(req.userId);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const deletes = async (req, res, next) => {
  try {
    const result = await listGarapAidropService.deletes(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

export default { create, get, deletes };
