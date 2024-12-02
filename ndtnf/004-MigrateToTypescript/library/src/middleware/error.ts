import { Request, Response } from 'express'

export const err404 = (req: Request, res: Response) => {
    res.status(404);
    res.json('404 | страница не найдена');
}

export class HttpException extends Error {
    status: number
    constructor(message: string, status = 500) {
        super(message)
        this.status = status
    }
}