from bs4 import BeautifulSoup
from urllib.request import urlopen
from datetime import datetime, timedelta
import time
import pymysql
from traceback import format_exc


base_url = "http://license.korcham.net/kor/license/schedule.jsp?cd=0103&mm=21"
base_url1 = "http://license.korcham.net/kor/license/guide.jsp?cd=0103&mm=21"
db = pymysql.connect("clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com","anetfotoa","a4415588","clova", charset='utf8')
cursor = db.cursor()

def collecting(base_url):

    while True:

        data = urlopen(base_url).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("tbody")
        a = total_data.find_all("tr")




        for each in a:
            table = each.find_all("td")
            종목 = table[0].text
            회별 = table[1].text
            구분 = table[2].text
            등급 = table[3].text
            인터넷접수 = table[4].text
            시험일자 = table[5].text
            발표일자 = table[6].text
            sql = """insert into 자격증(이름, 회별, 구분, 등급, 인터넷접수, 시험일자, 발표일자) values (%s, %s, %s, %s, %s, %s, %s)"""
            cursor.execute(sql, (종목, 회별, 구분, 등급, 인터넷접수, 시험일자, 발표일자))
            db.commit()

        break

collecting(base_url)

def collecting(base_url1):

    while True:



        data = urlopen(base_url1).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("tbody")
        합격과가격 = soup.find_all("div", {"class":"txt_list_01_area"})
        합격 = 합격과가격[0]
        필기실기 = 합격.find_all("li")
        필기 = 필기실기[0].text
        실기 = 필기실기[1].text
        가격 = 합격과가격[1]
        필실가격 = 가격.find("li").text
        시간 = soup.find("div", {"class":"txt_list_01_area mg0"})
        필기시간 = 시간.find_all("li")
        입실시간 = 필기시간[0].text
        시작시간 = 필기시간[1].text


        a = total_data.find("tr")
        b = total_data.find("tr", {"class": "odd"})
        c = total_data.find_all("tr")
        e = c[2]
        d = total_data.find("tr", {"class": "bg02"})

        table = a.find_all("td")
        종목 = table[0].text
        회별 = table[1].text
        구분 = table[2].text
        등급 = table[3].text
        인터넷접수 = table[4].text
        table1 = b.find_all("td")
        종목1 = table1[0].text
        회별1 = table1[1].text
        구분1 = table1[2].text
        등급1 = table1[3].text
        table2 = e.find_all("td")
        종목2 = table2[0].text
        회별2 = table2[1].text
        구분2 = table2[2].text
        등급2 = table2[3].text
        인터넷접수2 = table2[4].text
        table3 = d.find_all("td")
        종목3 = table3[0].text
        회별3 = table3[1].text
        구분3 = table3[2].text
        등급3 = table3[3].text
        sql = """insert into 자격증(이름, 시험등급, 시험방법, 시험과목, 출제형태, 시험시간, 필기, 실기, 필실가격, 입실시간, 시작시간) values ('컴퓨터활용능력', %s, %s, %s, %s, %s, %s, %s, %s, %s ,%s)"""
        cursor.execute(sql, (종목, 회별, 구분, 등급, 인터넷접수, 필기, 실기, 필실가격, 입실시간, 시작시간))
        cursor.execute(sql, (종목, 종목1, 회별1, 구분1, 등급1, 필기, 실기, 필실가격, 입실시간, 시작시간))
        cursor.execute(sql, (종목2, 회별2, 구분2, 등급2, 인터넷접수2, 필기, 실기, 필실가격, 입실시간, 시작시간))
        cursor.execute(sql, (종목2, 종목3, 회별3, 구분3, 등급3, 필기, 실기, 필실가격, 입실시간, 시작시간))
        db.commit()



        break

collecting(base_url1)
