import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';
import { JWTService, passwordCrypto } from '../../shared/services';
import dotenv from 'dotenv';
dotenv.config();

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
                default: 'Email ou Senha são invalidos!'
            }
        });
    }

    const passwordMatch = await passwordCrypto.verifyPassword(password, result.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors:{
                default: 'Email ou Senha são invalidos!'
            }
        });
    } else {
        const accessToken = JWTService.sign({uid: result.id});
        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors:{
                    default: 'Erro ao gerar Token de acesso!'
                }
            });
        }
        return res.status(StatusCodes.OK).json({ accessToken });
    }
};
