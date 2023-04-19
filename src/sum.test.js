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

test('オブジェクトの練習', () => {
  const object = {
    address : "東京",
    telephone : "03-0000-0000",
    age : 18,
    hasLicense : true,
    nested : {
      valuea : 1,
    }
  }
  expect(object.address).toBe("東京");
  expect(object.telephone).toBe("03-0000-0000");
  expect(object["age"]).toBe(18);
  expect(object["hasLicense"]).toBe(true);
  expect(object.nested.valuea).toBe(1);
});

test('べき乗の練習', () => {
  expect(3**4).toBe(81);
  expect(Math.pow(3,4)).toBe(81);
});

test('分割代入 配列の練習', () => {
  const array = [1,2,3];
  const [a,b,c] = array;

  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBe(3);
});

test('分割代入 オブジェクトの練習', () => {
  const obj = {
    key : "value",
    age : 20,
  }
  const a = obj.key;
  expect(a).toBe("value");

  const {key,age} = obj;
  expect(key).toBe("value");
  expect(age).toBe(20);
});

test('配列の練習', () => {
  const array = ["aaa",111,true,{age:20,address:"東京"}];

  expect(array[0]).toBe("aaa");
  expect(array[1]).toBe(111);
  expect(array[2]).toBe(true);
  expect(array[3].age).toBe(20);
  expect(array[3].address).toBe("東京");
});



test('elseの練習', () => {
  const a = function(year) {
    if (year % 400 === 0) { // 400で割り切れる
    return true;
} else if (year % 100 === 0) { // 100で割り切れる
  return false;
} else if (year % 4 === 0) { // 4で割り切れる
  return true;
} else { // それ以外
  return false;
}}

  expect(a(2000)).toBe(true);
  expect(a(2023)).toBe(false);
});

test('switch文の練習', () => {
  const version = function(num){
    switch(num % 4){
      case 0:
        return "グー";
      case 1:
        return "チョキ";
      case 2:
        return "パー";
      case 3:
        return "あいこ";
    }
  }

expect(version(0)).toBe("グー");
expect(version(1)).toBe("チョキ");
expect(version(2)).toBe("パー");
expect(version(3)).toBe("あいこ");
expect(version(4)).toBe("グー");
expect(version(14)).toBe("パー");

});