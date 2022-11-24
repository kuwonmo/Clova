from bs4 import BeautifulSoup
from urllib.request import urlopen
from datetime import datetime, timedelta
import time
import pymysql
from traceback import format_exc


base_url1 = "https://www.welcomekakao.com/job?page=1"
base_url2 = "https://www.welcomekakao.com/job?page=2"
base_url3 = "https://www.welcomekakao.com/job?page=3"
base_url4 = "https://www.welcomekakao.com/job?page=4"
base_url5 = "https://www.welcomekakao.com/job?page=5"
base_url6 = "https://www.welcomekakao.com/job?page=6"
base_url7 = "https://www.welcomekakao.com/job?page=7"
base_url8 = "https://www.welcomekakao.com/job?page=8"
base_url9 = "https://www.welcomekakao.com/job?page=9"

db = pymysql.connect("clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com","anetfotoa","a4415588","clova", charset='utf8')
cursor = db.cursor()
sql2 = """delete from 채용공고"""
cursor.execute(sql2)
db.commit()
def collecting(base_url1):

    while True:

        data = urlopen(base_url1).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url1)

def collecting(base_url2):

    while True:

        data = urlopen(base_url2).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url2)

def collecting(base_url3):

    while True:

        data = urlopen(base_url3).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url3)

def collecting(base_url4):

    while True:

        data = urlopen(base_url4).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url4)

def collecting(base_url5):

    while True:

        data = urlopen(base_url5).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url5)

def collecting(base_url6):

    while True:

        data = urlopen(base_url6).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                if '이팝콘' in 회사이름:
                    주소 = "없음"
                else:
                    주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url6)

def collecting(base_url7):

    while True:

        data = urlopen(base_url7).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url7)

def collecting(base_url8):

    while True:

        data = urlopen(base_url8).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url8)

def collecting(base_url9):

    while True:

        data = urlopen(base_url9).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("ul", {"class":"list-positions"})
        a = total_data.find_all("div", {"class":"item-body"})

        for each in a:
            공고 = each.find("h4").text
            회사이름 = each.find("h5").text
            table2 = each.find_all("ul", {"class":"company-info"})
            for each2 in table2:
                table = each2.find_all("li")
                경력 = table[0].text
                주소 = table[1].text
            요구코딩 = each.find("ul", {"class":"list-position-tags"}).text
            sql = """insert into 채용공고(공고, 회사이름, 경력, 주소, 요구코딩) values (%s, %s, %s, %s, %s)"""
            cursor.execute(sql, (공고, 회사이름, 경력, 주소, 요구코딩))
            db.commit()



        break

collecting(base_url9)
