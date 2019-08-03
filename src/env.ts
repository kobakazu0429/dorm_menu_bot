import { config } from "dotenv";
import {ConfigKeys} from 'twit';

config();

export const TWITTER_CONFIG: ConfigKeys = {
  consumer_key: process.env.CK || '',
  consumer_secret: process.env.CS || '',
  access_token: process.env.AK || '',
  access_token_secret: process.env.AS || ''
};
