import { Router } from 'express';
import * as middleware from '../../middleware/index.js';
import { Auth } from '../../services/index.js';
import { AdvertisementService } from '../../services/index.js';

const router = Router();

/**
* получить список объявлений (аутентификация не требуется)
*/  
router.get('/', async (req, res) => {
    try {
        const data = await AdvertisementService.find(req.query);
        res.status(200).json({
            data: data,
            status: 'ok',
        });
    } catch (error) {
        res.status(error.status).json({
            error: error.message,
            status: 'error',
        });
    }
});

/**
* получить данные конкретного объявления (аутентификация не требуется)
*/  
router.get('/:id', async (req, res) => {
    try {
        const data = await AdvertisementService.get(req.params.id);
        res.status(200).json({
            data: data,
            status: 'ok',
        });
    } catch (error) {
        res.status(error.status).json({
            error: error.message,
            status: 'error',
        });
    }
});

/**
* создать объявление (требуется аутентификация )
*/ 
router.post('/',
    Auth.authUser,
    // обработка загруженных файлов производится с помощью библиотеки multer
    middleware.multer.array('images'),
    async (req, res) => {
        try {
            const data = await AdvertisementService.create(req);
            res.status(201).json({
                data: data,
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
* удалить объявление (требуется аутентификация )
*/ 
router.delete('/:id',
    Auth.authUser,
    async (req, res) => {
        try {
            await AdvertisementService.remove(req.params.id, req.user);
            res.status(200).json({
                message: `Объявление ${req.params.id} удалено`,
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