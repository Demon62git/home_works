import mongoose from 'mongoose';
import config from '../config/index.js';
import BookService from './book.service.js';
import UserService from './user.service.js';

const dbServices =
    { connect:
        /**
        * Подключение к БД
        *
        * @throws Ошибка соединения
        */
        async function connect(){
            try {
                await mongoose.connect(config.dbConnectionUrl);
            } catch (error) {
                console.error(error);
            }
        },

    BookService,
    UserService,
    } 

export default dbServices;