import { prismaClient } from "../applications/database.js";

const createId = async () => {
  const newID = (await prismaClient.ads.findMany({})).length + 1;

  const check = await prismaClient.ads.count({
    where: {
      id: newID,
    },
  });

  if (check) {
    return await findIdGap();
  } else {
    return newID;
  }
};

const findIdGap = async () => {
  const data = await prismaClient.ads.findMany({});
  for (let i = 1; i <= data.length; i++) {
    const count = await prismaClient.ads.count({
      where: {
        id: i,
      },
    });
    if (!count) {
      return i;
    }
  }
};

export default createId;
