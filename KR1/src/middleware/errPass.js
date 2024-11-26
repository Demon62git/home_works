export const errPass = async (err, req, res, next) => {
    // ошибки аутентификации 
    if (err.name === 'AuthenticationError') {
        const error = req.session.messages.join('');
        req.session.messages = [];
        res.status(400).json({
            error,
            status: 'error',
        });
    } else {
        const message = err.message + ' ' + err.stack;
        res.status(500).json({ error: message });
    }
}
