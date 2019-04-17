import { config } from "dotenv";
import { AccessTokenOptions } from "twitter";

config();

export const TWITTER_CONFIG: AccessTokenOptions = {
  consumer_key: process.env.CK || "",
  consumer_secret: process.env.CS || "",
  access_token_key: process.env.AK || "",
  access_token_secret: process.env.AS || ""
};
