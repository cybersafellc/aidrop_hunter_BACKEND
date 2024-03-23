import { prismaClient } from "../applications/database.js";
import ResponseError from "../error/response-error.js";
import createId from "../id-validations/list-aidrop-id.js";
import listAidropValidation from "../validations/list-aidrop-validation.js";
import { validate } from "../validations/validate.js";

const create = async (request) => {
  const result = await validate(listAidropValidation.create, request);
  const count = await prismaClient.list_aidrop.count({
    where: {
      name_aidrop: result.name_aidrop,
    },
  });
  if (count) {
    throw new ResponseError(400, "aidrop already exist");
  }
  const id = await createId();
  return await prismaClient.list_aidrop.create({
    data: {
      id_aidrop: id,
      name_aidrop: result.name_aidrop,
      url_aidrop: result.url_aidrop,
      task: result.task,
      img_url: result.img_url,
      twitter: result.twitter,
      refrence_task: result.refrence_task,
    },
  });
};

const update = async (request) => {
  const result = await validate(listAidropValidation.update, request);
  const count = await prismaClient.list_aidrop.count({
    where: {
      id_aidrop: result.id_aidrop,
    },
  });
  if (!count) {
    throw new ResponseError(400, "id_aidrop does not exist");
  }
  return prismaClient.list_aidrop.update({
    data: result,
    where: {
      id_aidrop: result.id_aidrop,
    },
  });
};

const get = async () => {
  return await prismaClient.list_aidrop.findMany({});
};

const deletes = async (request) => {
  const result = await validate(listAidropValidation.deletes, request);
  const count = await prismaClient.list_aidrop.count({
    where: {
      id_aidrop: result.id_aidrop,
    },
  });
  if (!count) {
    throw new ResponseError(400, "id_aidrop does not exist");
  }
  return await prismaClient.list_aidrop.delete({
    where: {
      id_aidrop: result.id_aidrop,
    },
  });
};

const search = async (request) => {
  const result = await validate(listAidropValidation.search, request);
  return await prismaClient.list_aidrop.findMany({
    where: {
      name_aidrop: {
        contains: result.name_aidrop,
      },
    },
  });
};

export default { create, update, get, deletes, search };
