const sum = require("./sum");

test("adds 2 + 2 to equal 4", () => {
  expect(sum(2, 2)).toBe(4);
});

test(`プログラムコメントの練習`, () => {
  //エラーになるため、実行させないようにコメントにする。
  /* expect(sum(1,2)).toBe(4);
   */
});

test(`constの練習`, () => {
  const bookTitle = "本";
  const bookPrice = 3000;

  expect(bookTitle).toBe("本");
  expect(bookPrice).toBe(3000);
});

test(`letの練習`, () => {
  let bookTitle;
  expect(bookTitle).toBe(undefined);
  let bookPrice = 3000;

  bookTitle = "本";
  expect(bookTitle).toBe("本");
  expect(bookPrice).toBe(3000);

  bookPrice = 5000;
  expect(bookPrice).toBe(5000);
});

test("console.logの練習", () => {
  const total = 42 + 42;
  console.log(total);

  const value = "値";
  console.log(value);
});

test("文字列の練習", () => {
  const str1 = "文字列です";
  const str2 = "文字列です";
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

test("オブジェクトの練習", () => {
  const object = {
    address: "東京",
    telephone: "03-0000-0000",
    age: 18,
    hasLicense: true,
    nested: {
      valuea: 1,
    },
  };
  expect(object.address).toBe("東京");
  expect(object.telephone).toBe("03-0000-0000");
  expect(object["age"]).toBe(18);
  expect(object["hasLicense"]).toBe(true);
  expect(object.nested.valuea).toBe(1);
});

test("べき乗の練習", () => {
  expect(3 ** 4).toBe(81);
  expect(Math.pow(3, 4)).toBe(81);
});

test("分割代入 配列の練習", () => {
  const array = [1, 2, 3];
  const [a, b, c] = array;

  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBe(3);
});

test("分割代入 オブジェクトの練習", () => {
  const obj = {
    key: "value",
    age: 20,
  };
  const a = obj.key;
  expect(a).toBe("value");

  const { key, age } = obj;
  expect(key).toBe("value");
  expect(age).toBe(20);
});

test("配列の練習", () => {
  const array = ["aaa", 111, true, { age: 20, address: "東京" }];

  expect(array[0]).toBe("aaa");
  expect(array[1]).toBe(111);
  expect(array[2]).toBe(true);
  expect(array[3].age).toBe(20);
  expect(array[3].address).toBe("東京");
});

test("三項演算子の練習", () => {
  function addPrefix(text, prefix) {
    // `prefix`が指定されていない場合は"デフォルト:"を付ける
    const pre = typeof prefix === "string" ? prefix : "デフォルト:";
    return pre + text;
  }

  // console.log(addPrefix("文字列")); // => "デフォルト:文字列"
  // console.log(addPrefix("文字列", "カスタム:")); // => "カスタム:文字列"

  expect(typeof "文字列").toBe("string");
  expect(typeof undefined).toBe("undefined");
  expect(addPrefix("abc")).toBe("デフォルト:abc");
  expect(addPrefix("abc", "アルファベット:")).toBe("アルファベット:abc");
});

test("elseの練習", () => {
  const a = function (year) {
    if (year % 400 === 0) {
      // 400で割り切れる
      return true;
    } else if (year % 100 === 0) {
      // 100で割り切れる
      return false;
    } else if (year % 4 === 0) {
      // 4で割り切れる
      return true;
    } else {
      // それ以外
      return false;
    }
  };

  expect(a(2000)).toBe(true);
  expect(a(2023)).toBe(false);
});

test("switch文の練習", () => {
  const version = function (num) {
    switch (num % 4) {
      case 0:
        return "グー";
      case 1:
        return "チョキ";
      case 2:
        return "パー";
      case 3:
        return "あいこ";
    }
  };

  expect(version(0)).toBe("グー");
  expect(version(1)).toBe("チョキ");
  expect(version(2)).toBe("パー");
  expect(version(3)).toBe("あいこ");
  expect(version(4)).toBe("グー");
  expect(version(14)).toBe("パー");
});

test("Number.parseInt, Number.parseFloat文の練習", () => {
  //"10"をパース(分析)して、10進数として表示する
  expect(Number.parseInt("10", 10)).toBe(10);
  expect(Number.parseInt("10", 10)).not.toBe("10");
  expect(Number.parseInt("10")).toBe(10);

  expect(Number.parseFloat("3.14", 10)).toBe(3.14);
  expect(Number.parseFloat("3.14", 10)).not.toBe("10");
  expect(Number.parseFloat("3.14")).toBe(3.14);

  expect(Number.parseInt("3.99")).toBe(3);
  //Numberコンストラクタ関数は数字以外の文字列を渡すとNaNになる
  expect(Number.parseInt("AAA")).toBe(NaN);
  //NaNになってしまった場合の処理を書く必要がある↓
  //Number.isNaN(x)の返り値は真偽値。
  expect(Number.isNaN(Number.parseInt("AAA"))).toBe(true);
});

test("functionの練習", () => {
  function double(num) {
    return num * 2;
  }
  expect(double(3)).toBe(6);

  function echo(x) {
    return x;
  }
  expect(echo(1)).toBe(1);
  expect(echo()).toBe(undefined);
});

test("デフォルト引数の練習", () => {
  function addPrefix2(text, prefix = "デフォルト:") {
    // `prefix`が指定されていない場合は"デフォルト:"を付ける
    return (pre = prefix + text);
  }

  // console.log(addPrefix("文字列")); // => "デフォルト:文字列"
  // console.log(addPrefix("文字列", "カスタム:")); // => "カスタム:文字列"

  expect(addPrefix2("abc")).toBe("デフォルト:abc");
  expect(addPrefix2("abc", "d")).toBe("dabc");
});

test("functionとarrow functionの練習", () => {
  const a = function (value) {
    return value * value;
  };
  const b = (value) => {
    return value * value;
  };
  const c = (value) => value * value;
  // const d = (value) => ({});

  expect(a(2)).toBe(4);
  expect(b(6)).toBe(36);
  expect(c(9)).toBe(81);
  // expect(d(1)).toBe("");
});

test("for文の練習", () => {
  function sum(max) {
    let total = 0;
    for (let i = 0; i < max; i++) {
      total += i + 1;
    }
    return total;
  }

  expect(sum(4)).toBe(10);
  expect(sum(10)).toBe(55);
});

test("for文の練習2", () => {
  function sum(numbers) {
    let total = 0;
    //numbers.lengthには配列の個数が入る
    for (let i = 0; i < numbers.length; i++) {
      total += numbers[i];
    }
    return total;
  }

  expect(sum([1])).toBe(1);
  expect(sum([])).toBe(0);
  expect(sum([1, 2, 3, 4])).toBe(10);
});

test("break文の練習", () => {
  function isEvenIncluded(numbers) {
    let isEven = false;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] % 2 === 0) {
        isEven = true;
        break;
      }
    }
    return isEven;
  }

  expect(isEvenIncluded([1])).toBe(false);
  expect(isEvenIncluded([])).toBe(false);
  expect(isEvenIncluded([1, 2, 3, 4])).toBe(true);
});

