import express from 'express';

const router = express.Router();

// Главная страница
router.get('/', async (req, res) => {
    res.render('index', {
        title: 'Главная',
        user: req.user,
    });
});

export default router;