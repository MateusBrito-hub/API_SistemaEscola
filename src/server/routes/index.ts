import { Router } from 'express';
import { UsersController } from './../controllers';
const router = Router();

router.post('/users', UsersController.createValidation ,UsersController.create);

export {router};
