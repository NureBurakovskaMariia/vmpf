# 2.	Запитайте користувача про його ім'я та виведіть привітання з використанням введеної назви.
from unittest import result

name = input("Enter your name: ")
print(f"Hello {name}!")
print()

# 2.	Створіть список чисел від 1 до 20. Виведіть на екран кожне число та його квадрат.

num = 1
list_num = []
while num <= 20:
    list_num.append(num)
    num += 1

for num in list_num:
    print(num, num*num)
    print()

# 2.	Створіть функцію, яка приймає список чисел та повертає новий список, який містить лише парні числа.

def even (num_list):
    result = []
    for num in num_list:
        if num % 2 == 0:
            result.append(num)
    return result

print(even(list_num))
print()

# 2.	Реалізуйте програму для роботи з API. Використовуйте бібліотеку requests, щоб отримати дані з публічного API та вивести їх на екран.

import requests

def get_api_data():
    url = "https://jsonplaceholder.typicode.com/todos/1"

    try:
        response = requests.get(url)

        response.raise_for_status()

        data = response.json()

        print("Отримані дані з API:")
        print(f"ID користувача: {data['userId']}")
        print(f"Заголовок: {data['title']}")
        print(f"Статус виконання: {'Виконано' if data['completed'] else 'В процесі'}")

    except requests.exceptions.HTTPError as http_err:
        print(f"Виникла помилка HTTP: {http_err}")
    except Exception as err:
        print(f"Сталася помилка: {err}")

if __name__ == "__main__":
    get_api_data()