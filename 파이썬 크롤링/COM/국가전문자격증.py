from bs4 import BeautifulSoup
from urllib.request import urlopen
from datetime import datetime, timedelta
import time
import pymysql
from traceback import format_exc


base_url = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&query=%EA%B5%AD%EA%B0%80%EC%A0%84%EB%AC%B8%EC%9E%90%EA%B2%A9%EC%A6%9D&ie=utf8&mra=bkgy"
db = pymysql.connect("clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com","anetfotoa","a4415588","clova", charset='utf8')
cursor = db.cursor()

def collecting(base_url):

    while True:

        data = urlopen(base_url).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"lst_txt"})
        a = total_data.find_all("li")


        for each in a:
            table = each.find_all("a")
            종목 = table[0].text
            sql = """insert into 자격증(이름) values (%s)"""
            cursor.execute(sql, (종목))
            db.commit()



        break

collecting(base_url)
