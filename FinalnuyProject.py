import requests
from bs4 import BeautifulSoup


class Minfin:
    def __init__(self, url):
        self.url = url
        response = requests.get(url)
        self.soup = BeautifulSoup(response.text, 'html.parser')

    def auditisite(self):
        pass

    def getInfo(self):
        value = []
        valuteTag = self.soup.find_all('tr', class_='sc-1x32wa2-4 dKDsVV')[1:6]
        if not valuteTag:
            print('Не вдалося знайти необхідну інформацію')
            return value

        for i in valuteTag:
            nameValute = i.find('a', class_='sc-1x32wa2-7 ciClTw')
            name = nameValute.text.strip() if nameValute else 'Назва валюти відсутня'
            Valutee = i.find_all('td')

            buy = 'Курс купівлі відсутній'
            sell = 'Курс продажу відсутній'

            if len(Valutee) > 2:
                buyValute = Valutee[1]
                buy = buyValute.text.strip() if buyValute else 'Курс купівлі відсутній'
                sellValute = Valutee[2]
                sell = sellValute.text.strip() if sellValute else 'Курс продажу відсутній'

            value.append({
                'Назва': name,
                'Купівля': buy,
                'Продаж': sell
            })

        return value

    def showinfo(self, txt):
        print(f"{'№':<3} {'Назва':<10} {'Купівля':<15} {'Продаж':<15}")
        print("-" * 50)
        num = 1
        for i in txt:
            print(f"{num:<3} {i['Назва']:<10} {i['Купівля']:<15} {i['Продаж']:<15}")
            num += 1


obj = Minfin("https://minfin.com.ua/ua/currency/")
obj.auditisite()
txt = obj.getInfo()
obj.showinfo(txt) if txt else print("Жодної інформації не знайдено")

us = int(input("Виберіть дію (1 - Купити валюту, 2 - Продати валюту): "))

def clean_rate(rate_str):
    rate_str = rate_str.split(' ')[0]
    if ',' in rate_str:
        rate_str = rate_str.replace(',', '.')
    return rate_str
if us == 1:
    valuta = int(input("Виберіть валюту (1 - USD, 2 - EUR, 3 - PLN, 4 - GBP, 5 - CHF): "))
    suma = int(input("Введіть суму: "))

    if valuta == 1:
        buy_rate = float(txt[0]['Купівля'].replace(',', '.'))
        result = suma / buy_rate
        print(f"За {suma} гривень ви купите {result:.2f} USD за курсом купівлі.")

    elif valuta == 2:
        buy_rate = float(txt[1]['Купівля'].replace(',', '.'))
        result = suma / buy_rate
        print(f"За {suma} гривень ви купите {result:.2f} EUR за курсом купівлі.")

    elif valuta == 3:
        buy_rate = float(txt[2]['Купівля'].replace(',', '.'))
        result = suma / buy_rate
        print(f"За {suma} гривень ви купите {result:.2f} PLN за курсом купівлі.")

    elif valuta == 4:
        buy_rate = float(txt[3]['Купівля'].replace(',', '.'))
        result = suma / buy_rate
        print(f"За {suma} гривень ви купите {result:.2f} GBP за курсом купівлі.")

    elif valuta == 5:
        buy_rate = float(txt[4]['Купівля'].replace(',', '.'))
        result = suma / buy_rate
        print(f"За {suma} гривень ви купите {result:.2f} CHF за курсом купівлі.")

elif us == 2:
    valuta = int(input("Виберіть валюту для продажу (1 - USD, 2 - EUR, 3 - PLN, 4 - GBP, 5 - CHF): "))
    suma = int(input("Введіть суму: "))

    if valuta == 1:
        sell_rate = float(txt[0]['Продаж'].replace(',', '.'))
        result = suma * sell_rate
        print(f"За {suma} USD ви отримаєте {result:.2f} гривень за курсом продажу.")

    elif valuta == 2:
        sell_rate = float(txt[1]['Продаж'].replace(',', '.'))
        result = suma * sell_rate
        print(f"За {suma} EUR ви отримаєте {result:.2f} гривень за курсом продажу.")

    elif valuta == 3:
        sell_rate = float(txt[2]['Продаж'].replace(',', '.'))
        result = suma * sell_rate
        print(f"За {suma} PLN ви отримаєте {result:.2f} гривень за курсом продажу.")

    elif valuta == 4:
        sell_rate = float(txt[3]['Продаж'].replace(',', '.'))
        result = suma * sell_rate
        print(f"За {suma} GBP ви отримаєте {result:.2f} гривень за курсом продажу.")

    elif valuta == 5:
        sell_rate = float(txt[4]['Продаж'].replace(',', '.'))
        result = suma * sell_rate
        print(f"За {suma} CHF ви отримаєте {result:.2f} гривень за курсом продажу.")


