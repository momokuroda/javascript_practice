// console.log("a");

// setTimeout(() => {
//   console.log("1秒後に実行");
// }, 1000);

// console.log("b");

// function asyncPromiseTask() {
//   return new Promise((resolve, reject) => {
//     // さまざまな非同期処理を行う
//     // 非同期処理に成功した場合は、resolveを呼ぶ
//     // resolve("成功");
//     // resolve({ a: "成功" });
//     // 非同期処理に失敗した場合は、rejectを呼ぶ
//     reject(new Error("失敗"));
//   });
// }
// // asyncPromiseTask関数の非同期処理が成功した時、失敗した時に呼ばれる処理をコールバック関数として登録する
// asyncPromiseTask()
//   .then((num) => {
//     // 非同期処理が成功したときの処理
//     console.log(num);
//   })
//   .catch((error) => {
//     // 非同期処理が失敗したときの処理
//     console.log(error);
//   });

// const response = fetch("https://google.com");
// response.then((resp) => {
//   // console.log("ok:" + resp.ok);
//   resp.text().then((text) => {
//     console.log(text);
//   });
// });

// fetch(urls[0]).then((resp) => {
//   console.log(`url0: ${resp.ok}`);
//   fetch(urls[1]).then((resp) => {
//     console.log(`url1: ${resp.ok}`);
//     fetch(urls[2]).then((resp) => {
//       console.log(`url2: ${resp.ok}`);
//     });
//   });
// });

// 同期処理
// taskaの後1秒経過後にtaskbが実行されている
const taska = () => {
  console.log(`タスクaを実行 at ${Date.now()}`);
};
const taskb = () => {
  console.log(`タスクbを実行 at ${Date.now()}`);
};
const blockTime = (blockTime) => {
  const startTime = Date.now();

  while (true) {
    const diffTime = Date.now() - startTime;
    if (blockTime <= diffTime) {
      return;
    }
  }
};

taska();
blockTime(1000);
taskb();

// 非同期処理
// asyncTaskが1秒遅れて実行され、先にtaskBが実行されている。
function taskA() {
  console.log(`タスクAを実行 at ${Date.now()}`);
}

function taskB() {
  console.log(`タスクBを実行 at ${Date.now()}`);
}

function asyncTask() {
  console.log(`非同期のタスクを実行 at ${Date.now()}`);
}

taskA();
setTimeout(() => {
  asyncTask();
}, 1000);
taskB();

// 非同期処理と例外処理
// 同期処理は「try~catch」で例外をキャッチできる
try {
  throw new Error("同期的エラー");
  console.log(`処理は正常に実行されました`);
} catch (error) {
  // エラーに入るので以下の行は実行される
  console.log(`同期エラーが発生しました。`);
}

// 非同期処理は「try~catch」で例外をキャッチできないため、
// 以下の様にコールバック関数内で同期的なエラーとしてキャッチする必要がある
try {
  setTimeout(() => {
    try {
      throw new Error("非同期的なエラー");
    } catch (error) {
      console.log(`非同期的なエラーが発生しました。`);
    }
  }, 10);
} catch (error) {
  // 非同期エラーはキャッチできないため、この行は実行されません
  console.log(`非同期エラーが発生しました。`);
}
console.log("この行は実行されます");

// 非同期処理ではコールバック関数内でエラーをキャッチできるが、
// 非同期処理の外からは、非同期処理の中で例外が発生したかがわからない。
// このため非同期処理の内部で発生したエラーを外へ伝える方法が必要。
// ⇒ 非同期処理の例外の扱い方の主な方法として、[Promise],[Async Function]の2つが存在する。
