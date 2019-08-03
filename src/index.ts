import { getMenu } from "./axios";
import { post } from "./twitter";
import { scheduleJob } from "node-schedule";

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
  scheduleJob(time.morning, async () => {
    const menu = await getMenu({ type: "morning" });
    post({ menu, typeJp: "朝" });
  });

  scheduleJob(time.lunch, async () => {
    const menu = await getMenu({ type: "lunch" });
    post({ menu, typeJp: "お昼" });
  });

  scheduleJob(time.dinner, async () => {
    const menu = await getMenu({ type: "dinner" });
    post({ menu, typeJp: "夜" });
  });
})();
