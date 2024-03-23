import ResponseError from "../error/response-error.js";
import logger from "../applications/logging.js";

const pageNotFound = (req, res, next) => {
  try {
    throw new ResponseError(404, "page not found");
  } catch (error) {
    next(error);
  }
};

const errorHandler = (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res.status(err.status).json({
      errors: err.message,
    }).end;
  } else {
    res.status(500).json({
      errors: err.message,
    }).end;

    logger.error(err.message);
  }
};

export default { errorHandler, pageNotFound };
