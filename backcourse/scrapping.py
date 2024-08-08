import os
import requests
from bs4 import BeautifulSoup
import sqlite3

url = 'https://postuplenie.by/katalog/vuzy/bgu/'

# Заголовки, чтобы замаскироваться под браузер
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
}

# Скачиваем HTML страницы при помощи requests
response = requests.get(url, headers=headers)

# Проверяем валидность полученного ответа
if response.status_code == 200:

    # Парсим HTML при помощи Beautiful Soup
    soup = BeautifulSoup(response.text, 'html.parser')

    # CSS-селектор для основных таблиц
    table = soup.find('table', {'class': 'table table-hover'})

    # Инициализируем списки данных для хранения полученной скрейпингом информации
    theads = []
    specialties = []
    studying_forms = []
    places = []
    marks = []
    budget_marks = []
    payment_marks = []
    prices = []

    connection = sqlite3.connect('db.sqlite3')
    cursor = connection.cursor()
    i = 0
    # Обходим строки в цикле, пропуская заголовок
    for row in table.find_all('tr')[1:]:

        # Извлекаем данные каждого столбца при помощи CSS-селекторов
        columns = row.find_all(['td', 'th'])
        if (len(columns) > 1):
            specialty = columns[0].text.strip()
            # specialty = [s.replace('\r\n', '') for s in specialty]

            studying_form = columns[1].text.strip()
            place = columns[2].text.strip()
            mark = columns[3].text.strip()
            price = columns[4].text.strip()

            if (mark != ''):
                parts = mark.split('/')
                parts[0] = '0' if parts[0] == '—' else parts[0]
                parts[0] = '0' if parts[0] == '-' else parts[0]
                parts[1] = '0' if parts[1] == '—' else parts[1]
                parts[1] = '0' if parts[1] == '-' else parts[1]
                budget_mark = parts[0]
                payment_mark = parts[1]
            else:
                budget_mark = '0'
                payment_mark = '0'

            cursor.execute("INSERT INTO backapp_specialties (specialties, studying_forms, places, marks, budget_marks, payment_marks, prices, faculty_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                           (specialty, studying_form, place, mark, budget_mark, payment_mark, price, i))
        else:
            thead = columns[0].text.strip()
            cursor.execute(
                "INSERT INTO backapp_faculty (theads) VALUES (?)", (thead,))
            i += 1

    connection.commit()
    connection.close()

# connection = sqlite3.connect('db.sqlite3')
# cursor = connection.cursor()

# # Предполагая, что у вас есть таблицы faculties и specialties в вашей базе данных
# for i in range(len(theads)):
#     # Вставляем данные в таблицу faculties
#     cursor.execute("INSERT INTO backapp_faculty (theads) VALUES (?)", (theads[i]))

# for i in range(len(specialties)):
#     # Вставляем данные в таблицу specialties
#     cursor.execute("INSERT INTO backapp_specialties (specialties, studying_forms, places, marks, prices, faculty_id) VALUES (?, ?, ?, ?, ?, ?)",
#                    (specialties[i], studying_forms[i], places[i], marks[i], prices[i], i+1))

# # Сохраняем изменения и закрываем соединение
# connection.commit()
# connection.close()
