// 練習2 直列実行と並列実行で実行時間の差を理解する
// 直列実行
const startTime = Date.now();
async function serial() {
  const response1 = await fetch("https://google.com");
  const response2 = await fetch("https://google.com");
  const response3 = await fetch("https://google.com");
  const response4 = await fetch("https://google.com");
  const response5 = await fetch("https://google.com");
  const diffTime = Date.now() - startTime;
  console.log(`直列実行 : ${diffTime}`);
}
serial();

// 並列実行
const startTime2 = Date.now();
async function parallel() {
  const [response1, response2, response3, response4, response5] =
    await Promise.all([
      fetch("https://google.com"),
      fetch("https://google.com"),
      fetch("https://google.com"),
      fetch("https://google.com"),
      fetch("https://google.com"),
    ]);

  const diffTime = Date.now() - startTime;
  console.log(`並列実行 : ${diffTime}`);
}

parallel();
