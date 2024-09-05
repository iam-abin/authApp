import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
import { signinRequestBodyValidator, signupRequestBodyValidator } from '../utils/user.validation';
import { validateRequest } from '../middlewares';

const router: Router = express.Router();

// router.post('/signin',signinRequestBodyValidator, validateRequest, authController.signin);

router.post('/signup', signupRequestBodyValidator, validateRequest, authController.signup);

// router.get('/profile', authController.profile);

export default router;
