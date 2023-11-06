// 練習1
// 1)並列実行されるパターン
// const url = [
//   "https://google.com",
//   "https://www.netflix.com/jp/",
//   "https://www.amazon.co.jp/",
// ];

// function fetchUrl(url) {
//   // 各urlにアクセスするpromiesを生成する
//   return fetch(url)
//     .then((response) => {
//       // console.log(`Fetched${url}`);
//       return response.text();
//     })
//     .then((data) => {
//       console.log(`Fetched${url}`);
//       return data;
//     })
//     .catch((error) => {
//       console.log(`Failed to Fetch ${url}: ${error}`);
//       throw error; // 失敗扱い=.thenは呼ばれない
//     });
// }

// const promises = url.map((url) => {
//   fetchUrl(url);
// });

// Promise.all(promises)
//   .then((results) => {
//     console.log(results);
//   })
//   .catch((e) => {
//     console.log(e.messages);
//   });

// 2)直列実行されるパターン
// let current = Promise.resolve();

// for (const url of urls) {
//   console.log(url);
//   current = current.then((url) => {
//     return fetch(url);
//   });
// }

// 3)失敗する(アクセスできないurlを指定する)

// // 練習2 直列実行と並列実行で実行時間の差を理解する
// // 直列実行
// const startTime = Date.now();
// async function serial() {
//   const response1 = await fetch("https://google.com");
//   const response2 = await fetch("https://google.com");
//   const response3 = await fetch("https://google.com");
//   const response4 = await fetch("https://google.com");
//   const response5 = await fetch("https://google.com");
//   const diffTime = Date.now() - startTime;
//   console.log(`直列実行 : ${diffTime}`);
// }
// serial();

// // 並列実行
// const startTime2 = Date.now();
// async function parallel() {
//   const [response1, response2, response3, response4, response5] =
//     await Promise.all([
//       fetch("https://google.com"),
//       fetch("https://google.com"),
//       fetch("https://google.com"),
//       fetch("https://google.com"),
//       fetch("https://google.com"),
//     ]);

//   const diffTime = Date.now() - startTime;
//   console.log(`並列実行 : ${diffTime}`);
// }

// parallel();
