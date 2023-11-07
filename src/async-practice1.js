// 練習1
// 1)並列実行されるパターン
const urls = [
  "https://google.com",
  "https://www.netflix.com/jp/",
  "https://www.amazon.co.jp/",
];

function fetchUrl(url) {
  // 各urlにアクセスするpromiesを生成する
  return fetch(url)
    .then((response) => {
      // console.log(`Fetched${urls}`);
      return response.text();
    })
    .then((data) => {
      console.log(`Fetch成功：${url}`);
      return data;
    })
    .catch((error) => {
      console.log(`Fetch失敗： ${url}: ${error}`);
      throw error; // 失敗扱い=.thenは呼ばれない
    });
}

// .mapについて
// ⇒ 各要素1つずつに対して「コールバック関数」を実行し、その結果を新しい配列として返す
// const promises = urls.map((url) => {
//   fetchUrl(url);
// });

// // promiseの中身が空になる(?)
// console.log(`promise:${promises}`);

// Promise.all(promises)
//   .then((results) => {
//     console.log(results);
//   })
//   .catch((e) => {
//     console.log(e.messages);
//   });

// 2)直列実行されるパターン

let current = Promise.resolve();
// current = pendingになる
for (const url of urls) {
  console.log(url);

  current = current
    .then((url) => {
      return fetchUrl(url);
    })
    .catch((e) => {
      console.log(e.messages);
    });
  console.log(current);
}

// 3)失敗する(アクセスできないurlを指定する)
