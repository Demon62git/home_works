import { Router } from 'express';
import { Auth } from '../../services/index.js';
import { ChatService } from '../../services/index.js';

const router = Router();

/**
* Получить историю сообщений из чата
*/  
router.get('/getHistory/:id',
    Auth.authUser,
    async (req, res) => {
        try {
            const chat = await ChatService.getHistory(req.params.id);
            res.status(200).json({
                data: chat,
                status: 'ok',
            })
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
                status: 'error',
            });
        }
    }
);

/**
* Получить чат между пользователями
*/  
router.get('/',
    Auth.authUser,
    async (req, res) => {
        try {
            const chat = await ChatService.find(req.query.users);
            res.status(200).json({
                data: chat,
                status: 'ok',
            });
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
                status: 'error',
            });
        }
    }
);

/**
* Отправить сообщение в чат
*/  
router.post('/',
    Auth.authUser,
    async (req, res) => {
        try {
            const message = await ChatService.sendMessage(req.body, req.user);
            res.status(200).json({
                data: message,
                status: 'ok',
            });
        } catch (error) {
            res.status(error.status).json({
                error: error.message,
                status: 'error',
            });
        }
    }
);

export default router;