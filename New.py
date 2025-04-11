# class Animal:
#     def sound(self):
#         pass
#
# class Cat(Animal):
#     def sound(self):
#         return "meow"
#
# class Dog(Animal):
#     def sound(self):
#         return "woof-woof"
#
# class bird(Animal):
#     def sound(self):
#         return "chirp-chirp"
# def speak(animal):
#  print(animal.sound())
# a1 = Cat()
# a2 = Dog()
# a3 = bird()
# speak(a1)
# speak(a2)
# speak(a3)

# class Pay:
#     def system(self):
#         pass
# class Cash_Pay:
#     def system(self, money):
#         return "Оплата"+money+"була здійснена через готівку"
#
# class Credit_Pay:
#     def system(self, money):
#         return "Оплата"+money+"була здійснена через кредитну картку"
#
# class Online_Pay:
#     def system(self, money):
#         return "Оплата"+money+"була здійснена через онлайн систему"
#
# pay_list = [Cash_Pay(), Credit_Pay(), Online_Pay()]
#
# for k in pay_list:
#     print(k.system("1000"))


# class Dog:
#     def __init__(self, name):
#         self.name = name
#
# dog1 = Dog("burks")
# print(dog1.name)


# class Dog:
#     def __init__(self, name):
#         self.__age = 1
#     def infoage(self):
#         return self.__age
# dog = Dog("burks")
# print(dog.infoage())


# class Dog:
#     def __init__(self, name):
#         self._breed = "Labrador"
# class Puppy(Dog):
#     def info(self):
#         return "Це цуцення породи:"+self._breed
# dog1 = Puppy("burks")
# print(dog1.info())


# class Person:
#     def __init__(self, name, age, salary):
#         self.name = name
#         self._age = age
#         self.__salary = salary
#     def info(self):
#         print("Вітаю Мене звати", self.name)
#         self._infoage()
#         self.__infoselary()
#     def _infoage(self):
#         print("Мій вік:", self._age)
#
#     def __infoselary(self):
#         print("Моя зарплатня", self.__salary)
#
# class Employee(Person):
#     def __init__(self, name, age, salary, position):
#         super().__init__(name, age, salary)
#         self.position = position
#     def infoEmp(self):
#         print(self.name, "Займає посаду", self.position)
#         self._infoage()
#         #self.__infoselary()
#         print("Вік", self._age)
#        # print("Заробітна плата", self.__salary)
#
# p1 = Person(name="Олександр", age=25, salary=60000)
# e1 = Employee(name="Олена", age =27, salary= 45000, position="Архітектор" )
# print(p1.name)
# p1.info()
# print(e1.name)
# e1.infoEmp()
# print(e1._Person__salary)

# import random as r
# class Character:
#     def __init__(self, name, health):
#         self.__name = name
#         self.__health = health
#
#     def take_damage(self, amount):
#         return self.__health - amount
#
#     def attack(self, num):
#         pass
#     def get_info(self):
#         return self.__health
#     def isalive(self):
#         return self.__health > 0
#
# class Warrior(Character):
#     def __init__(self, name, health=r.randint(75, 100)):
#         super().__init__(name, health)
#     def attack(self, num):
#         return "Атака мечем"
#     def attack(self, num):
#         print("Атака мечем!", self.get_info())
#         num.take_damage = r.randint(1, 20)
# class Mage(Character):
#     def __init__(self, name, health=r.randint(50, 75)):
#         super().__init__(name, health)
#     def attack(self, num):
#         return "Атака магією"
#     def attack(self, num):
#         print("Атака магією!", self.get_info())
#         num.take_damage = r.randint(15, 35)

import requests as r
from bs4 import BeautifulSoup as bs

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






