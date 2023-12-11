import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';
import { passwordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name' | 'userTypeId'> {}

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email().min(5),
        password: yup.string().required().min(6),
    }))
}));

export const signIn = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const {email, password} = req.body;

    const result = await UsersProvider.getByEmail(email);
    if (result instanceof Error){
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou Senha são invalidos'
            }
        });
    }

    const passwordMatch = await passwordCrypto.verifyPassword(password, result.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou Senha são invalidos'
            }
        });
    } else {
        return res.status(StatusCodes.OK).json({accessToken: 'test.test.test'});
    }
};
