# class Animal:
#     def __init__(self, name, species, sound):
#         self.name = name
#         self.species = species
#         self.sound = sound
#
# class Dog(Animal):
#     def __init__(self, name, breed):
#         super().__init__(name, "Собака", "Гав")
#         self.breed = breed
#
#
# class Cat(Animal):
#     def __init__(self, name, color):
#         super().__init__(name, "Кіт", "Мяу")
#         self.color = color
#
# dog = Dog(name="Лорд", breed="Вівчарка")
# cat = Cat(name="Барсік", color="Сірий")
#
# print(dog.species, "Ім'я:", dog.name, "Порода:", dog.breed, "Звук:", dog.sound)
# print(cat.species, "Ім'я:", cat.name, "Колір:", cat.color, "Звук:", cat.sound)


class Transport:
    def __init__(self, mark, speed, engine, Vehicaltype):
        self.mark = mark
        self.speed = speed
        self.engine = engine
        self.Vehicaltype = Vehicaltype

class legkova(Transport):
    def __init__(self, mark, Vehicaltype, color):
        super().__init__(mark, "290km/h", "V8", Vehicaltype)
        self.color = color

class jeep(Transport):
    def __init__(self, mark, Vehicaltype, color):
        super().__init__(mark, "250km/h", "V12", Vehicaltype)
        self.color = color

legkova = legkova(color="black", Vehicaltype="Легкова", mark="Porsche")
jeep = jeep(Vehicaltype="Позашляховик", color="Red", mark="Jeep")
print(legkova.Vehicaltype, "Марка:", legkova.mark, "Двигун:", legkova.engine, "Колір:", legkova.color)
print(jeep.Vehicaltype, "Марка:", jeep.mark, "Двигун:", jeep.engine, "Колір:", jeep.color)



