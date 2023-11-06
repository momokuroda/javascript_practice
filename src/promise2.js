// 【Promiseチェーン】
// ⇒ 複数の非同期処理を順番に扱いたい場合に使用する。
// Promiseチェーンでは、Promiseが失敗しない限り順番にthenメソッドで登録した成功時のコールバック関数を呼び出す。

Promise.resolve()
  .then(() => {
    console.log(`firstPromise`);
  })
  .then(() => {
    console.log(`secondPromise`);
  });

// 上記は以下のように毎回新しい変数に入れて処理をつなげるのと結果的には同じ。
const firstPromise = Promise.resolve();
const secondPromise = firstPromise.then(() => {
  console.log(`Promise1`);
});
const thirdPromise = secondPromise.then(() => {
  console.log(`Promise2`);
});

// Promiseチェーンで一度catchすると、次に呼ばれるのは成功時の処理。
Promise.reject(new Error("失敗"))
  .then(() => {
    console.log(`rejectになっているためスキップ`);
  })
  .catch((e) => {
    console.log(e.message);
  })
  .then(() => {
    console.log(`一度catchされているため、reject⇒resolveとなる`);
  });

// だが、一度catchされた後でも以下行うことでrejectedな状態を保つこともできる
// 【コールバック関数でPromiseインスタンスを返す】
Promise.resolve()
  .then(function onFullfilledA() {
    return Promise.reject(new Error(`Promiseインスタンスでrejectを返す`));
  })
  .then(function onFullfilledB() {
    console.log(`rejectの状態のままなので実行されない`);
  })
  .catch((e) => {
    // Promise.rejectの状態なので、catchに入る
    console.log(e.message);
  })
  .then(function onFullfilledC() {
    console.log(`一度キャッチに入ったので実行される`);
  });

// 【Promiseチェーンの最後に処理を書く】
// ⇒ Promiseのfinallyメソッドは成功、失敗時のどちらの場合でも呼び出されるコールバック関数を登録できる。

const promise = Math.random() < 0.5 ? Promise.resolve() : Promise.reject();
promise
  .then(() => {
    console.log("Promiseのthenメソッド");
  })
  .catch((error) => {
    console.log("Promiseのcatchメソッド");
  })
  .finally(() => {
    // 成功、失敗どちらの場合でも呼び出される
    console.log("Promiseのfinallyメソッド");
  });

// 【Promise.allで複数のPromiseをまとめる】
function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random());
  });
}

const fetchedPromise = Promise.all([
  dummyFetch("/resource/A"),
  dummyFetch("/resource/B"),
]);
// fetchedPromiseの結果をDestructuringでresponseA, responseBに代入している
fetchedPromise.then(([responseA, responseB]) => {
  console.log(responseA.body); // => "Response body of /resource/A"
  console.log(responseB.body); // => "Response body of /resource/B"
});

// [asyncで実装]
function dummyFetch2(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/resource")) {
        resolve({ body: `Response body of ${path}` });
      } else {
        reject(new Error("NOT FOUND"));
      }
    }, 1000 * Math.random());
  });
}
// 複数のリソースをまとめて取得する
async function fetchAllResources(resources) {
  // それぞれのリソースを取得する非同期処理を呼び出す
  const promises = resources.map((resource) => {
    return dummyFetch2(resource);
  });
  // すべてのリソースが取得できるまで待つ
  // Promise.allは [ResponseA, ResponseB] のように結果が配列となる
  const responses = await Promise.all(promises);
  // 取得した結果からレスポンスのボディだけを取り出す
  return responses.map((response) => {
    return response.body;
  });
}
const resources = ["/resource/A", "/resource/B"];
// リソースを取得して出力する
fetchAllResources(resources).then((results) => {
  console.log(results); // => ["Response body of /resource/A", "Response body of /resource/B"]
});