test("break→returnの書き換え", () => {
  function isEvenIncluded(numbers) {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] % 2 === 0) {
        return true;
      }
    }
    return false;
  }

  expect(isEvenIncluded([1])).toBe(false);
  expect(isEvenIncluded([])).toBe(false);
  expect(isEvenIncluded([1, 2, 3, 4])).toBe(true);
});

test("some/filterの練習", () => {
  const array = [1, 2, 3, 4, 5];
  const array1 = [1, 3, 5, 7];
  const array2 = [2, 4, 6, 8];

  expect(
    array.some((number) => {
      return number % 2 === 0;
    })
  ).toBe(true);
  expect(
    array1.some((number) => {
      return number % 2 === 0;
    })
  ).toBe(false);
  expect(
    array2.some((number) => {
      return number % 2 === 0;
    })
  ).toBe(true);
  //filter
  expect(
    array.filter((number) => {
      return number % 2 === 0;
    })
  ).toStrictEqual([2, 4]);
  expect(
    array1.filter((number) => {
      return number % 2 === 0;
    })
  ).toStrictEqual([]);
  expect(
    array2.filter((number) => {
      return number % 2 === 0;
    })
  ).toStrictEqual([2, 4, 6, 8]);

  expect(
    array.filter((number) => {
      return number % 2 !== 0;
    })
  ).toStrictEqual([1, 3, 5]);
  expect(array.filter((number) => number % 2 !== 0)).toStrictEqual([1, 3, 5]);
});

test("objectの練習", () => {
  const obj = {};
  //Object.keysでプロパティのkeyをすべて配列(string)でとってきてくれる
  expect(Object.keys(obj).length).toBe(0);
  expect(Object.keys(obj)).toStrictEqual([]);
  const blueGreen = "blue-green";
  const color = {
    red: "red",
    green: "green",
    blue: "blue",
    [blueGreen]: "blue-green",
  };

  expect(Object.keys(color)).toStrictEqual([
    "red",
    "green",
    "blue",
    "blue-green",
  ]);
  expect(Object.keys(color).length).toStrictEqual(4);
  expect(color.red).toBe("red");
  expect(color.green).toBe("green");
  expect(color.blue).toBe("blue");

  //省略
  const AAA = "あああ";

  const A1 = {
    AAA: AAA,
  };
  //プロパティ名(AAA)と値に指定する変数名(AAA)が同じ場合、以下の様に省略できる
  const A2 = {
    AAA,
  };

  expect(A1).toStrictEqual(A2);

  //オブジェクトの追加
  //ドット記法
  color.orange = "orange";
  expect(color.orange).toStrictEqual("orange");

  //ブラケット記法
  // color["blue-green"] = "blue-green";
  expect(color["blue-green"]).toStrictEqual("blue-green");
});

