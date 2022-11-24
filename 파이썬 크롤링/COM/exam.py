from bs4 import BeautifulSoup
from urllib.request import urlopen
from datetime import datetime, timedelta
import time
import pymysql
from traceback import format_exc


base_url = "http://www.saramin.co.kr/zf_user/jobs/list/job-category?page=2&cat_cd=404&search_optional_item=n&search_done=y&panel_count=y&isAjaxRequest=0&page_count=50&sort=RL&type=job-category&is_param=1&isSearchResultEmpty=0&isSectionHome=0&searchParamCount=1#searchTitle"
db = pymysql.connect("clova.cdahd1t32k88.ap-northeast-2.rds.amazonaws.com","anetfotoa","a4415588","clova", charset='utf8')
cursor = db.cursor()

def collecting(base_url):

    while True:

        data = urlopen(base_url).read()
        soup = BeautifulSoup(data, "html.parser")
        total_data = soup.find("tbody")
        print(total_data)
        a = total_data.find_all("li")

        sql2 = """delete from 국가기술자격증"""
        cursor.execute(sql2)
        db.commit()

        for each in a:
            table = each.find_all("a")
            종목 = table[0].text
            print("%s" %(종목))
            sql = """insert into 국가기술자격증(a) values (%s)"""
            cursor.execute(sql, (종목))
            db.commit()



        break
collecting(base_url)
