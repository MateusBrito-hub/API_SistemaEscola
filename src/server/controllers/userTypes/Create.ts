import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUserTypes } from '../../database/models';
import { UserTypesProvider } from '../../database/providers/userTypes';

interface IBodyProps extends Omit<IUserTypes, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3)
    }))
}));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const result = await UserTypesProvider.create(req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(1);
};
