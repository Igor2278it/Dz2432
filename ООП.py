# class Car:
#     #speed = 110
#     #model = "BMW"
#     def __init__(self, speed, model):
#         self.speed = speed
#         self.m=model
#         Car.count += 1
#
#
# def info(self):
#     print("Швидкість авто", self.speed)
#     print("Модель Авто", self.model)
# auto = Car(speed=125, model='Audi')
# auto.info()
# speed = int(input(">"))
# model = int(input(">"))
# auto2 = Car(speed, model)
# auto2.info()
# print(auto2.count)
# auto3 = Car(speed=225, model='Volkswagen golf gti')
# auto3.info()
# print(Car.count)
# auto2=Car()
#print("Швидкість авто", auto.speed)

#print("Модель Авто", auto2.model)

class Zm:
    def __init__(self, id=111, name="Максим", heigh="170"):
        self.id = id
        self.name = name
        self.heigh=heigh
    def __str__(self):
        print("Інформація учасника:")
        print("Номер:", str(self.id), "Ім'я:", str(self.name), "Зріст:", str(self.heigh))
    def __bool__(self):

       return self.id!=None
p1 =Zm()
#print(p1.name)
p2=Zm(id=112, name="Поліна", heigh=170)
#print(p2.heigh)
p1.__str__()
#print(str(p2))
print(bool(p1))
print(p2.__bool__())