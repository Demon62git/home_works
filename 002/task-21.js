#!/usr/bin/env node

const yargs = require('yargs');

// Функция для обработки команды current
function handleCurrentCommand(agrv) {
  const today = new Date();
  if (agrv.date)
    console.log(`Дата в календарном месяце: ${today.getDay()}`)
  else if (agrv.month)
    console.log(`Текущий месяц: ${today.getMonth()}`)
  else if (agrv.year)
    console.log(`Текущий год: ${today.getFullYear()}`)
  else 
    console.log(`Текущая дата и время в формате ISO: ${today.toISOString()}`);
  }
  
  // Функция для обработки команды add
  function handleCalcCommand(agrv) {
    const fAdd = (a,b)=>a + b;
    const fSub = (a,b)=>a - b;
    const oper = (o, a, b)=>(o == 'add') ?  fAdd(a, b) : fSub(a, b);
    
    let today = new Date();
    let tomorrow = new Date();

if (agrv.days) 
  tomorrow.setDate(oper(agrv._[0], today.getDate(), agrv.days));
else if (agrv.months)
  tomorrow.setMonth(oper(agrv._[0], today.getMonth(), agrv.months));
else if (agrv.years)
  tomorrow.setFullYear(oper(agrv._[0], today.getFullYear(), agrv.years));

    console.log(`Получена дата: ${tomorrow.toLocaleDateString()}`);
  }
  
  // Создание аргументов командной строки
  const argv = yargs
    .command({
      command: 'current',
      describe: 'Текущая дата и время в формате ISO',
      builder: {
        year: {
          alias: 'y',
          describe: 'Текущий год',
          type: 'boolean',
          default: false
        },
        month: {
            alias: 'm',
            describe: 'Текущий месяц',
            type: 'boolean',
            default: false
          },
        date: {
          alias: 'd',
          describe: 'Дата в календарном месяце',
          type: 'boolean',
          default: false
        }
      },
      handler: (argv) => handleCurrentCommand(argv)
    })
    .command({
      command: ['add','sub'],
      describe: 'Добавить/отнять с текущей даты',
      builder: {
        days: {
          describe: 'Количество дней',
          type: 'number',
          nargs: 1
        },
        months: {
          describe: 'Количество месяцев',
          type: 'number',
          nargs: 1
        },
        years: {
          describe: 'Количество лет',
          type: 'number',
          nargs: 1
        }
      },
      handler: (argv) => handleCalcCommand(argv)
    })
    .help().alias('h', 'help')
    .version().alias('v', 'version')
    .parse();

