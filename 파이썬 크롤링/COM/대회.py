from bs4 import BeautifulSoup
from urllib.request import urlopen
from datetime import datetime, timedelta
import time
import pymysql
from traceback import format_exc


base_url = "https://www.welcomekakao.com/competitions"
db = pymysql.connect("clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com","anetfotoa","a4415588","clova", charset='utf8')
cursor = db.cursor()

def collecting(base_url):

    while True:

        data = urlopen(base_url).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("div", {"class":"card-block"})
        total_data2 = soup.find("div", {"class":"expired-competition"})
        a = total_data.find("h4").text
        b = total_data2.find_all("div", {"class":"card-content"})

        sql2 = """delete from 대회"""
        cursor.execute(sql2)
        db.commit()



        table = total_data.find_all("p")
        종목 = table[0].text
        회별 = table[1].text
        sql = """insert into 대회(대회이름,접수,저장) values (%s, %s, %s)"""
        cursor.execute(sql, (a, 종목, 회별))
        db.commit()

        for each in b:
            구분 = each.find("h5").text
            table = each.find_all("p")
            종목스 = table[0].text
            회별스 = table[1].text
            sql1 = """insert into 대회(대회이름,접수,저장) values (%s, %s, %s)"""
            cursor.execute(sql1, (구분, 종목스, 회별스))
            db.commit()



        break

collecting(base_url)
