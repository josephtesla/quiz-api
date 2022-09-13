import { server } from "../helpers";

describe("Example", () => {
  it("does nothing", async () => {
    const res = await server.get("/")
    console.log(res.body)
    expect(res.status).toEqual(200)
  })
})
