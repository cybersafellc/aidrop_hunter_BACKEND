import request from "supertest";
import web from "../src/applications/web.js";

describe("response error test", () => {
  it("page not found", async () => {
    const res = await request(web).get("/unknown/endpoint");
    expect(res.status).toBe(404);
  });
});
