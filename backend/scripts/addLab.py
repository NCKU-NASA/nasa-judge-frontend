#!/usr/bin/python3
import pymysql, sys, json

# TODO: fill these values
username = ''
password = ''
database = ''
table_name = ''

if len(sys.argv) != 3:
  print(sys.argv)
  print('Usage: ./addLab.py <lab_id> <file_path>')
  sys.exit(1)

lab_id = sys.argv[1]
path = sys.argv[2]

with open(path, 'r') as f:
  data = f.read()
try:
  json.loads(data)
  db = pymysql.connect(
    host='localhost',
    user=username,
    password=password,
    database=database,
  )
except Exception as err:
  print(err)
  sys.exit(1)

cur = db.cursor();
sql = f'INSERT INTO `{table_name}` (`id`, `contents`) VALUES (%s, %s)'
cur.execute(sql, (lab_id, data))
db.commit()
db.close()
