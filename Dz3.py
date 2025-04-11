class Books:
    def __init__(self, url):
        self.url = url
        self.header = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}
        self.soup = None

    def auditsite(self):
        response = r.get(self.url, headers=self.header)
        if response.status_code == 200:
            self.soup = bs(response.text, 'html.parser')
        else:
            print(f"Error: {response.status_code}")
            return

    def getinfo(self):
        tablet = []
        books = self.soup.find_all('article', class_="product_pod")

        if not books:
            print("Не вдалося знайти необхідну інформацію")
            return

        for i in books[:4]:
            name_tag = i.find("h3").find("a")
            price_tag = i.find("p", class_="price_color")

            name = name_tag["title"].strip() if name_tag else "Назва відсутня"
            price = price_tag.text.strip() if price_tag else "Ціна відсутня"

            tablet.append({
                "Назва": name,
                "Ціна": price,
            })

        return tablet

    def showinfo(self, txt):
        print("№\t", "Назва", "\t"*3, "Ціна")
        print("-"*80)
        num = 1
        for i in txt:
            print(f"{num}\t{i['Назва']}\t{i['Ціна']}")
            num += 1

obj = Books("http://books.toscrape.com/")
obj.auditsite()
txt = obj.getinfo()
obj.showinfo(txt) if txt else print("Жодної інформації не знайдено")











import requests as r
from bs4 import BeautifulSoup as bs

class News:
    def __init__(self, url):
        self.url = url
        self.header = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}
        self.soup = None

    def auditsite(self):
        response = r.get(self.url, headers=self.header)
        if response.status_code == 200:
            self.soup = bs(response.text, 'html.parser')
        else:
            print(f"Error: {response.status_code}")
            return

    def getinfo(self):
        tablet = []
        tablettag = self.soup.find_all('div', class_="sc-41044fee-1 eIoIcv")

        if not tablettag:
            print("Не вдалося знайти необхідну інформацію")
            return

        for i in tablettag[:4]:
            name_tag = i.find("div", class_="sc-87075214-0 jvGDZA")
            price_tag = i.find("p", class_="sc-530fb3d6-0 gJqLcg")

            name = name_tag.text.strip() if name_tag else "Назва відсутня"
            price = price_tag.text.strip() if price_tag else "Текст відсутень"

            tablet.append({
                "Назва": name,
                "Текст": price,
            })

        return tablet

    def showinfo(self, txt):
        print("№\t", "Назва", "\t"*3, "Текст")
        print("-"*80)
        num = 1
        for i in txt:
            print(f"{num}\t{i['Назва']}\t{i['Текст']}")
            num += 1

obj = News("https://www.bbc.com/news")
obj.auditsite()
txt = obj.getinfo()
obj.showinfo(txt) if txt else print("Жодної інформації не знайдено")
