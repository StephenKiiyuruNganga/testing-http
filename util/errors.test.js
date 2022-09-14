import { describe, expect, it } from "vitest"
import { HttpError } from "./errors"

describe("HttpError()", () => {
  it("should create an instance of the class", () => {
    const code = 400
    const message = "Bad request"
    const data = ["missing token"]

    const errorObj = new HttpError(code, message, data)

    expect(errorObj).toBeInstanceOf(HttpError)
  })

  it("should have statusCode, message, data properties", () => {
    const code = 400
    const message = "Bad request"
    const data = ["missing token"]

    const errorObj = new HttpError(code, message, data)

    expect(errorObj).toHaveProperty("statusCode")
    expect(errorObj).toHaveProperty("message")
    expect(errorObj).toHaveProperty("data")
  })
})
