const sum = require('./sum');

test('adds 2 + 2 to equal 4', () => {
  expect(sum(2, 2)).toBe(4);
});

test(`プログラムコメントの練習`, () => {
  //エラーになるため、実行させないようにコメントにする。
  /* expect(sum(1,2)).toBe(4);
  */
});

test(`constの練習`, () => {
  const bookTitle = '本';
  const bookPrice = 3000;
  expect(bookTitle).toBe('本');
  expect(bookPrice).toBe(3000);
});
