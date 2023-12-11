import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IResponsible } from '../../database/models';
import { ResponsibleProvider } from '../../database/providers/responsibles';

interface IParamsProps {
    id?: number,
}
interface IBodyProps extends Omit<IResponsible, 'id'> {}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        name: yup.string().required().min(3),
        phone: yup.string().required().min(11),
        dateBirth: yup.date().required(),
        cpf: yup.string().required().min(11),
        rg: yup.string().required().max(14),
        gender: yup.string().required().oneOf(['male', 'famale', 'other']),
        zipcode: yup.string().required(),
        address: yup.string().required(),
        number: yup.string().required(),
        district: yup.string().required(),
        city: yup.string().required(),
        state: yup.string().required().max(2),
        observation: yup.string().required(),
        userId: yup.number().integer().required()
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

    const result = await ResponsibleProvider.updateById(req.params.id, req.body);
    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
};
