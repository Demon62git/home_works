import express from 'express';
import { UserService } from '../../services/index.js';
import { Auth } from '../../services/index.js';

const router = express.Router();

/**
* Регистрация
*/  
router.post('/signup',
    async (req, res) => {
        try {
            const user = await UserService.create(req.body);
            res.status(201).json({
            data: user,
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
* аутентификация
*/  
router.post('/signin',
    // Для аутентификации используется механизм сессий и модуль Passport.js
    Auth.passport.authenticate('local', { failureMessage: true, failWithError: true }),
    (req, res) => {
        res.status(200).json({
            data: req.user,
            status: 'ok',
        })
    }
);

/**
* Выход
*/  
router.post('/logout',
    Auth.authUser,
    (req, res) => {
        req.logout(() => { })
        res.status(200).json({
            message: 'Вы вышли из сессии',
            status: 'ok',
        });
    }
);

export default router;