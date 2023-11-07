// 【[Promise]について】
// ⇒ 非同期処理の状態や結果を表現するビルトインオブジェクト。
// Promiseの練習1
function dummyFetch(path) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (path.startsWith("/success")) {
        resolve(`正しいパスです`);
      } else {
        reject(`パスは"/success"から始めてください`);
      }
    }, 1000);
  });
}

dummyFetch("/success/dummy").then(
  (resp) => {
    console.log(resp);
  },
  (resp) => {
    console.log(resp);
  }
);

dummyFetch("/failed/dummy").then(
  (resp) => {
    console.log(resp);
  },
  (resp) => {
    console.log(resp);
  }
);

// Promiseの練習2
const dummyTell = (tell) => {
  return new Promise((res, rej) => {
    if (tell.startsWith(`090`)) {
      res(`正しい電話番号です`);
    } else {
      rej(`間違った電話番号です`);
    }
  });
};
const onFullfilled = (resp) => {
  console.log(resp);
};

const onRejected = (resp) => {
  console.log(resp);
};

dummyTell("090-1111-2222").then(onFullfilled, onRejected);

// 【promise.thenとpromise.prototype.catch】
// promiseのthenメソッドは成功と失敗のコールバック関数の2つを受け取るが、どちらの引数も省略可能。

// 失敗時のコールバック関数のみ登録する例
const errorPromise = (msg) => {
  return new Promise((resolve, reject) => {
    reject(new Error(msg));
  });
};

// [promise.then]
// 引数にundefindを書くのは非推奨
errorPromise(`thenでエラー出力`).then(undefined, (resp) => {
  console.log(resp.message);
});

// [promise.prototype.catch]
// 推奨：エラーのみの場合はcatchで処理する
errorPromise(`catchでエラー出力`).catch((resp) => {
  console.log(resp.message);
});

// 【Promiseと例外】
// Promiseではコンストラクタの処理で例外が発生した場合に自動的に例外がキャッチされる。
// ⇒ reject関数を呼び出したのと同様の処理をする

const throwPromise = () => {
  return new Promise((resolve, reject) => {
    throw new Error(`throwでの例外発生`);
    console.log(`エラー発生のため実行されない`);
  });
};

throwPromise().catch((error) => console.log(error.message));

// 【promiseの状態】
// 1.fullfilled：resolveした時の状態。onFullfilledが呼ばれる。
// 2.rejected：rejectした時の状態。onRejectedが呼ばれる。
// 3.pending：上記以外の状態。new Promiseでインスタンスを作成した時の初期状態。
// ※settled(不変)：pendingから一度でもfullfilled/rejectedへ変化するとそれ以降は状態変化しなくなること。

// settledの例
// resolveの後にrejectを呼び出しても、一度resolveになった結果は変わらない
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
    reject(new Error(`settledテスト例外`));
  }, 1000);
});

promise
  .then(() => {
    console.log(`Fullfilled`);
  })
  .catch((error) => console.log(error.message));

// 【Promise.resolveメソッド】
// ⇒ fullfilledの状態となったPromiseインスタンスを作成する
//    new Promiseの糖衣構文。

// 以下コードは同じ意味を持つ。
// [new Promise]の場合
const fullfilledPromise = new Promise((resolve) => {
  resolve(42);
});
fullfilledPromise.then((resp) => {
  console.log(resp);
});
// [Promise.resolveメソッドの場合]
const fullfilledMethodPromise = Promise.resolve(42);
fullfilledMethodPromise.then((resp) => {
  console.log(resp);
});

Promise.resolve(`resolveメソッドの成功`).then((resp) => {
  console.log(resp);
});

// Promiseインスタンスにthenメソッドで登録したコールバック関数は、常に非同期なタイミングで実行される。
// ⇒ すべての同期処理が実行された後に、非同期なタイミングでコールバック関数は実行される

const promise2 = new Promise((resolve) => {
  console.log(`1.これからresolve`);
  resolve();
});
promise2.then(() => {
  console.log(`3.コールバック関数の実行`);
});

console.log(`2.同期処理の実行`);

// [Promise.reject]
// ⇒ rejectedの状態となったPromiseインスタンスを作成する
// [promiseインスタンスの場合]
const rejectedPromise = new Promise((resolve, reject) => {
  throw new Error(`promiseインスタンスでの例外`);
});
rejectedPromise.catch((e) => {
  console.log(e.message);
});

// [rejectメソッドの場合]
const rejectedMethodPromise = Promise.reject(
  new Error(`rejectメソッドでの例外`)
);
rejectedMethodPromise.catch((e) => {
  console.log(e.message);
});

// 上記のrejectメソッドでの例外は以下で書き直すことができる
Promise.reject(new Error(`rejectメソッドでの例外2`)).catch((e) => {
  console.log(e.message);
});
