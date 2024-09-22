import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GeneralMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) { // added this to control req 
    // console.log('Incoming Request:', req.method, req.originalUrl);
    // console.log('Headers:', req.headers);
    // console.log('Body:', req.body);
    next();
  }
}
