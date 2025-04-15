import random as r


class Student:
    def __init__(self, name="Єфім"):
        self.name = name
        self.happy = r.randint(50, 100)
        self.progress = r.randint(1, 12)
        self.money = r.randint(50, 200)
        self.performance = True

    def study(self):
        print("📚 Час для навчання")
        self.happy -= r.randint(5, 15)
        self.progress += r.randint(1, 2)

    def chill(self):
        print("🎮 Час для відпочинку")
        self.happy += r.randint(10, 30)
        self.progress -= r.randint(1, 2)
        spent = r.randint(5, 20)
        self.money -= spent
        print(f"💸 Витрачено на відпочинок: {spent} грн")

    def sleep(self):
        print("😴 Час для сну")
        self.happy += r.randint(1, 10)

    def work(self):
        print("💼 Час для роботи")
        self.money += r.randint(30, 70)
        self.happy -= r.randint(5, 15)
        self.progress -= 1

    def is_life_ok(self):
        if self.progress < 4:
            print("📉 Проблеми з навчанням!")
        elif self.happy < 20:
            print("😢 Дуже нещасливий студент.")
        elif self.money < 20:
            print("💸 Бракує грошей!")
        elif self.progress >= 10 and self.happy >= 70 and self.money >= 100:
            print("🏆 Ідеальне життя студента!")
        else:
            print("✅ Все в нормі.")

    def everyday_status(self):
        print(f"😃 Щастя: {self.happy}")
        print(f"📘 Прогрес: {self.progress}")
        print(f"💰 Гроші: {self.money}")

    def live_day(self, day):
        print(f"\n\033[36mДень №{day}\033[0m")

        if self.money < 20:
            self.work()
        elif self.progress < 5:
            self.study()
        elif self.happy < 40:
            self.chill()
        else:
            action = r.choice([self.study, self.sleep, self.chill])
            action()

        self.everyday_status()
        self.is_life_ok()

        if self.progress <= 0 or self.happy <= 0:
            print("💀 Студент вибув")
            self.performance = False


student = Student("Єфім")
print(f"\n\033[46m🎓 Студентське життя: {student.name} \033[0m")
for day in range(1, 366):
    if not student.performance:
        break
    student.live_day(day)