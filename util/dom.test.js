import fs from "fs"
import path from "path"

import { beforeEach, expect, it, vi } from "vitest"
import { Window } from "happy-dom"

import { showError } from "./dom"

// * we need to load our html file to happy-dom's virtual dom/env

// * 1. read the content of our htmlfile
const htmlDocPath = path.join(process.cwd(), "index.html")
const htmlDocumentContent = fs.readFileSync(htmlDocPath).toString()

// * 2. create an emulated browser with an empty page
const window = new Window()

// * 3. add the content to the empty page
const document = window.document
// document.write(htmlDocumentContent)

// * 4. mock the document API with the created document
vi.stubGlobal("document", document)

beforeEach(() => {
  document.body.innerHTML = ""
  document.write(htmlDocumentContent)
})

it("should add an error paragraph to the id='errors' element", () => {
  showError("test")

  const errorsEl = document.getElementById("errors")
  const errorParagraph = errorsEl.firstElementChild

  expect(errorParagraph).not.toBeNull()
})

it("should not contain an error paragraph initially", () => {
  const errorsEl = document.getElementById("errors")
  const errorParagraph = errorsEl.firstElementChild

  expect(errorParagraph).toBeNull()
})

it("should output the provided message in the error paragraph", () => {
  const errorMessage = "an error occured"

  showError(errorMessage)

  const errorsEl = document.getElementById("errors")
  const errorParagraph = errorsEl.firstElementChild
  const result = errorParagraph.textContent

  expect(result).toBe(errorMessage)
})
