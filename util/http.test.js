import { expect, it, vi } from "vitest"
import { HttpError } from "./errors"
import { sendDataRequest } from "./http"

const request_input = { name: "sk" }
const resData = { data: "dummy data" }

const mockedFetchHandler = vi.fn((url, config) => {
  return new Promise((resolve, reject) => {
    // check if the body is converted to a string
    if (typeof config.body !== "string") {
      return reject("Not a string")
    }

    // create your own response object
    const response = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(resData)
        })
      },
    }

    resolve(response)
  })
})

// * how to mock a global API/module
vi.stubGlobal("fetch", mockedFetchHandler)

it("should return some response data", async () => {
  const result = await sendDataRequest(request_input)

  expect(result).toEqual(resData)
})

it("should convert the provided data to JSON before sending the request", async () => {
  let errorMessage

  try {
    await sendDataRequest(request_input)
  } catch (error) {
    errorMessage = error
  }

  expect(errorMessage).not.toBe("Not a string")
})

it("should throw a HttpError if the response is not ok", async () => {
  // we want to modify our fake fetch to return a !ok response only for this test. So we use "mockImplementationOnce"
  mockedFetchHandler.mockImplementationOnce((url, config) => {
    return new Promise((resolve, reject) => {
      const response = {
        ok: false,
        json() {
          return new Promise((resolve, reject) => {
            resolve(resData)
          })
        },
      }

      resolve(response)
    })
  })

  let result

  try {
    await sendDataRequest(request_input)
  } catch (error) {
    result = error
  }

  expect(result).toBeInstanceOf(HttpError)
})
