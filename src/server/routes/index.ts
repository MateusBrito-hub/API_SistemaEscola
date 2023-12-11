import { Router } from 'express';
import { UsersController, UserTypesController } from './../controllers';
import { ensureAuthenticated } from '../shared/middleware';
const router = Router();


// User Controllers
router.post('/login', UsersController.signInValidation ,UsersController.signIn);
router.post('/register', UsersController.signUpValidation ,UsersController.signUp);

// UserTypes Controllers
router.get('/userTypes', ensureAuthenticated, UserTypesController.getAllValidation ,UserTypesController.getAll);
router.post('/userTypes', ensureAuthenticated, UserTypesController.createValidation ,UserTypesController.create);
router.get('/userTypes/:id', ensureAuthenticated, UserTypesController.getByIdValidation ,UserTypesController.getById);
router.delete('/userTypes/:id', ensureAuthenticated, UserTypesController.deleteByIdValidation ,UserTypesController.deteleById);
router.put('/userTypes/:id', ensureAuthenticated, UserTypesController.updateByIdValidation ,UserTypesController.updateById);



export {router};
