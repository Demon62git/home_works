import { Request, Response, NextFunction } from 'express'

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/view/user/login');
    }
}
export { userAuth };