#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as fs from 'fs';
import path from 'path';

start();

function getData(){
  const argv = yargs(hideBin(process.argv)) 
    .option('fileName', { 
        alias: 'log', 
        type: 'string', 
        default: 'log', 
        description: 'Имя файла лога:' 
    })  
    .strict()
    .parse()

    const pathFile = path.join('log',`${argv.fileName}.json`);
    const fileContextString = fs.readFileSync(pathFile, 'utf8');
    const fileContextArray = fileContextString.split('\n');
    let data = [];
    fileContextArray.forEach((val)=>{
        try{
        data.push(JSON.parse(val));
        } catch {};
    })
    return data;
}

function resultCalc(data){
    
    const total = data.length;
    const win = data.filter(item => item.result == 1).length;
    const lose = total - win;
    const winPercent = total ? Math.round(win / total * 100) : 0;  

    return {
        total,
        win,
        lose,
        winPercent
    }
}

function start(){
    const data = getData();
    const res = resultCalc(data);

    console.log(`Общее количество партий: ${res.total}`);
    console.log(`Количество выигранных партий: ${res.win}`);
    console.log(`Количество проигранных партий: ${res.lose}`);
    console.log(`процентное соотношение выигранных партий: ${res.winPercent}`);
}