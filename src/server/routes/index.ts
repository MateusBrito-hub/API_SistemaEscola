import { Router } from 'express';
import { UsersController, UserTypesController } from './../controllers';
const router = Router();


// User Controllers
router.post('/login', UsersController.signInValidation ,UsersController.signIn);
router.post('/register', UsersController.signUpValidation ,UsersController.signUp);

// UserTypes Controllers
router.get('/userTypes', UserTypesController.getAllValidation ,UserTypesController.getAll);
router.post('/userTypes', UserTypesController.createValidation ,UserTypesController.create);
router.get('/userTypes/:id', UserTypesController.getByIdValidation ,UserTypesController.getById);
router.delete('/userTypes/:id', UserTypesController.deleteByIdValidation ,UserTypesController.deteleById);
router.put('/userTypes/:id', UserTypesController.updateByIdValidation ,UserTypesController.updateById);



export {router};
