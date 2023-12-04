import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IUser {
    name: string;
    user: string,
    password: string
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IUser>(yup.object().shape({
        name: yup.string().required().min(3),
        user: yup.string().required().min(3),
        password: yup.string().required().min(6)
    }))
}));

export const create = async (req: Request<{},{},IUser>, res: Response) => {
    return res.status(StatusCodes.CREATED).json(1);
};
