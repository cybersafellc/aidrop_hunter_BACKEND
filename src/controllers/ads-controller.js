import adsService from "../service/ads-service.js";

const get = async (req, res, next) => {
  try {
    const result = await adsService.get();
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await adsService.create(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

const deletes = async (req, res, next) => {
  try {
    const result = await adsService.deletes(req.body);
    res.status(200).json({
      data: result,
    }).end;
  } catch (error) {
    next(error);
  }
};

export default { get, create, deletes };
