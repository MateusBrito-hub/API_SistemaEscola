import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IUser {
    name: string;
    user: string,
    password: string,
    confirmPassword: string
}

const bodyValidation : yup.ObjectSchema<IUser> = yup.object().shape({
    name: yup.string().required().min(3),
    user: yup.string().required().min(3),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required()
})

export const create = async (req: Request<{},{},IUser>, res: Response) => {

    let validatedData : IUser | undefined = undefined

    try {
        validatedData = await bodyValidation.validate(req.body); 
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return res.json({
            error : {
                default: yupError.message
            }
        });
    }

    console.log(validatedData);
    
    return res.send('Create!');
};
