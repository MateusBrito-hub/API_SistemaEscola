import { Router } from 'express';
import { UsersController } from './../controllers';
const router = Router();

router.get('/users', UsersController.getAllValidation ,UsersController.getAll);
router.get('/users/:id', UsersController.getByIdValidation ,UsersController.getById);
router.delete('/users/:id', UsersController.deleteByIdValidation ,UsersController.deteleById);
router.put('/users/:id', UsersController.updateByIdValidation ,UsersController.updateById);
router.post('/users', UsersController.createValidation ,UsersController.create);

export {router};
