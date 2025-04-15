class Car:
    def __init__(self, mark, model, year):
        self.mark = mark
        self.model = model
        self.year = year

    def get_info(self):
        return self.year, self.mark, self.model

#
car = Car("BMW", "bmw z4 gt3", 2023)
print(car.get_info())




class Employee:
    def __init__(self, name, position, salary):
        self.name = name
        self.position = position
        self.salary = salary

    def get_info(self):
        return "Заробітна плата", self.name, self.salary

employee = Employee("Олена", "Менеджер", 45000)
print(employee.get_info())