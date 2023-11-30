import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';

interface IUser {
    name: string;
    user: string,
    password: string,
    confirmPassword: string
}
interface IQuery {
    filter?: string
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IUser>(yup.object().shape({
        name: yup.string().required().min(3),
        user: yup.string().required().min(3),
        password: yup.string().required().min(6),
        confirmPassword: yup.string().required()
    })),
    query: getSchema<IQuery>(yup.object().shape({
        filter: yup.string()
    }))
}));

export const create = async (req: Request<{},{},IUser>, res: Response) => {
    console.log(req.body);
    return res.send('Create!');
};
