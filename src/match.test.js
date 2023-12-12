test("正規表現の練習", () => {
  const pattern = /^([0-9])+$/;
  const result = pattern.test("00ああ");
  expect(result).toStrictEqual(false);
  expect(pattern.test("1234")).toStrictEqual(true);
  expect(pattern.test(" 123")).toStrictEqual(false);
});
