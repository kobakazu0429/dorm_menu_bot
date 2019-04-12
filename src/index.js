const axios = require("./axios");
const twitter = require("./twitter");
const schedule = require('node-schedule');

const now = new Date();
const year = now.getFullYear();
const month = (now.getMonth() + 1).toString().padStart(2, "0");
const date = now.getDate();

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

(async () => {
  schedule.scheduleJob(time.morning, async () => {
    const menu = await axios.getMenu({ year, month, date, type: "morning" });
    twitter.post(menu, "morning", "朝")
  });

  schedule.scheduleJob(time.lunch, async () => {
    const menu = await axios.getMenu({ year, month, date, type: "lunch" });
    twitter.post(menu, "lunch", "お昼")
  });

  schedule.scheduleJob(time.dinner, async () => {
    const menu = await axios.getMenu({ year, month, date, type: "dinner" });
    twitter.post(menu, "dinner", "夜")
  });
})();
