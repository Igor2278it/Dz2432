import requests as r
from bs4 import BeautifulSoup as bs


class CoinmarketCap:
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
        crypto = []
        cryptotab = self.soup.find('tbody')

        if not cryptotab:
            print("Не вдалося знайти необхідну інформацію")
            return crypto

        info = cryptotab.find_all('tr')
        for coin in info[0:5]:
            nameTab = coin.find("span", class_="sc-65e7f566-0 iPbTJf coin-item-name")
            name = nameTab.text if nameTab else "Назва відсутня"

            priceTab = coin.find("div", class_="sc-142c02c-0 lmjbLF")
            price = priceTab.text if priceTab else "Ціна відсутня"

            crypto.append({
                "Назва": name,
                "Ціна": price,
            })

        return crypto

    def showinfo(self, txt):

        print("№\t", "Назва", "\t" * 3, "Ціна")
        print("-" * 80)
        num = 1
        for i in txt:
            print(num, i["Назва"], i["Ціна"] + "$")
            num += 1


obj = CoinmarketCap("https://coinmarketcap.com/")
obj.auditsite()
txt = obj.getinfo()
obj.showinfo(txt) if txt else print("Жодної інформації не знайдено")
