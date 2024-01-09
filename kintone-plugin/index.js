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
  console.log(elements);

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
  console.log("編集画面表示");

  // TODO:新規レコード画面で、ボタンを押したら全レコードのタイトルの最大値を取得して、
  // 最大値＋１を計算してタイトルに入力する

  // ヘッダーのスペースのエレメントを取得
  const element = kintone.app.record.getHeaderMenuSpaceElement();
  // ボタンを表示する
  const button = document.createElement("button");
  button.textContent = "最大値+1の入力";

  // ボタン押下処理
  button.onclick = async () => {
    console.log("clicked");
    // 全レコードのタイトル取得
    const stringIDs = await getIDs();
    console.log(stringIDs);
    const maxID = getMaxID(stringIDs);
  };
  element.appendChild(button);
});

// 数字をチェックする関数を実装する
function isNumber(numberString) {
  // return
}

function getMaxID(IDs) {
  // const numberIDs = IDs.filter((ID) => {
  //   return Number.isInteger(ID);
  // }).map((ID) => {
  //   return Number.parseInt(ID);
  // });

  // isNumber()を使ってnumberIDsを作成する
  const numberIDs = IDs.map((ID) => {
    return Number.parseInt(ID);
  });
  console.log(numberIDs);
  return 100;
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
    console.log(response);
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
