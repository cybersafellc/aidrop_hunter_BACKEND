import { prismaClient } from "../applications/database.js";

const createId = async () => {
  const newID = (await prismaClient.list_garap_aidrop.findMany({})).length + 1;

  const check = await prismaClient.list_garap_aidrop.count({
    where: {
      id_ga: newID,
    },
  });

  if (check) {
    return await findIdGap();
  } else {
    return newID;
  }
};

const findIdGap = async () => {
  const data = await prismaClient.list_garap_aidrop.findMany({});
  for (let i = 1; i <= data.length; i++) {
    const count = await prismaClient.list_garap_aidrop.count({
      where: {
        id_ga: i,
      },
    });
    if (!count) {
      return i;
    }
  }
};

export default createId;
