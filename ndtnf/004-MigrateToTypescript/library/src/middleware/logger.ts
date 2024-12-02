import { Request, Response, NextFunction } from 'express'
import path from 'path';
import fs from 'fs';
import os from 'os';

const logger = (req: Request, res: Response, next: NextFunction) => {
    const data = `${new Date().toLocaleString()} - ${req.method} - ${req.url}`;
    fs.appendFile(
        path.join('src','log', 'server.log'),
        data + os.EOL,
    (error) => {
        if (error) throw error
    });
  
    next();
}

export { logger };