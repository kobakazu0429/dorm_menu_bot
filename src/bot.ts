import { getMenu } from "./axios";
import { getJST } from "./utils";
import { post } from "./client/twitter";

interface IMsgPayload {
  menu: string | null;
  typeJp?: "朝" | "お昼" | "夜";
}

export class Bot {
  private createMsg({ menu, typeJp }: IMsgPayload) {
    const { year, month, date, day } = getJST();

    if (menu === null) {
      return "エラーが発生しました。 @kobakazu0429 は問題を確認してください。";
    } else {
      const title = typeJp
        ? `今日の${typeJp}のメニューはこちらです`
        : `今日のメニューはこちらです`;

      return [
        `【${year}/${month}/${date}（${day}）】`,
        title,
        `- - - - - - - - - - - - - - - -`,
        `${menu}`
      ].join("\n");
    }
  }

  public async morningTweet() {
    const menu = await getMenu({ type: "morning" });
    const text = this.createMsg({ menu, typeJp: "朝" });
    post({ status: text });
  }

  public async lunchTweet() {
    const menu = await getMenu({ type: "lunch" });
    const text = this.createMsg({ menu, typeJp: "お昼" });
    post({ status: text });
  }

  public async dinnerTweet() {
    const menu = await getMenu({ type: "dinner" });
    const text = this.createMsg({ menu, typeJp: "夜" });
    post({ status: text });
  }

  public async allTweet() {
    const menu = await getMenu();
    const text = this.createMsg({ menu });
    post({ status: text });
  }

  public allTweetToUser(screenName: string, replyId: string) {
    getMenu().then(menu => {
      const text = `@${screenName}\n${this.createMsg({ menu })}`;
      post({ status: text, in_reply_to_status_id: replyId });
    });
  }
}
