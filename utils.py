import sys
from datetime import datetime


def to_week_jp(y, m, d):
    WEEK_JP = ["月", "火", "水", "木", "金", "土", "日"]

    parsed_date = str(y) + '/' + str(m) + '/' + str(d)

    today = datetime.strptime(parsed_date, '%Y/%m/%d')

    return WEEK_JP[today.weekday()]


def create_msg(db):
    year = db['year']
    month = db['month']
    day = db['day']

    menu_dict = {}

    if 'morning' in db.keys():
        menu_dict = {
            'name': '朝',
            'menu': db['morning']
        }

    elif 'lunch' in db.keys():
        menu_dict = {
            'name': 'お昼',
            'menu': db['lunch']
        }

    elif 'dinnerA' in db.keys():
        menu_dict = {
            'name': '夜',
            'menu': 'A : %s\nB : %s\nAB: %s' % (db['dinnerA'], db['dinnerB'], db['dinnerAB'])
        }

    else:
        sys.exit()

    msg = '【%s/%s/%s（%s）】\n今日の%sのメニューはこちらです\n- - - - - - - - - - - - - - -\n%s' % (
        year, month, day, to_week_jp(year, month, day), menu_dict['name'], menu_dict['menu'])

    return msg
