import random as r

class Character:
    def __init__(self, name, health):
        self.__name = name
        self.__health = max(0, health)

    def take_damage(self, amount):
        self.__health = max(0, self.__health - amount)
        print(self.__name, "отримав", amount, "шкоди", "Поточне здоров;я:", self.__health)

    def attack(self, target):
        pass

    def get_info(self):
        return self.__name,  "Здоров’я:", self.__health

    def is_alive(self):
        return self.__health > 0

class Warrior(Character):
    def __init__(self, name, health=r.randint(75, 100)):
        super().__init__(name, health)

    def attack(self, target):
        print(self.get_info(), "атакує мечем!")

class Mage(Character):
    def __init__(self, name, health=r.randint(50, 75)):
        super().__init__(name, health)

    def attack(self, target):
        print(self.get_info(), "атакує магією!")
