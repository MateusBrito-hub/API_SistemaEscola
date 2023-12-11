import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IStudentResponsible } from '../../database/models';
import { StudentResponsibleProvider } from '../../database/providers/studentResponsible';

interface IParamsProps {
    id?: number,
}
interface IBodyProps extends Omit<IStudentResponsible, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        studentId: yup.number().integer().required(),
        responsibleId: yup.number().integer().required(),
        kinship: yup.string().required(),
        type: yup.string().required()
    })),
    params: getSchema<IParamsProps>(yup.object().shape({
        id: yup.number().integer().required().min(1)
    }))
}));

export const updateById = async (req: Request<IParamsProps,{},IBodyProps>, res: Response) => {
    if(!req.params.id) return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
            default: 'O parâmetro "id" precisa ser informado'
        }
    });

    const result = await StudentResponsibleProvider.updateById(req.params.id, req.body);
    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
