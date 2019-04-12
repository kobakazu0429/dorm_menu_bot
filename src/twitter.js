require('dotenv').config()

const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.CK,
  consumer_secret: process.env.CS,
  access_token_key: process.env.AK,
  access_token_secret: process.env.AS
});

const dayList = ["日", "月", "火", "水", "木", "金", "土"];

const post = (menu, type, typeJp) => {
  const { year, month, date } = menu;
  const day = dayList[new Date(year, month - 1, date, 9).getDay()];

  const text = [
    `【${year}/${month}/${date}（${day}）】`,
    `今日の${typeJp}のメニューはこちらです`,
    `- - - - - - - - - - - - - - - -`,
    `${menu[type]}`].join("\n");

  client.post('statuses/update', { status: text }, (error, tweet, response) => {
    if (!error) {
      console.log(tweet);
    }
  });
}

exports.post = post;
