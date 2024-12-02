import { EventEmitter } from 'events';
import { ChatModel } from '../model/index.js';
import { ErrorHttp } from '../services/index.js';

class ChatService {

constructor() {
    // Оповещения реализованы через механизм EventEmitter
    this.emmitter = new EventEmitter();
}

/**
* Получить чат между пользователями
*/  
async find(users) {
    try {
        const chat = await ChatModel
            .findOne({ users: { $all: users } })
            .populate('users', { name: 1 })
            .populate('messages')
            .lean();
        return chat;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
* Отправить сообщение
*/  
async sendMessage({ author, receiver, text }) {
    try {
        // поиск чата между author и receiver
        let chat = await ChatModel.findOne({ users: { $all: [author, receiver] } });
        if (!chat) {
            // Если чата нет, то создать его
            chat = new ChatModel({ users: [author, receiver] });
        }

        // добавление нового сообщения
        chat.messages.push({
            author,
            // текущая дата в поле sentAt добавляется по умолчанию (описано в схеме)
            text
        });

        await chat.save();
        const message = chat.messages.at(-1);
        this.emmitter.emit('sendMessage', chat._id, message);
        return message;
    } catch (error) {
        throw new ErrorHttp(error.status || 500, `Ошибка отправки: ${error.message}`);
    }
}

/**
* Подписаться на новые сообщения в чате
*/   
subscribe(callback) {
    this.emmitter.on('sendMessage', callback);
}

/**
* Получить историю сообщений чата
*/   
async getHistory(id) {
    try {
        const chat = await ChatModel
            .findById(id)
            .populate('messages')
            .lean();
        return chat.messages;
    } catch (error) {
        throw new ErrorHttp(error.status || 500, `Ошибка получения истории сообщений: ${error.message}`);
    }
}
}

export default new ChatService();