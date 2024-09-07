import express, { Router } from 'express';
import userController from '../controllers/user.controller';
import { signinRequestBodyValidator, signupRequestBodyValidator } from '../utils/userValidation';
import { auth, validateRequest } from '../middlewares';

const router: Router = express.Router();

router.post('/login', signinRequestBodyValidator, validateRequest, userController.signin);

router.post('/signup', signupRequestBodyValidator, validateRequest, userController.signup);

router.get('/profile', auth, userController.profile);

export default router;
