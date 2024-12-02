export const err404 = async (req, res) => {
    res.status(404).json({
        error: 'Страница не найдена',
        status: '404'
        });
}
  
