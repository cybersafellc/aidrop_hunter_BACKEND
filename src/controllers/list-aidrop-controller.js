import listAidropService from "../services/list-aidrop-service.js";

const create = async (req, res, next) => {
  try {
    const result = await listAidropService.create(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await listAidropService.update(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const result = await listAidropService.get();
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const deletes = async (req, res, next) => {
  try {
    const result = await listAidropService.deletes(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const result = await listAidropService.search(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};
export default { create, update, get, deletes, search };
