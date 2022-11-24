from bs4 import BeautifulSoup
from selenium import webdriver

driver = webdriver.PhantomJS(executable_path='/home/ubuntu/clova/crawl/venv/local/lib/python2.7/site-packages/selenium/webdriver/phantomjs') # 브라우져를 phantomjs 을 사용함. ie, firefox, chrome 도 가능함
driver.get('https://mensaar.de/#/menu/sb')
bs = BeautifulSoup(driver.page_source, 'html5lib')
print(bs.findAll("div"))
