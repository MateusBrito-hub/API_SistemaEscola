import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const ensureAuthenticated : RequestHandler = async (req, res, next) => {
    const {authorization} = req.headers;

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {default: 'Não autenticado!'}
        });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {default: 'Não autenticado!'}
        });
    }

    const JwtData = JWTService.verify(token);

    if (JwtData === 'JWT_SECRET_NOT_FOUND') {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {default: 'Erro ao verificar o Token!'}
        });
    } else if (JwtData === 'INVALID_TOKEN'){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {default: 'Não autenticado!'}
        });
    }

    req.headers.idUsuario = JwtData.uid.toString();

    return next();
};
