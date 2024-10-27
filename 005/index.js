#!/usr/bin/env node

import {DEFAULT_CITY} from './config.js'
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import http from 'http';

function init(){
    const argv = yargs(hideBin(process.argv))
        .option('city', {
            alias: 'c',
            type: 'string',
            default: DEFAULT_CITY,
            description: 'Город'
        })
    .strict()
    .parse()

    const apiKey = process.env.API_KEY;
    const city = argv.city;
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
    return url;
}

http.get(init(), (res) => {
    const {statusCode} = res;
    if (statusCode !== 200){
        console.log(`statusCode: ${statusCode}`)
        return
    }
    res.setEncoding('utf8');
    let rowData  = '';
    res.on('data', (chunk) => rowData  += chunk);
    res.on('end', () => {
        let parsedData = JSON.parse(rowData );
        console.log(parsedData);
    })
}).on('error', (err) => {
    console.error(err)
})