test("if/elseifの練習", () => {
  const a = function (version) {
    if (version === "ES5") {
      return "ECMAScript 5";
    } else if (version === "ES6") {
      return "ECMAScript 2015";
    } else if (version === "ES7") {
      return "ECMAScript 2016";
    }
    return "unknown";
  };

  expect(a("ES5")).toBe("ECMAScript 5");
  expect(a("ES6")).toBe("ECMAScript 2015");
  expect(a("ES7")).toBe("ECMAScript 2016");
  expect(a(2)).toBe("unknown");
});

test("オブジェクトの練習", () => {
  //プロパティのチェック方法
  const obj = {
    one: 1,
  };

  expect(obj.one).toStrictEqual(1);
  //undefinedでチェックする方法
  expect(obj.two).toStrictEqual(undefined);

  //object.hasOwnを呼び出す練習
  expect(Object.hasOwn(obj, "one")).toStrictEqual(true);
  expect(Object.hasOwn(obj, "two")).toStrictEqual(false);

  //object.keys,object.values,object.entriesを呼び出してテストコードで動きの確認
  expect(Object.keys(obj)).toStrictEqual(["one"]);
  expect(Object.values(obj)).toStrictEqual([1]);
  //オブジェクトの"プロパティ名と値の配列"の配列を返すことに注意
  expect(Object.entries(obj)).toStrictEqual([["one", 1]]);
});

test("Object assign/spred構文の練習", () => {
  const obj1 = { one: 1, two: 2, three: 3 };
  const obj2 = { four: 4, five: 5, three: 30 };

  expect(Object.assign({}, obj1, obj2)).toStrictEqual({
    one: 1,
    two: 2,
    three: 30,
    four: 4,
    five: 5,
  });
  expect({ ...obj1, ...obj2, six: 6 }).toStrictEqual({
    one: 1,
    two: 2,
    three: 30,
    four: 4,
    five: 5,
    six: 6,
  });
});

test("配列の分割代入の練習", () => {
  const array = [1, 2, 3];
  const [one, two, three] = array;

  expect(array[0]).toStrictEqual(one);
  expect(array[1]).toStrictEqual(two);
  expect(array[2]).toStrictEqual(three);
});

test("indexofの練習", () => {
  const array = [1, 2, 3, "red"];

  expect(array.indexOf(0)).toStrictEqual(-1);
  expect(array.indexOf(1)).toStrictEqual(0);
  expect(array.indexOf("red")).toStrictEqual(3);

  const obj = { blue: "青" };
  const array1 = [1, 2, 3, obj];
  expect(array1.indexOf({ blue: "青" })).toStrictEqual(-1);
  expect(array1.indexOf(obj)).toStrictEqual(3);
});

test("findindex/findの練習", () => {
  const obj = { test: "社会" };
  const subject = [
    { test: "国語" },
    { test: "数学" },
    { test: "英語" },
    obj,
    { test: "社会" },
  ];

  // findindex
  expect(
    subject.findIndex((obj) => {
      return obj.test === "英語";
    })
  ).toStrictEqual(2);
  // [memo]{ test: "社会" }のオブジェクトが2つあっても条件を満たす最初の要素のindexを返す
  expect(
    subject.findIndex((obj) => {
      return obj.test === "社会";
    })
  ).toStrictEqual(3);

  // find
  expect(
    subject.find((obj) => {
      return obj.test === "社会";
    })
  ).toStrictEqual({ test: "社会" });

  expect(
    subject.find((obj) => {
      return false;
    })
  ).toStrictEqual(undefined);
});

test("slice/includesの練習", () => {
  const obj = { test: "社会" };
  const subject = [1, 2, 3, obj];
  // slice
  expect(subject.slice(0, 2)).toStrictEqual([1, 2]);
  expect(subject.slice(-1)).toStrictEqual([obj]);
  // includes
  expect(subject.includes(obj)).toStrictEqual(true);
});

test("someの練習", () => {
  const obj = { test: "社会" };
  const subject = [{ test: "国語" }, { test: "数学" }, { test: "英語" }, obj];

  expect(
    subject.some((obj) => {
      return obj.test === "社会";
    })
  ).toStrictEqual(true);
});

