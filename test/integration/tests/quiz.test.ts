import { server } from "../helpers";

describe("Get Quizzes", () => {
  it("returns 401 if user is not authenticated", async () => {
    const res = await server.get("/quizzes")
    expect(res.status).toEqual(401)
  })
})
