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

test(`letの練習`, () => {
  let bookTitle ;
  expect(bookTitle).toBe(undefined);
  let bookPrice = 3000;

  bookTitle = '本';
  expect(bookTitle).toBe('本');
  expect(bookPrice).toBe(3000);

  bookPrice = 5000;
  expect(bookPrice).toBe(5000);
});

test('console.logの練習', () => {
  const total = 42+42;
  console.log(total);

  const value = '値';
  console.log(value);
});

test('文字列の練習', () => {
  const str1 = "文字列です";
  const str2 = '文字列です';
  expect(str1 === str2).toBe(true);

  const str3 = `文字列
です`;
  const str4 = "文字列\nです";
  expect(str3 === str4).toBe(true);
  
  const str5 = "これは${str1}";
  const str6 = `これは${str1}`;
  expect(str5).toBe("これは${str1}");
  expect(str6).toBe("これは文字列です");
});

