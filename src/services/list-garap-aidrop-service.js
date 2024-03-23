import { prismaClient } from "../applications/database.js";
import ResponseError from "../error/response-error.js";
import listGarapAidropValidation from "../validations/list-garap-aidrop-validation.js";
import { validate } from "../validations/validate.js";
import createId from "../id-validations/list-garap-aidrop-id.js";

const create = async (userId, request) => {
  const result = await validate(listGarapAidropValidation.create, request);
  const count = await prismaClient.list_garap_aidrop.count({
    where: {
      id_aidrop: result.id_aidrop,
      id_user: userId,
    },
  });
  if (count) {
    throw new ResponseError(400, "list already exist");
  }
  const count1 = await prismaClient.list_aidrop.count({
    where: {
      id_aidrop: result.id_aidrop,
    },
  });
  if (!count1) {
    throw new ResponseError(
      400,
      `id_aidrop "${result.id_aidrop}" does not exist`
    );
  }

  const id = await createId();
  return await prismaClient.list_garap_aidrop.create({
    data: {
      id_ga: id,
      id_user: userId,
      id_aidrop: result.id_aidrop,
    },
    select: {
      id_aidrop: true,
    },
  });
};

const get = async (userId) => {
  const dataList = await prismaClient.list_garap_aidrop.findMany({
    where: {
      id_user: userId,
    },
    select: {
      id_aidrop: true,
      id_ga: true,
    },
  });
  let listAidrop = [];
  for (const data of dataList) {
    const aidrop = await prismaClient.list_aidrop.findFirst({
      where: {
        id_aidrop: data.id_aidrop,
      },
    });
    if (aidrop) {
      aidrop.id_ga = await data.id_ga;
      listAidrop.push(aidrop);
    }
  }
  return listAidrop;
};

const deletes = async (request) => {
  const result = await validate(listGarapAidropValidation.deletes, request);
  const count = await prismaClient.list_garap_aidrop.count({
    where: {
      id_ga: result.id_ga,
    },
  });
  if (!count) {
    throw new ResponseError(400, "id_ga does not exist");
  }
  return await prismaClient.list_garap_aidrop.delete({
    where: {
      id_ga: result.id_ga,
    },
    select: {
      id_aidrop: true,
    },
  });
};

export default { create, get, deletes };
