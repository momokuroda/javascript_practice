import { helloWorld } from "./sample.mjs";

("use strict");

kintone.events.on("app.record.detail.show", (event) => {
  console.log(event);
});

const submitEvent = ["app.record.create.submit", "app.record.edit.submit"];

// レコード編集した時に、文字列1行の内容を見て、数字でなければエラーにする
kintone.events.on(submitEvent, (event) => {
  const record = event.record;

  if (!record.タイトル.value.match(/^([0-9])+$/)) {
    window.alert("タイトルには半角数字のみを入力してください");
    return false;
  }

  //   if (isNaN(record.タイトル.value)) {
  //     window.alert("タイトルには数字を入力してください");
  //     return;
  //   }

  debugger;
});
