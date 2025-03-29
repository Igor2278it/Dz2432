# class Human:
#     count = 0
#     def __init__(self, name = "Petya"):
#         self.name = name
#         Human.count += 1
# class Auto:
#     def __init__(self, brand):
#         self.brand = brand
#         self.passanger = []
#     def add_passanger(self, *pas):
#         self.passanger.append(pas)
#     def info(self):
#         if self.passanger == []:
#             for p in self.passanger:
#                 self.passanger.append(p)
#             print("Маршрутка бренду", self.brand, "Немає пасажирів")
#         else:
#             print(print("Маршрутка бренду", self.brand, "Має пасажирів"))
#             for p in self.passanger:
#                 print(p)
# ps1 = Human()
# ps2 = Human("Vasya")
# ps3 = Human("Sasha")
# car  = Auto("BMW")
# car.add_passanger(ps1)
# car.add_passanger(ps2)
# car.add_passanger(ps3)
# car.add_passanger(ps1, ps2, ps3)
# car.info()
# print("Кількість пасажирів", Human.count)


# class Human:
#     def __init__(self, name, age, heigh, national, city, weight):
#         self.name = name
#         self.age = age
#         self.national = national
#         self.heigh = heigh
#         self.city = city
#         self.weight = weight
#
#     def __str__(self):
#         return ("Вітаю! Я " + self.name + " з міста " + self.city +
#                 ". Мені " + str(self.age) + " років. Мій зріст " + str(self.heigh) +
#                 " см. Я важу " + str(self.weight) + " кг. Я " + self.national + ".")
#
# class People(Human):
#     def __init__(self, school, clas, name, age, heigh, national, city, weight):
#         super().__init__(name, age, heigh, national, city, weight)
#         self.school = school
#         self.clas = clas
#     def __str__(self):
#         return super().__str__() + " Навчаюсь у школі № " + str(self.school) + " в " + str(self.clas) + " класі."
# class Worker(Human):
#     def __init__(self, name, age, heigh, national, city, weight, profession, lvl):
#         super().__init__(name, age, heigh, national, city, weight)
#         self.profession = profession
#         self.lvl = lvl
#
#     def __str__(self):
#         return super().__str__() + " Моя професія " + self.profession + " Мій рівень навичок " + self.lvl
#
#
# woman = Human("Вікторія", age=18, heigh=168, weight=57, national= "Українка", city="Dnipro" )
# print(woman)
# p=People(name="Сашко", age=12, heigh=157, weight=43, national= "Українець", city="Dnipro", school=27, clas=7 )
# print(p)
# w = Worker(name="Володимир", age=20, heigh=178, weight=75, national="Українець", city="Kyiv", profession="програміст", lvl="Senior")
# print(w)

# class Pc:
#     def __init__(self):
#         super().__init__()
#         self.model = "Apple Iphone 16"
#         self.memory = 500
#
# class Display:
#     def __init__(self):
#         super().__init__()
#         self.resol = "4k"
# class Smart(Pc, Display):
#     def info(self):
#         print("Смартфон моделі", self.model, "Має парапетри: об'єм пам'яті", self.memory, "Розширення екрану:", self.resol)
# tel = Smart()
# tel.info()

class Device:
    def __init__(self):
        super().__init__()
        self.model = "Apple Ipad air"

class Portable(Device):
    def __init__(self):
        super().__init__()
        self.weight = "500 грамів"

class Tablet(Portable, Device):
    def info(self):
        print("Планшет моделі", self.model, "Має вагу", self.weight)

description = Tablet()
description.info()
