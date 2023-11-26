import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsersController } from './../controllers';
const router = Router();

router.post('/users', UsersController.create);

export {router};
