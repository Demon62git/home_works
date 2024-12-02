const err404 = (req, res) => {
    res.status(404);
    res.json('404 | страница не найдена');
}

export default err404;