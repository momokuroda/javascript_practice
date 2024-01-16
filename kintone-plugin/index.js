("use strict");

const submitEvent = ["app.record.create.submit", "app.record.edit.submit"];

// レコード編集した時に、文字列1行の内容を見て、数字でなければエラーにする
kintone.events.on(submitEvent, (event) => {
  const record = event.record;

  if (!record.title.value.match(/^([0-9])+$/)) {
    event.error = "タイトルには半角数字のみを入力してください";
    return event;
  }
});

// 複数のレコードを取得して、タイトルがすべて数字ではないものを抽出する
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
    return !/^[0-9]+$/.test(v.title.value);
  });

  const exceptNumberRecords = result2;

  const recordIDs = exceptNumberRecords.map((element) => {
    return element.レコード番号.value;
  });

  console.log(
    `レコード番号${recordIDs}のレコードはタイトルに数字が含まれています。`
  );

  // 数字が含まれているレコードの色を変える
  const elements = kintone.app.getFieldElements("レコード番号");

  elements.forEach((element) => {
    const recordNumber = element.textContent;
    const found = recordIDs.some((recordID) => {
      return recordID === recordNumber;
    });

    if (found) {
      element.classList.add("warn");
    }
  });
});

// 編集、追加画面のイベント
const editEvent = ["app.record.create.show", "app.record.edit.show"];
kintone.events.on(editEvent, (event) => {
  // 新規レコード画面で、ボタンを押したら全レコードのタイトルの最大値を取得して、
  // 最大値＋１を計算してタイトルに入力する

  // ヘッダーのスペースのエレメントを取得
  const element = kintone.app.record.getHeaderMenuSpaceElement();
  // ボタンを表示する
  const button = document.createElement("button");
  button.textContent = "最大値+1の入力";

  // ボタン押下処理
  button.onclick = async () => {
    // 全レコードのタイトル取得
    const stringIDs = await getIDs();
    const maxID = getMaxID(stringIDs);

    const { record } = kintone.app.record.get();
    record["title"].value = maxID;
    kintone.app.record.set({ record });
  };
  element.appendChild(button);
});

function getMaxID(IDs) {
  // isNumber()を使ってnumberIDsを作成する
  const numberIDs = IDs.map((ID) => {
    return Number.parseInt(ID);
  }).filter((n) => !Number.isNaN(n));
  return Math.max(...numberIDs) + 1; //numberIDsは配列なので、「...numbersIDs」として配列をspread構文化して渡している
}

async function getIDs() {
  let ID = "";

  {
    const body = {
      app: kintone.app.getId(),
      fields: ["title"],
      size: 5,
    };

    const response = await kintone.api(
      kintone.api.url("/k/v1/records/cursor.json", true),
      "POST",
      body
    );
    ID = response.id;
  }
  const IDs = [];
  {
    const body = {
      id: ID,
    };

    let next = true;
    while (next) {
      const response = await kintone.api(
        kintone.api.url("/k/v1/records/cursor.json", true),
        "GET",
        body
      );
      next = response.next;
      IDs.push(
        response.records.map((r) => {
          return r.title.value;
        })
      );
      console.log(response);
    }
  }

  return IDs.flat();
}
