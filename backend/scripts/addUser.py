#!/usr/bin/python3
import pymysql, sys, json, os
from dotenv import load_dotenv

load_dotenv()

# TODO: fill these values
username = os.getenv('DB_USER')
password = os.getenv('DB_PASSWD')
database = os.getenv('DB_NAME')
table_name = 'user'

if len(sys.argv) != 2:
  print('Usage: ./addUser.py <file_path>')
  sys.exit(1)

path = sys.argv[1]

with open(path, 'r') as f:
  data = f.read()
try:
  data = json.loads(data)
  db = pymysql.connect(
    host='localhost',
    user=username,
    password=password,
    database=database,
  )
except Exception as err:
  print(err)
  sys.exit(1)

if not data['studentId'] or not data['password']:
  print('studentId and password are required')
  sys.exit(1)

cur = db.cursor();
sql = f'INSERT INTO `{table_name}` (`studentId`, `password`) VALUES (%s, %s)'
cur.execute(sql, (data['studentId'], data['password']))
db.commit()
db.close()
