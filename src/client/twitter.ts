import Twit = require("twit");
import { TWITTER_CONFIG } from "../env";

export const T = new Twit(TWITTER_CONFIG);

interface IPost {
  status: string;
  in_reply_to_status_id?: string;
}

export const post = (payload: IPost) => {
  console.log("posted");

  T.post("statuses/update", payload, (error, tweet) => {
    if (!error) {
      console.log(tweet);
    }
  });
};

export const streamMention = T.stream("statuses/filter", {
  track: "@kure_kosen_dorm"
});
