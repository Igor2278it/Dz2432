# class Product:
#     def __init__(self, name, price, availability):
#         self.name = name
#         self.price = price
#         self.availability = availability
#
#     def __str__(self):
#         return f"{self.name} - {self.price}$ (Доступно: {self.availability})"
#
#
# class Cart:
#     def __init__(self):
#         self.items = []
#
#     def add_item(self, product, quantity=1):
#
#         if product.availability >= quantity:
#             self.items.append({"product": product, "quantity": quantity})
#             product.availability -= quantity
#             print(f"Додано: {quantity} x {product.name}")
#         else:
#             print(f"Недостатньо товару: {product.name}. Доступно: {product.availability}")
#
#     def remove_item(self, product_name, quantity=1):
#
#         for item in self.items:
#             if item["product"].name == product_name:
#                 if item["quantity"] > quantity:
#                     item["quantity"] -= quantity
#                     item["product"].availability += quantity  # Повертаємо до залишку
#                     print(f"Видалено: {quantity} x {product_name}")
#                 elif item["quantity"] == quantity:
#                     self.items.remove(item)
#                     item["product"].availability += quantity
#                     print(f"Видалено: {quantity} x {product_name} повністю з кошика")
#                 else:
#                     print(f"В кошику немає такої кількості товару: {product_name}")
#                 return
#         print(f"Товар: {product_name} не знайдено в кошику")
#
#     def calculate_total(self):
#
#         total = sum(item["product"].price * item["quantity"] for item in self.items)
#         return total



op = int(input(
    "Виберіть яку операцію хочете здійснити: \n1 - Поповнення рахунку\n2 - Зняття коштів\n3 - Переказ між рахунками\n"))
first = 1
second = 2
third = 3
class Bankaccount:
    def __init__(self, name='Григорій', balance=500, id = 111):
        self.name = name
        self.balance = balance
        self.id = id

class Bank:
    def __init__(self, add=(), withdrawal=() ):
        self.accounts = []
        self.add=add
        self.withdrawal=withdrawal

if op == 1:
        suma = int(input("Введіть суму поповнення балансу"))
        bank = Bankaccount(balance=500 + suma)
        print("Операція успішна, ви поповнили ", suma, "На рахунку:", bank)

elif op == 2:
    withdrawal = int(input("Введіть суму зняття грошей"))
    bank = Bankaccount(balance=500 - withdrawal)
    print("Операція успішна, ви зняли", withdrawal, "На рахунку:", bank)


elif op == 3:
    id = int(input("Введіть id рахунку на який ви хочете перевести гроші"))
    perekaz = int(input("Введіть суму переказу"))
    bank = Bankaccount(balance=500 - perekaz, id=id)
    print("Операція успішна, переказ на id", id, "на сумму", perekaz, "На рахунку:", bank)







