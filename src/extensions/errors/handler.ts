import GeneralError from './GeneralError';
import { Request, Response, NextFunction } from "express";

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
    const returnValue = {
        status: 500,
        message: 'Internal server error',
    };
    if (err instanceof GeneralError) {
        returnValue.status = err.getStatus();
        returnValue.message = err.message;
    }
    res.status(returnValue.status).send({ error: returnValue.message });
};