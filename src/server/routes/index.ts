import { Router } from 'express';
import { UsersController } from './../controllers';
const router = Router();

router.get('/users', UsersController.getAllValidation ,UsersController.getAll);
router.post('/users', UsersController.createValidation ,UsersController.create);

export {router};
