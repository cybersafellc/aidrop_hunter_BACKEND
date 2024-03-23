import { prismaClient } from "../src/applications/database.js";
import logger from "../src/applications/logging.js";

describe("prisma client", () => {
  it("conected to database", async () => {
    await prismaClient.$connect({});
    await prismaClient.$disconnect({});
    logger.info("aman konek to database");
  });
});
