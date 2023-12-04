import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';

interface IParamsProps {
    id?: number,
}
interface IUser {
    name: string;
    user: string,
    password: string,
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IUser>(yup.object().shape({
        name: yup.string().required().min(3),
        user: yup.string().required().min(3),
        password: yup.string().required().min(6)
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));

export const updateById = async (req: Request<IParamsProps>, res: Response) => {
    if(Number(req.params.id) === 9999999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
            default: 'Registro não encontrado'
        }
    });
    return res.status(StatusCodes.NO_CONTENT).send();
};
