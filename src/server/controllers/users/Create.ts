import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';

interface IBodyProps extends Omit<IUser, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
        user: yup.string().required().min(3),
        email: yup.string().required().email(),
        password: yup.string().required().min(6),
        userTypeId: yup.number().integer().required().min(1)
    }))
}));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const result = await UsersProvider.create(req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
