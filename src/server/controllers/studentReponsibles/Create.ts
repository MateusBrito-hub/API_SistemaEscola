import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IStudentResponsible } from '../../database/models';
import { StudentResponsibleProvider } from '../../database/providers/studentResponsible';

interface IBodyProps extends Omit<IStudentResponsible, 'id'> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        studentId: yup.number().integer().required(),
        responsibleId: yup.number().integer().required(),
        kinship: yup.string().required(),
        type: yup.string().required()
    }))
}));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const result = await StudentResponsibleProvider.create(req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
