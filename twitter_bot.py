import sys

from twitter import Api
from requests import get

from utils import to_week_jp, create_msg
from env import CK, CS, AK, AS


def postTwitter():
    api = Api(consumer_key=CK,
              consumer_secret=CS,
              access_token_key=AK,
              access_token_secret=AS)

    r = get('https://dorm-menu-api.herokuapp.com/next')

    db = r.json()

    msg = create_msg(db)

    api.PostUpdate(msg)

    print('Posted : \n%s' % msg)


if __name__ == '__main__':
    postTwitter()
