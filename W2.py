import random as r


class Student:
    def __init__(self, name=("Єфім")):
        self.name = name
        self.happy = r.randint(50, 100)
        self.progress = r.randint(1, 12)
        self.performance = True
    def study(self):
        print("Час для навчання")
        self.happy -= r.randint(1, 50)
        self.progress -= r.randint(1, 12)
    def chil(self):
        print("Час для відпочинку")
        self.happy += r.randint(10, 50)
        self.progress -= r.randint(1, 12)
    def sleep(self):
        print("Час для сну")
        self.happy += r.randint(1, 20)
    def islife(self):
            if 7 <= self.progress < 10:
                print("Все добре, але не максимум")
            elif 4 <= self.progress <= 6:
                print("Треба краще")
            elif self.progress < 4:
                print("💀")
            else:
                print("ідеально")
    def everyday(self):
        print("Рівень щастя: ", self.happy)
        print("Прогрес навчання: ", self.progress)
    def studylife(self, day):
        day = "\n\033[36mДень №"+str(day)+"\033[0m"
        print(day)
        res = r.randint(1, 3)
        if res == 1:
            self.study()
        elif res == 2:
            self.sleep()
        else:
            self.study()
        self.everyday()
        self.islife()

st1 = Student()
print("\n\033[46mЖиттяСтудента", st1.name, "\033[0m")
for k in range(1,8),:
    if st1.performance == False:
        break
        for k in range(1, 8),:
            if st2.performance == False:
                break
    st1.study(k)

st2 = Student("Максим")



# st1 = Student()
# print("Життя студента:", st1.name)
# print(st1.happy)
# print(st1.progress)
