import { prismaClient } from "../applications/database.js";

const createId = async () => {
  const newID = (await prismaClient.list_aidrop.findMany({})).length + 1;

  const check = await prismaClient.list_aidrop.count({
    where: {
      id_aidrop: newID,
    },
  });

  if (check) {
    return await findIdGap();
  } else {
    return newID;
  }
};

const findIdGap = async () => {
  const data = await prismaClient.list_aidrop.findMany({});
  for (let i = 1; i <= data.length; i++) {
    const count = await prismaClient.list_aidrop.count({
      where: {
        id_aidrop: i,
      },
    });
    if (!count) {
      return i;
    }
  }
};

export default createId;
