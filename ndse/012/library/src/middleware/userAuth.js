const userAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/view/user/login');
    }
}
export default userAuth;