import mongoose from 'mongoose';
import config from '../config/index.js';

/**
* Подключение к БД
*
* @throws Ошибка соединения
*/
export async function connect(){
    try {
        await mongoose.connect(config.dbConnectionUrl);
    } catch (error) {
        console.error(error);
    }
};