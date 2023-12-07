import { Router } from 'express';
import { UsersController, UserTypesController } from './../controllers';
const router = Router();


// User Controllers
router.get('/users', UsersController.getAllValidation ,UsersController.getAll);
router.post('/users', UsersController.createValidation ,UsersController.create);
router.get('/users/:id', UsersController.getByIdValidation ,UsersController.getById);
router.delete('/users/:id', UsersController.deleteByIdValidation ,UsersController.deteleById);
router.put('/users/:id', UsersController.updateByIdValidation ,UsersController.updateById);

// UserTypes Controllers
router.get('/userTypes', UserTypesController.getAllValidation ,UserTypesController.getAll);
router.post('/userTypes', UserTypesController.createValidation ,UserTypesController.create);
router.get('/userTypes/:id', UserTypesController.getByIdValidation ,UserTypesController.getById);
router.delete('/userTypes/:id', UserTypesController.deleteByIdValidation ,UserTypesController.deteleById);
router.put('/userTypes/:id', UserTypesController.updateByIdValidation ,UserTypesController.updateById);



export {router};
