("use strict");

kintone.events.on("app.record.detail.show", (event) => {
  console.log(event);
});

const submitEvent = ["app.record.create.submit", "app.record.edit.submit"];

// レコード編集した時に、文字列1行の内容を見て、数字でなければエラーにする
kintone.events.on(submitEvent, (event) => {
  const record = event.record;

  if (!record.title.value.match(/^([0-9])+$/)) {
    event.error = "タイトルには半角数字のみを入力してください";
    return event;
  }

  debugger;
});

// 複数のレコードを取得して、タイトルに数字が入っていないものを抽出する
kintone.events.on("app.record.index.show", async (event) => {
  const record = event.record;

  const body = {
    app: kintone.app.getId(),
  };

  const result = await kintone.api(
    kintone.api.url("/k/v1/records.json", true),
    "GET",
    body
  );

  const result2 = result.records.filter((v) => {
    return v.title.value.match(/^([^0-9])+$/);
  });

  const exceptNumberRecords = result2.reverse();

  const msgs = [];
  exceptNumberRecords.forEach((element) => {
    msgs.push(element.レコード番号.value);
  });

  console.log(
    `レコード番号${msgs}のレコードはタイトルに数字が含まれています。`
  );

  // 数字が含まれているレコードの色を変える
  // const el = kintone.app.getFieldElements("レコード番号");
  // console.log(el);
  // el.style.color = "#ff0000"; // 文字色
  // el.style.backgroundColor = "#ffff00"; // 背景色
  // el.style.fontSize = "20px"; // サイズ

  // return event;
});
