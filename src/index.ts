import { scheduleJob } from "node-schedule";
import { Bot } from "./bot";
import { streamMention } from "./client/twitter";

const bot = new Bot();

const time = {
  morning: {
    second: 0,
    minute: 0,
    hour: 7
  },
  lunch: {
    second: 0,
    minute: 30,
    hour: 11
  },
  dinner: {
    second: 0,
    minute: 0,
    hour: 17
  }
};

streamMention.on("tweet", data => {
  console.log(data);
  bot.allTweetToUser(data.user.screen_name, data.id_str);
});

streamMention.on("error", error => {
  console.log(error);
});

(async () => {
  scheduleJob(time.morning, async () => {
    await bot.morningTweet();
  });
  scheduleJob(time.lunch, async () => {
    await bot.lunchTweet();
  });
  scheduleJob(time.dinner, async () => {
    await bot.dinnerTweet();
  });
})();
