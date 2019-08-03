import Twit from 'twit';
import { TWITTER_CONFIG } from "./env";
import { getJST } from "./utils";

const T = new Twit(TWITTER_CONFIG);

interface IOptions {
  menu: string | null;
  typeJp: "朝" | "お昼" | "夜";
}

export const post = (options: IOptions) => {
  const { year, month, date, day } = getJST();
  const { menu, typeJp } = options;

  let text: string;

  if (menu === null) {
    text = "エラーが発生しました。管理者の方は問題を確認してください。";
  } else {
    text = [
      `【${year}/${month}/${date}（${day}）】`,
      `今日の${typeJp}のメニューはこちらです`,
      `- - - - - - - - - - - - - - - -`,
      `${menu}`
    ].join("\n");
  }

  T.post("statuses/update", { status: text }, (error, tweet) => {
    if (!error) {
      console.log(tweet);
    }
  });
};
