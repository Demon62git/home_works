#!/usr/bin/env node

const readline = require('readline');

// Генерация случайного числа от 0 до 100
function generateRandomNumber() {
  return Math.floor(Math.random()  *  101);
}

// Вывод ответа
function answer(guess, number) {
  if (guess === number) {
    console.log(`Отгадано число ${number}.`);
  } else if (guess > number) {
    console.log('Меньше');
    quest();
  } else {
    console.log('Больше');
    quest();
  }
}

// Алгоритм диалога с пользователем
function quest() {
    const rl = readline.createInterface({ // Создание интерфейса ввода/вывода
        input: process.stdin,
        output: process.stdout
    });

    rl.question(`Введите число: `, guess => {
      rl.close(); // Закрытие интерфейса ввода/вывода
      answer(guess * 1, number); // Вывод подсказки
    });
    };


const number = generateRandomNumber(); // Генерация загаданного числа
console.log(`Загадано число от 0 до 100.`);

// Основной цикл программы
quest();
