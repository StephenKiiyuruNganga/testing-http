import { expect, it } from "vitest"
import { validateNotEmpty } from "./validation"

it("should throw an error if text input is empty", () => {
  const text = ""
  const errorMessage = "Missing text"

  const validationFn = () => validateNotEmpty(text, errorMessage)

  expect(validationFn).toThrow()
})

it("should throw an error with the provided message if text input is empty", () => {
  const text = ""
  const errorMessage = "Missing text"

  const validationFn = () => validateNotEmpty(text, errorMessage)

  expect(validationFn).toThrow(errorMessage)
})
