import { prismaClient } from "../applications/database.js";
import ResponseError from "../error/response-error.js";
import { validate } from "../validations/validate.js";
import createId from "../id-validations/ads-id.js";
import adsValidation from "../validations/ads-validation.js";

const get = async () => {
  return await prismaClient.ads.findMany({});
};

const create = async (request) => {
  const result = await validate(adsValidation.create, request);
  const count = await prismaClient.ads.count({
    where: {
      src: result.src,
    },
  });
  if (count) {
    throw new ResponseError(400, "src already exist");
  }
  const id = await createId();
  return await prismaClient.ads.create({
    data: {
      id: id,
      src: result.src,
    },
  });
};

const deletes = async (request) => {
  const result = await validate(adsValidation.deletes, request);
  const count = await prismaClient.ads.count({
    where: {
      id: result.id,
    },
  });
  if (!count) {
    throw new ResponseError(400, `id ${result.id} does not exist`);
  }

  return await prismaClient.ads.delete({
    where: {
      id: result.id,
    },
  });
};

export default { get, create, deletes };
