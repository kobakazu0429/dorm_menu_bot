import os
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())


CK = os.environ.get('CK')
CS = os.environ.get('CS')
AK = os.environ.get('AK')
AS = os.environ.get('AS')

CHANNEL_ACCESS_TOKEN = os.environ.get('CHANNEL_ACCESS_TOKEN')
CHANNEL_SECRET = os.environ.get('CHANNEL_SECRET')

GAS_URL = os.environ.get('GAS_URL')
GAS_TOKEN = os.environ.get('GAS_TOKEN')
