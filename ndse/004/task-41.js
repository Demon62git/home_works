#!/usr/bin/env node

import readline from "readline";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as fs from 'fs';
import path from 'path';

let gameCount = 1;
start();

// Инициализация лога
function createLogFile( ) {
const argv = yargs(hideBin(process.argv)) 
  .option('fileName', { 
    alias: 'log', 
    type: 'string', 
    default: 'log', 
    description: 'Имя файла лога:' 
  })  
  .strict()
  .parse()

  const dirPath = 'log';
  const filePath = path.join(dirPath,`${argv.fileName}.json`);

  if (!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
  };

  if (!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '', { encoding: 'utf8' });
  };

  return fs.createWriteStream(filePath, { flags: 'a' });
}

// Генерация случайного числа 1-орёл до 2-решка
function generateRandomNumber() {
  return Math.round(Math.random() + 1);
}

// Вывод ответа
function answer(guess, number, rl, stream) {
  if (guess == 3){
    stream.end(); 
    rl.close(); // Закрытие интерфейса ввода/вывода
  } else {
    const res = (guess == number)? 1 : 0;
    console.log((res==1) ? 'Угадал!' : 'Не угадал');
    const log = { date: new Date(),
                  guess: guess,
                  result: res };

    stream.write(JSON.stringify(log) + '\n'); // Добавляем текст в конец файла
    quest(stream, rl);              
  }
}

// Алгоритм диалога с пользователем
function quest(stream, rl) {
  const number = generateRandomNumber(); // Генерация загаданного числа
  console.log(`\n Раунд ${gameCount++} - Орёл или решка?`);

  rl.question(`Орёл(1), Решка(2), Выход(3): `, guess => {
    answer(guess * 1, number, rl, stream); // Вывод подсказки
  });
};

// Старт
function  start() {
  const stream = createLogFile();

  // Создание интерфейса ввода/вывода
  const rl = readline.createInterface({ 
    input: process.stdin,
    output: process.stdout
  });

  // Основной цикл программы
  quest(stream, rl);    
}