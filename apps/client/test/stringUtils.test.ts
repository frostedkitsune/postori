import { formatContact } from "../src/lib/stringUtils";
import { expect, test } from "vitest";


test("Format email contact", () => {
  expect(formatContact("Arav Roy", "roy.arav@example.com"))
    .toBe("Arav Roy <roy.arav@example.com>");
});