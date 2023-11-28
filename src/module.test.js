import { multiple as m } from "./module.mjs";

test("moduleの練習", () => {
  expect(m(2, 3)).toStrictEqual(6);
});
