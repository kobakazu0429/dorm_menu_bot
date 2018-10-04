import os
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())


CK = os.environ.get('CK')
CS = os.environ.get('CS')
AK = os.environ.get('AK')
AS = os.environ.get('AS')
