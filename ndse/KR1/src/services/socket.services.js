import { Server } from 'socket.io';
import { ChatService } from './index.js';
import { sessionMiddleware } from '../middleware/index.js';

const useSocket = (httpServer) => {
    const io = new Server(httpServer);

    io.use((socket, next) => {
        sessionMiddleware(socket.request, {}, next);
    });

    // Подключение
    io.on('connection', (socket) => {
        if (!socket.request.session.passport) {
            return
        }

    const userId = socket.request.session.passport.user._id;
    console.log(`Подключен пользователь: ${socket.id}, user: ${userId}`);
    socket.join(userId);

    // Подписка на чат
    ChatService.subscribe(async (chatId, message) => {
        console.log(`Новое сообщение ${chatId}: ${message}`);
    });

    // Отправка сообщения
    socket.on('sendMessage', async ({ receiver, text }) => {
        try {
            const author = socket.request.session.passport.user._id;
            const message = await ChatService.sendMessage({
                author,
                receiver,
                text
            });

            socket.to(receiver).emit('newMessage', message);
            socket.emit('newMessage', message);
        } catch (error) {
            console.log(error);
            socket.emit('error', { message: `Ошибка отправки сообщения: ${error.message}` });
        }
    });

    // Запрос истории чата
    socket.on('getHistory', async ({ receiver }) => {
        try {
            const userId = socket.request.session.passport.user._id;
            const chat = await ChatService.find([userId, receiver]);
            const messages = await ChatService.getHistory(chat._id);
            socket.emit('chatHistory', messages);
        } catch (error) {
            console.log(error);
            socket.emit('error', { message: `Ошибка загрузки истории: ${error.message}` })
        }
    });
    });
}

export default useSocket;