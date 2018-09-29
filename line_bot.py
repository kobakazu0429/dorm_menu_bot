from flask import Flask, request, abort, make_response, jsonify

from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage

import os
import json
from requests import get, post
from utils import to_week_jp, create_msg
from env import CHANNEL_ACCESS_TOKEN, CHANNEL_SECRET, GAS_URL, GAS_TOKEN


app = Flask(__name__)

line_bot_api = LineBotApi(CHANNEL_ACCESS_TOKEN)
handler = WebhookHandler(CHANNEL_SECRET)


@app.route("/", methods=['GET'])
def test():
    return make_response(jsonify({'status': 'Server is Alive Now.'}), 200)


@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers['X-Line-Signature']

    body = request.get_data(as_text=True)

    body_json = json.loads(body)

    user_id = body_json['events'][0]['source']['userId']

    post(GAS_URL, {'userId': user_id})

    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'


@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    r = get('https://dorm-menu-api.herokuapp.com/next')
    db = r.json()
    msg = create_msg(db)

    line_bot_api.reply_message(
        event.reply_token,
        TextSendMessage(text=msg))


def postLINE():
    r = get('https://dorm-menu-api.herokuapp.com/next')
    db = r.json()
    msg = create_msg(db)

    users = get(GAS_URL, params={'token': GAS_TOKEN})

    line_bot_api.multicast(
        users.json(), TextSendMessage(text=msg))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
