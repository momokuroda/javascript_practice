("use strict");

kintone.events.on("app.record.detail.show", (event) => {
  console.log(event);
});

const submitEvent = ["app.record.create.submit", "app.record.edit.submit"];

// レコード編集した時に、文字列1行の内容を見て、数字でなければエラーにする
kintone.events.on(submitEvent, (event) => {
  const record = event.record;

  if (!record.タイトル.value.match(/^([0-9])+$/)) {
    event.error = "タイトルには半角数字のみを入力してください";
    return event;
  }

  debugger;
});

// 複数のレコードを取得して、タイトルに数字が入っていないものを抽出する
kintone.events.on("app.record.index.show", async (event) => {
  console.log(event);

  const body = {
    app: kintone.app.getId(),
  };

  const result = await kintone.api(
    kintone.api.url("/k/v1/records.json", true),
    "GET",
    body
  );
  debugger;
  console.log(result);
});