test("push/concat/flat/spliceの練習", () => {
  const array = ["A", "B", "C"];
  // pushは配列を渡すと、[]がついたまま配列に追加される(一次元高くなる)
  array.push(["D", "E"]);
  // concatは配列を渡すと、[]を除く中身のみ配列に追加される(次元は変わらない)
  const arrayConcat = array.concat(["F", "G"]);

  expect(array).toStrictEqual(["A", "B", "C", ["D", "E"]]);
  expect(arrayConcat).toStrictEqual(["A", "B", "C", ["D", "E"], "F", "G"]);
  expect(arrayConcat.flat()).toStrictEqual(["A", "B", "C", "D", "E", "F", "G"]);

  array.splice(1, 3);
  arrayConcat.splice(2, 3);
  expect(array).toStrictEqual(["A"]);
  expect(arrayConcat).toStrictEqual(["A", "B", "G"]);
});

test("mapの練習", () => {
  const array = [1, 2, 3];

  expect(
    array.map((number) => {
      return number * 10;
    })
  ).toStrictEqual([10, 20, 30]);
  // allow functionの省略記法
  expect(array.map((number) => number * 10)).toStrictEqual([10, 20, 30]);

  const array2 = [{ color: "オレンジ" }, { color: "青" }, { color: "ピンク" }];
  expect(array2.map((obj) => obj.color)).toStrictEqual([
    "オレンジ",
    "青",
    "ピンク",
  ]);

  const array3 = [-3, -2, -1, 0, 1, 2, 3];
  expect(
    array3.map((number) => {
      if (number < 0) {
        return false;
      } else {
        return true;
      }
    })
  ).toStrictEqual([false, false, false, true, true, true, true]);
  // 上記のシンプルな書き換え↓
  expect(
    array3.map((number) => {
      return number >= 0;
    })
  ).toStrictEqual([false, false, false, true, true, true, true]);
});

test("filterの練習", () => {
  const array = [1, 4, 7, 9];

  expect(array.filter((number) => number % 2 === 1)).toStrictEqual([1, 7, 9]);
  expect(array.filter((number) => number % 2 === 0)).toStrictEqual([4]);

  const array2 = [
    { fruits: "オレンジ" },
    { fruits: "イチゴ" },
    { fruits: "バナナ" },
    { fruits: "マンゴー" },
  ];
  const array3 = ["オレンジ", "イチゴ"];
  expect(array2.filter((obj) => array3.includes(obj.fruits))).toStrictEqual([
    { fruits: "オレンジ" },
    { fruits: "イチゴ" },
  ]);
});

test("mapとfilterの練習", () => {
  const array2 = [
    { fruits: "オレンジ" },
    { fruits: "イチゴ" },
    { fruits: "バナナ" },
    { fruits: "マンゴー" },
  ];
  const array3 = ["オレンジ"];
  expect(
    array2
      .filter((obj) => array3.includes(obj.fruits))
      .map((obj) => "一番好きな果物は" + obj.fruits + "です")
  ).toStrictEqual(["一番好きな果物はオレンジです"]);
});

test("mapの練習2", () => {
  const array = ["A", "B", "C"];
  const obj = [{ value: "A" }, { value: "B" }, { value: "C" }];

  expect(
    array.map((v) => v.toLowerCase()).map((v) => ({ value: v }))
  ).toStrictEqual([{ value: "a" }, { value: "b" }, { value: "c" }]);

  expect(array.map((v) => ({ value: v.toLocaleLowerCase() }))).toStrictEqual([
    { value: "a" },
    { value: "b" },
    { value: "c" },
  ]);
});

test("indexof/starts,endsWith/includesの練習", () => {
  const Yen = "円";
  const price = "￥１，０００";
  const priceWithoutSymbol = price.slice(1);
  const priceWithYen = priceWithoutSymbol.concat(Yen);

  // indexof
  expect(price.indexOf("￥")).toStrictEqual(0);
  // priceに"円"は含まれないので-1が返ってくる
  expect(price.indexOf(Yen)).toStrictEqual(-1);
  // マッチした最初の文字のインデックスを返す
  expect(priceWithYen.indexOf("００")).toStrictEqual(2);

  // starts/endsWith
  expect(price.startsWith("￥")).toStrictEqual(true);
  expect(priceWithYen.startsWith("￥")).toStrictEqual(false);
  expect(price.endsWith("円")).toStrictEqual(false);
  expect(priceWithYen.endsWith("円")).toStrictEqual(true);

  // includes
  expect(price.includes("１，０００")).toStrictEqual(true);
  expect(priceWithYen.includes("1,000")).toStrictEqual(false);
});
