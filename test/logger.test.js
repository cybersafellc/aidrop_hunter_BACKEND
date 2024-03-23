import logger from "../src/applications/logging.js";

describe("test logger", () => {
  it("info", async () => {
    logger.info("test info");
  });

  it("warn", async () => {
    logger.warn("test warn");
  });

  it("error", async () => {
    logger.error("test error");
  });
});
